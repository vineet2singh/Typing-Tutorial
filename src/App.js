import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ExamProvider } from './context/ExamContext';
import Home from './pages/Home';
import Exam from './pages/Exam';
import './index.css'; // Ensure you paste your CSS here

function App() {
  return (
    <ExamProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exam" element={<Exam />} />
        </Routes>
      </Router>
    </ExamProvider>
  );
}

export default App;