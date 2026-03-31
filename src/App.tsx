import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QuestionsPage } from './pages/QuestionsPage';
import { TakeQuizLoggedIn } from './pages/TakeQuizLoggedIn';
import { TakeQuizPublic } from './pages/TakeQuizPublic';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuestionsPage />} />
        <Route path="/take-quiz" element={<TakeQuizLoggedIn />} />
        <Route path="/take-quiz/public" element={<TakeQuizPublic />} />
      </Routes>
    </BrowserRouter>);

}