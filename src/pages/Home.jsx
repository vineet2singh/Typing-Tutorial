import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExamContext } from '../context/ExamContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import enLessons from '../data/english_lessons.json';
import hiLessons from '../data/hindi_lessons.json';

const Home = () => {
    const { setConfig } = useContext(ExamContext);
    const navigate = useNavigate();
    
    const [lang, setLang] = useState('en');
    const [time, setTime] = useState(1);
    const [noBackspace, setNoBackspace] = useState(false);
    const [customText, setCustomText] = useState('');
    
    const currentLessons = lang === 'en' ? enLessons : hiLessons;

    const startTest = (lesson) => {
        setConfig({
            lang,
            time,
            noBackspace,
            lessonText: lesson.chars,
            lessonTitle: lesson.title
        });
        navigate('/exam');
    };

    const startCustomTest = () => {
        if (!customText.trim()) return alert("Please enter some text first.");
        setConfig({
            lang,
            time,
            noBackspace,
            lessonText: customText,
            lessonTitle: "Custom Text"
        });
        navigate('/exam');
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <Navbar />

            {/* --- HERO SECTION --- */}
            {/* Using arbitrary clip-path for the slanted effect */}
            <section className="relative bg-gradient-to-br from-blue-700 to-blue-500 text-white pt-20 pb-32 px-4 text-center shadow-lg [clip-path:polygon(0_0,100%_0,100%_85%,0_100%)]">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        Master Your <span className="text-yellow-300">Typing Speed</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
                        Prepare for SSC, CPCT, and Railway exams with our professional typing tutor. 
                        Support for English & Hindi (Mangal InScript).
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                            🚀 Real-time WPM
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                            🎯 100% Exam Pattern
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                            ⌨️ Virtual Keyboard
                        </span>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-20 relative z-10 pb-12 max-w-6xl">
                
                {/* --- CONTROL PANEL (Glassmorphism Card) --- */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-100">
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                        <i className="fa-solid fa-sliders text-blue-600"></i>
                        <h2 className="text-xl font-bold text-slate-700">Test Configuration</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                        {/* Language Selection */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Select Language</label>
                            <div className="flex bg-slate-100 p-1 rounded-lg">
                                <button 
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-bold transition-all duration-200 ${lang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    onClick={() => setLang('en')}
                                >
                                    <span className="text-lg">A</span> English
                                </button>
                                <button 
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-bold transition-all duration-200 ${lang === 'hi' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    onClick={() => setLang('hi')}
                                >
                                    <span className="text-lg">क</span> Hindi
                                </button>
                            </div>
                        </div>

                        {/* Time Selection */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Duration</label>
                            <div className="flex gap-2">
                                {[1, 2, 5, 10, 15].map(m => (
                                    <button 
                                        key={m}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-colors ${time === m ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-500'}`}
                                        onClick={() => setTime(m)}
                                    >
                                        {m}m
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Options */}
                        <div className="flex flex-col justify-end">
                            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                                <input 
                                    type="checkbox" 
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                                    checked={noBackspace} 
                                    onChange={(e) => setNoBackspace(e.target.checked)} 
                                />
                                <span className="font-semibold text-slate-700 text-sm">Strict Mode (Disable Backspace)</span>
                            </label>
                        </div>
                    </div>

                    {/* Custom Text Area */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300 flex flex-col md:flex-row gap-4 items-stretch">
                        <textarea 
                            className="flex-1 bg-white border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-shadow"
                            rows="2"
                            placeholder="Paste your own text paragraph here to practice..." 
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value)}
                        ></textarea>
                        <button 
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold text-sm transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                            onClick={startCustomTest}
                        >
                            Start Custom Test <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

                {/* --- COURSE LIBRARY --- */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 pl-4 border-l-4 border-blue-600">
                        {lang === 'en' ? 'English Typing Course' : 'Hindi Mangal Course'}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentLessons.map((lesson, index) => (
                            <div 
                                key={lesson.id} 
                                onClick={() => startTest(lesson)}
                                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl border border-slate-100 cursor-pointer transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                                            {lesson.title}- <span  className="font-bold text-lg text-yellow-500 mb-1 group-hover:text-red-600 transition-colors">{lesson.level}</span>
                                        </h3>
                                        <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                            {lesson.desc || "Improve your speed and accuracy."}
                                        </p>
                                         <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                            {lesson.chars || "Improve your speed and accuracy."}
                                        </p>
                                        
                                        <div className="flex items-center justify-between text-xs font-medium text-slate-400 pt-4 border-t border-slate-50">
                                            <span className="flex items-center gap-1">
                                                <i className="fa-regular fa-keyboard"></i> {lesson.chars.length} chars
                                            </span>
                                            <span className="text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1">
                                                Start <i className="fa-solid fa-play text-[10px]"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className='h-10'></div>
            <Footer />
        </div>
    );
};

export default Home;