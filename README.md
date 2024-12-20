# Software-Engineering-24-1-

### 기능 구현 코드 설명

### **카카오 맵 스크립트 로드**

- 카카오 맵 API 스크립트를 비동기로 로드합니다.
- 스크립트가 로드되면, 카카오 맵 객체를 생성합니다.
useEffect(() => {
  const loadKakaoMapScript = (callback) => {
    const script = document.createElement('script');
    script.src = '<https://dapi.kakao.com/v2/maps/sdk.js?appkey=d0a651b4a3a79eb5745dc18240085e9d&autoload=false>';
    script.onload = () => {
      window.kakao.maps.load(callback);
    };
    document.head.appendChild(script);
  };

  loadKakaoMapScript(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const mapInstance = new window.kakao.maps.Map(container, options);
    setMap(mapInstance);

    // 중심을 현재 위치로 설정
    setCenterToCurrentLocation(mapInstance);

    const gpsButton = document.getElementById('gpsButton');
    gpsButton.addEventListener('click', () => {
      setCenterToCurrentLocation(mapInstance);
    });
  });
}, []);


### **현재 위치 설정**

- 브라우저의 `navigator.geolocation`을 사용해 현재 위치를 가져옵니다.
- 위치 정보를 얻으면, 맵의 중심을 현재 위치로 설정하고 현재 위치를 `NewsContext`에 저장합니다.

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

### **GPS 버튼 클릭 이벤트**

- GPS 버튼을 클릭하면, 현재 위치를 다시 중심으로 설정합니다.
const gpsButton = document.getElementById('gpsButton');
gpsButton.addEventListener('click', () => {
  setCenterToCurrentLocation(mapInstance);
});

### **뉴스 데이터 기반 마커 추가**

- `newsData`에 포함된 뉴스 항목들에 대해 위치 정보를 기반으로 마커를 맵에 추가합니다.
- 각 마커에 클릭 이벤트를 추가해, 뉴스 모달을 열도록 합니다.
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

## **뉴스 API 가져오기, 연결 및 필터링 기능 구현**

### 1. 뉴스 API 데이터 가져오기

- `axios`를 사용하여 뉴스 API로부터 데이터를 가져옵니다.
- `https://newsapi.org/v2/top-headlines` 엔드포인트를 사용하여 한국의 최신 뉴스를 가져옵니다.
- API 키를 사용하여 인증합니다.
const fetchNewsData = async (lat, lon) => {
  try {
    const response = await axios.get(
      '<https://newsapi.org/v2/top-headlines?country=kr&pageSize=100&apiKey=97d4e11262a441e08602b00a197995a6>'
    );

    // 나머지 코드는 필터링 및 위치 추가를 위한 코드입니다.
  } catch (error) {
    console.error('Failed to fetch news data:', error);
  }
};

### 2. 뉴스 데이터 필터링 및 위치 추가

- 특정 키워드가 포함된 뉴스 기사만 필터링합니다.
- 필터링된 뉴스 기사에 무작위 위치 오프셋을 추가하여 지도로 시각화할 수 있도록 합니다.
const keywords = [
  '사건', '사고', '속보', '화재', '교통사고', '범죄', '도난', '폭행', '살인', '납치', '붕괴', '폭발',
  '재난', '긴급', '구조', '비상', '실종', '추락', '경찰', '화재사고', '교통사건', '응급', '재해',
  '자연재해', '사건사고', '숨져', '시체', '사기', '급발진', '사망'
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

### 3. 현재 위치 설정 및 뉴스 데이터 로드

- 사용자의 현재 위치를 설정하고, 해당 위치를 기준으로 뉴스를 가져옵니다.
- 위치가 업데이트되면, 뉴스 데이터를 다시 가져옵니다.
useEffect(() => {
  if (currentPosition) {
    const { lat, lon } = currentPosition;
    fetchNewsData(lat, lon);
  }
}, [currentPosition]);
이 useEffect 훅은 currentPosition이 변경될 때마다 fetchNewsData 함수를 호출하여 최신 뉴스를 가져오도록 합니다.

<img width="382" alt="Untitled" src="https://github.com/user-attachments/assets/5e5238a7-ee16-41d3-8879-cabbedf09d95" />



