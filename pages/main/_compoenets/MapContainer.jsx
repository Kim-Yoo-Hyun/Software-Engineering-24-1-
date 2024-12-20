import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { NewsContext } from '../../../contexts/NewsContext';
import axios from 'axios';
import gpsIcon from '../../../assets/gps.png';
import NewsModal from './NewsModal';
import dangerMark from '../../../assets/danger_mark.png';
import safeMark from '../../../assets/safe_mark.png';

const MapContainer = () => {
  const [map, setMap] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const { newsData, currentPosition, setCurrentPosition } = useContext(NewsContext);
  const [positionFetched, setPositionFetched] = useState(false);

  useEffect(() => {
    const loadKakaoMapScript = (callback) => {
      const script = document.createElement('script');
      script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=d0a651b4a3a79eb5745dc18240085e9d&autoload=false';
      script.onload = () => {
        window.kakao.maps.load(callback);
      };
      document.head.appendChild(script);
    };

    const setCenterToCurrentLocation = (map) => {
      if (navigator.geolocation && !positionFetched) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new window.kakao.maps.LatLng(lat, lon);
          setCurrentPosition({ lat, lon });
          map.setCenter(locPosition);
          setPositionFetched(true);
        });
      }
    };

    loadKakaoMapScript(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const mapInstance = new window.kakao.maps.Map(container, options);
      setMap(mapInstance);

      setCenterToCurrentLocation(mapInstance);

      const gpsButton = document.getElementById('gpsButton');
      gpsButton.addEventListener('click', () => {
        setCenterToCurrentLocation(mapInstance);
      });
    });
  }, []);

  useEffect(() => {
    if (map && newsData.length > 0) {
      console.log('Adding markers to the map...');
      const bounds = new window.kakao.maps.LatLngBounds();

      // 현재 위치가 있는 경우 bounds에 추가 및 safeMark 마커 추가
      if (currentPosition) {
        const currentMarker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lon),
          map,
          image: new window.kakao.maps.MarkerImage(safeMark, new window.kakao.maps.Size(24, 35)),
        });
        bounds.extend(new window.kakao.maps.LatLng(currentPosition.lat, currentPosition.lon));
      }

      newsData.forEach((news) => {
        if (news.lat && news.lon) {
          const position = new window.kakao.maps.LatLng(news.lat, news.lon);
          const marker = new window.kakao.maps.Marker({
            position,
            map,
            image: new window.kakao.maps.MarkerImage(dangerMark, new window.kakao.maps.Size(40, 40)),
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            setSelectedNews(news);
          });

          bounds.extend(position); // 마커 위치를 bounds에 추가
          console.log(`Marker added at: ${news.lat}, ${news.lon}`);
        } else {
          console.warn(`Missing location data for news item: ${news.title}`);
        }
      });

      // 모든 마커가 보이도록 지도의 범위 설정
      map.setBounds(bounds);
    } else {
      console.log('Map or script not loaded yet, or no news data available.');
    }
  }, [map, newsData, currentPosition]);

  return (
    <MapContainerBlock id="map">
      <GpsButton id="gpsButton" src={gpsIcon} alt="GPS 버튼" />
      {selectedNews && <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />}
    </MapContainerBlock>
  );
};

export default MapContainer;

const MapContainerBlock = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const GpsButton = styled.img`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  z-index: 10;
`;
