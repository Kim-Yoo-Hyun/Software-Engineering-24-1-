import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Router from './Router';
import BottomNav from './components/BottomNav';
import { NewsProvider } from './contexts/NewsContext';

function App() {
  return (
    <MobileContainer>
      <MaxWidthWrapper>
        <BrowserRouter>
          <NewsProvider>
            <Router />
            <BottomNav />
          </NewsProvider>
        </BrowserRouter>
      </MaxWidthWrapper>
    </MobileContainer>
  );
}

export default App;

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MaxWidthWrapper = styled.div`
  width: 37.5rem;
`;
