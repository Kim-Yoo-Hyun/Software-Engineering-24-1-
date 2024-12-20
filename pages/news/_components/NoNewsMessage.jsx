import React from 'react';
import styled from 'styled-components';

const NoNewsMessage = () => {
  return <Message>No news articles available.</Message>;
};

export default NoNewsMessage;

const Message = styled.div`
  font-size: 1.5rem;
  color: #777;
  margin-top: 2rem;
`;
