import React, { useContext, useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamContext } from '../context/ExamContext';
import VirtualKeyboard from '../components/VirtualKeyboard';
import { inscriptMapping, engDisplayMap, hindiDisplayMap } from '../data/keyMaps';

const Exam = () => {
    const { config } = useContext(ExamContext);
    const navigate = useNavigate();

    // Stats State
    const [timeLeft, setTimeLeft] = useState(config.time * 60);
    const [isActive, setIsActive] = useState(false);
    const [stats, setStats] = useState({ wpm: 0, accuracy: 100, errors: 0 });
    const [isFinished, setIsFinished] = useState(false);
    
    // Typing State
    const [activeKey, setActiveKey] = useState(null);
    const inputRef = useRef(null);
    const charRefs = useRef([]);
    const [charIndex, setCharIndex] = useState(0);

    // FIX 1: Memoize textChars so it is stable across renders
    const textChars = useMemo(() => {
        return config.lessonText ? config.lessonText.split('') : [];
    }, [config.lessonText]);

    // FIX 2: Wrap highlightNextKey in useCallback to make it a stable dependency
    const highlightNextKey = useCallback((char) => {
        if (!char) return;
        const map = config.lang === 'hi' ? hindiDisplayMap : engDisplayMap;
        let foundCode = null;
        
        for (const [code, chars] of Object.entries(map)) {
            if (chars[0] === char) { foundCode = code; break; }
            if (chars[1] === char) { foundCode = code; break; } 
        }
        setActiveKey(foundCode);
    }, [config.lang]); // Re-create only if language changes

    // FIX 3: Updated Dependency Array
    useEffect(() => {
        if (!config.lessonText) {
            navigate('/');
        } else {
            // Highlight first key
            highlightNextKey(textChars[0]);
        }
    }, [config.lessonText, navigate, highlightNextKey, textChars]);

    // Timer Logic
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => {
                    if (time <= 1) finishTest();
                    return time - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    // FIX 4: Added config.time and stats.errors to dependencies
    useEffect(() => {
        const timeElapsed = (config.time * 60 - timeLeft) / 60;
        if (timeElapsed > 0) {
            const wpm = Math.round((charIndex / 5) / timeElapsed);
            // safe check for divide by zero
            const currentChars = charIndex || 1;
            const accuracy = Math.round(((charIndex - stats.errors) / currentChars) * 100);
            
            setStats(prev => ({ ...prev, wpm, accuracy }));
        }
    }, [timeLeft, charIndex, config.time, stats.errors]);

    const finishTest = () => {
        setIsActive(false);
        setIsFinished(true);
    };

    const handleInput = (e) => {
        if (!isActive && !isFinished) setIsActive(true);
        if (isFinished) return;

        const val = e.target.value;
        const currentCharIndex = val.length - 1;
        const typedChar = val.slice(-1);

        // Handle Backspace
        if (val.length < charIndex) {
            // Reset highlighting for deleted chars
            for (let i = val.length; i <= charIndex; i++) {
                if (charRefs.current[i]) charRefs.current[i].className = '';
            }
            setCharIndex(val.length);
            highlightNextKey(textChars[val.length]);
            return;
        }

        // Validate Input
        const targetChar = textChars[currentCharIndex];
        if (targetChar) {
            if (typedChar === targetChar) {
                charRefs.current[currentCharIndex].className = 'char-correct';
            } else {
                charRefs.current[currentCharIndex].className = 'char-error';
                setStats(prev => ({ ...prev, errors: prev.errors + 1 }));
            }
            
            // Advance Cursor
            const nextIndex = currentCharIndex + 1;
            setCharIndex(nextIndex);
            
            // Scroll Logic
            if (charRefs.current[nextIndex]) {
                 charRefs.current[nextIndex].className = 'char-active';
                 charRefs.current[nextIndex].scrollIntoView({ behavior: "smooth", block: "center" });
                 highlightNextKey(textChars[nextIndex]);
            } else {
                finishTest();
            }
        }
    };

    const handleKeyDown = (e) => {
        if (config.noBackspace && e.key === 'Backspace') {
            e.preventDefault();
            return;
        }

        // Hindi InScript Mapper
        if (config.lang === 'hi' && inscriptMapping[e.key] && !e.ctrlKey && !e.altKey) {
            e.preventDefault();
            const mappedChar = inscriptMapping[e.key];
            
            // Insert programmatically
            const input = inputRef.current;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const val = input.value;
            input.value = val.substring(0, start) + mappedChar + val.substring(end);
            input.selectionStart = input.selectionEnd = start + 1;
            
            // Manually trigger input handler
            handleInput({ target: input });
        }
    };

    const formatTime = (s) => {
        const min = Math.floor(s / 60).toString().padStart(2, '0');
        const sec = (s % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    return (
        <div className="exam-container">
            <header className="exam-header">
                <button onClick={() => navigate('/')} className="btn-back">← Back</button>
                <div className="exam-meta">
                    <span>{config.lessonTitle}</span>
                    <span className="divider">|</span>
                    <span className="timer-box">{formatTime(timeLeft)}</span>
                </div>
            </header>

            <div className="split-layout">
                <aside className="stats-sidebar">
                    <div className="stat-tile"><label>WPM</label><span>{stats.wpm}</span></div>
                    <div className="stat-tile"><label>Accuracy</label><span>{stats.accuracy}%</span></div>
                    <div className="stat-tile error"><label>Errors</label><span>{stats.errors}</span></div>
                    <button onClick={() => window.location.reload()} className="btn-restart">Restart</button>
                </aside>

                <main className="typing-workspace">
                    <div className={`text-display ${config.lang === 'hi' ? 'hindi' : ''}`}>
                        {textChars.map((char, idx) => (
                            <span 
                                key={idx} 
                                ref={el => charRefs.current[idx] = el}
                                className={idx === 0 ? 'char-active' : ''}
                            >{char}</span>
                        ))}
                    </div>

                    <textarea
                        ref={inputRef}
                        className={`input-field ${config.lang === 'hi' ? 'hindi' : ''}`}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        disabled={isFinished}
                        autoFocus
                        onPaste={(e) => e.preventDefault()}
                    ></textarea>

                    <VirtualKeyboard activeKey={activeKey} lang={config.lang} />
                </main>
            </div>

            {isFinished && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">Test Completed</div>
                        <div className="modal-body">
                            <div className="res-row"><span>Speed:</span> <strong>{stats.wpm} WPM</strong></div>
                            <div className="res-row"><span>Accuracy:</span> <strong>{stats.accuracy}%</strong></div>
                            <div className="res-row"><span>Errors:</span> <strong className="red">{stats.errors}</strong></div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => navigate('/')} className="btn-secondary">New Test</button>
                            <button onClick={() => window.location.reload()} className="btn-primary">Retake</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Exam;