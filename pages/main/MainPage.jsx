import React from 'react';
import MapContainer from './_compoenets/MapContainer';
import styled from 'styled-components';

function MainPage() {
  return (
    <MainPageLayout>
      <MapContainer />
    </MainPageLayout>
  );
}

export default MainPage;

const MainPageLayout = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
`;
