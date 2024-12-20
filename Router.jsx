import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewsPage from './pages/news/NewsPage';
import MainPage from './pages/main/MainPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/news" element={<NewsPage />} />
    </Routes>
  );
};

export default Router;
