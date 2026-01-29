import React, { createContext, useState } from 'react';

export const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
    const [config, setConfig] = useState({
        lang: 'en',
        time: 1, // minutes
        noBackspace: false,
        lessonText: '',
        lessonTitle: ''
    });

    return (
        <ExamContext.Provider value={{ config, setConfig }}>
            {children}
        </ExamContext.Provider>
    );
};