import React, { useContext } from 'react';
import styled from 'styled-components';
import { NewsContext } from '../../contexts/NewsContext';
import NewsList from './_components/NewsList';
import NoNewsMessage from './_components/NoNewsMessage';

const NewsPage = () => {
  const { newsData } = useContext(NewsContext);

  return <NewsPageLayout>{newsData.length > 0 ? <NewsList newsData={newsData} /> : <NoNewsMessage />}</NewsPageLayout>;
};

export default NewsPage;

const NewsPageLayout = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
