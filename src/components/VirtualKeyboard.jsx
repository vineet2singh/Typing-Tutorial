import React from 'react';
import { hindiDisplayMap, engDisplayMap } from '../data/keyMaps';

const VirtualKeyboard = ({ activeKey, lang }) => {
    const physicalRows = [
        ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
        ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
        ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
        ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight'],
        ['Space']
    ];

    // Helper for key widths
    const getWidthClass = (code) => {
        if (code === 'Space') return 'w-[350px] md:w-[450px]';
        if (['Backspace', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight'].includes(code)) return 'w-[80px] md:w-[100px]';
        if (code === 'Tab') return 'w-[70px] md:w-[90px]';
        return 'w-[50px] md:w-[60px]'; // Standard key
    };

    return (
        <div className="w-full bg-slate-200 p-4 rounded-2xl border border-slate-300 shadow-inner mt-6 overflow-x-auto">
            <div className="min-w-[850px] flex flex-col gap-2 mx-auto select-none">
                {physicalRows.map((row, rIndex) => (
                    <div className="flex justify-center gap-2" key={rIndex}>
                        {row.map((code) => {
                            const isSpecial = ['Backspace', 'Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'Space'].includes(code);
                            const enChars = engDisplayMap[code] || ['', ''];
                            const hiChars = (lang === 'hi' && hindiDisplayMap[code]) ? hindiDisplayMap[code] : ['', ''];
                            const isActive = activeKey === code;

                            return (
                                <div 
                                    key={code} 
                                    className={`
                                        relative h-[55px] md:h-[60px] rounded-lg transition-all duration-75 flex items-center justify-center cursor-pointer border
                                        ${getWidthClass(code)}
                                        ${isActive 
                                            ? 'bg-blue-600 border-blue-700 translate-y-1 shadow-none text-white' 
                                            : 'bg-white border-slate-300 border-b-4 border-b-slate-400 hover:bg-slate-50 shadow-sm'
                                        }
                                    `}
                                >
                                    {isSpecial ? (
                                        <span className={`text-xs md:text-sm font-bold uppercase ${isActive ? 'text-white' : 'text-slate-600'}`}>
                                            {code.replace('Key', '').replace('Left','').replace('Right','')}
                                        </span>
                                    ) : (
                                        <>
                                            {/* Top Left: Eng Shift */}
                                            <span className={`absolute top-1 left-1.5 text-[10px] font-semibold ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                                                {enChars[1]}
                                            </span>
                                            
                                            {/* Bottom Left: Eng Normal */}
                                            <span className={`absolute bottom-1 left-1.5 text-xs font-bold ${isActive ? 'text-white' : 'text-slate-500'}`}>
                                                {enChars[0]}
                                            </span>

                                            {/* Top Right: Hindi Shift (Red) */}
                                            <span className={`absolute top-0.5 right-1.5 text-sm font-bold font-serif ${isActive ? 'text-red-200' : 'text-red-600'}`}>
                                                {hiChars[1]}
                                            </span>

                                            {/* Bottom Right: Hindi Normal */}
                                            <span className={`absolute bottom-0 right-1.5 text-lg font-bold font-serif ${isActive ? 'text-white' : 'text-slate-800'}`}>
                                                {hiChars[0]}
                                            </span>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VirtualKeyboard;