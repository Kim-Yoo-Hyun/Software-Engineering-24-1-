import React from 'react';
import styled from 'styled-components';

const NewsItem = ({ news }) => {
  return (
    <NewsItemWrapper>
      {news.urlToImage && <NewsImage src={news.urlToImage} alt="News Thumbnail" />}
      <NewsContent>
        <NewsTitle>{news.title}</NewsTitle>
        <NewsDescription>{news.description}</NewsDescription>
        <NewsLink href={news.url} target="_blank" rel="noopener noreferrer">
          Read more
        </NewsLink>
      </NewsContent>
    </NewsItemWrapper>
  );
};

export default NewsItem;

const NewsItemWrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const NewsImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const NewsContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const NewsTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const NewsDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const NewsLink = styled.a`
  font-size: 0.875rem;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
