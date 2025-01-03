import React, { useEffect } from "react";
import "../styles/KakaoMap.css";

const KakaoMap = ({ parks, center, onMarkerClick }) => {
  useEffect(() => {

    const kakaoApiKey = process.env.REACT_APP_KAKAO_MAP_APP_KEY;

    if (!kakaoApiKey) {
      console.error("Kakao API Key is not provided in .env file.");
      return;
    }

    // Kakao Map 스크립트 동적 로드
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services`;
    script.async = true;
    script.onload = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("Kakao Maps JavaScript API is not loaded.");
        return;
      }

      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(center.lat, center.lng),
        level: 7,
      };

      const map = new window.kakao.maps.Map(container, options);

      // 하나의 정보창 관리
      const infoWindow = new window.kakao.maps.InfoWindow({
        zIndex: 1, // z-index 설정
      });

      let activeInfoWindow = null;

      // 마커 추가
      parks.forEach((park) => {
        const position = new window.kakao.maps.LatLng(park.latitude, park.longitude);
        const marker = new window.kakao.maps.Marker({
          position,
          map,
        });

      window.kakao.maps.event.addListener(marker, "click", () => {
        if (activeInfoWindow) {
          activeInfoWindow.close(); // 기존 InfoWindow 닫기
        }
        infoWindow.setContent(`<div style="padding:5px;">${park.name}</div>`);
        infoWindow.open(map, marker);
        activeInfoWindow = infoWindow; // 현재 InfoWindow 저장

        if (onMarkerClick) {
          onMarkerClick(park);
        }
      });
      });
    };

    document.head.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, [parks, center]);

  return (
    <div id="map" style={{ width: "100%", height: "100%" }} />
  );
};

export default KakaoMap;
