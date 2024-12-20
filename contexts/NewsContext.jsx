import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);

  const fetchNewsData = async (lat, lon) => {
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=kr&pageSize=100&apiKey=97d4e11262a441e08602b00a197995a6'
      );

      const keywords = [
        '사건',
        '사고',
        '속보',
        '화재',
        '교통사고',
        '범죄',
        '도난',
        '폭행',
        '살인',
        '납치',
        '붕괴',
        '폭발',
        '재난',
        '긴급',
        '구조',
        '비상',
        '실종',
        '추락',
        '경찰',
        '화재사고',
        '교통사건',
        '응급',
        '재해',
        '자연재해',
        '사건사고',
        '숨져',
        '시체',
        '사기',
        '급발진',
        '사망',
      ];

      const newsWithLocationAndFiltered = response.data.articles
        .filter((news) => keywords.some((keyword) => news.title.includes(keyword)))
        .map((news) => {
          const randomOffset = () => (Math.random() - 0.5) * 0.01;
          return {
            ...news,
            lat: lat + randomOffset(),
            lon: lon + randomOffset(),
          };
        });

      setNewsData(newsWithLocationAndFiltered);
    } catch (error) {
      console.error('Failed to fetch news data:', error);
    }
  };

  useEffect(() => {
    if (currentPosition) {
      const { lat, lon } = currentPosition;
      fetchNewsData(lat, lon);
    }
  }, [currentPosition]);

  return (
    <NewsContext.Provider value={{ newsData, currentPosition, setCurrentPosition }}>{children}</NewsContext.Provider>
  );
};
