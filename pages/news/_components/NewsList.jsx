import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';

const NewsList = ({ newsData }) => {
  return (
    <NewsListWrapper>
      {newsData.map((news, index) => (
        <NewsItem key={index} news={news} />
      ))}
    </NewsListWrapper>
  );
};

export default NewsList;

const NewsListWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  overflow-y: auto;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;
