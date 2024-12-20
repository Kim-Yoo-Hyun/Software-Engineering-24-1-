import React from 'react';
import styled from 'styled-components';

const NewsModal = ({ news, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <NewsImage src={news.urlToImage} alt="news" />
        <NewsTitle>{news.title}</NewsTitle>
        <NewsDescription>{news.description}</NewsDescription>
        <NewsLink href={news.url} target="_blank" rel="noopener noreferrer">
          Read more
        </NewsLink>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NewsModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 5px;
  max-width: 30rem;
  width: 100%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const NewsImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
`;

const NewsTitle = styled.h2`
  margin: 1rem 0;
`;

const NewsDescription = styled.p`
  margin: 1rem 0;
`;

const NewsLink = styled.a`
  display: inline-block;
  margin-top: 1rem;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;
