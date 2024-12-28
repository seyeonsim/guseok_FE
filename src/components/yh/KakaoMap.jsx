import React, { useEffect } from "react";
import "../../styles/yh/KakaoMap.css";

const KakaoMap = ({ parks, center, height }) => {
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
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);

      // 마커 추가
      parks.forEach((park) => {
        const position = new window.kakao.maps.LatLng(park.latitude, park.longitude);

        const marker = new window.kakao.maps.Marker({
          position,
          map,
        });

        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${park.name}</div>`,
        });

        window.kakao.maps.event.addListener(marker, "click", () => {
          infoWindow.open(map, marker);
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
    <div id="map"/>
  );
};

export default KakaoMap;
