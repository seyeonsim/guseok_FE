import React, { useEffect, useRef } from "react";
// import "../../styles/KakaoMap.css";

import "../../styles/new/List.css";

const KakaoMap = ({ parks, center, selectedPark, onMarkerClick }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  // 별(선택된) 마커
  const SELECTED_IMAGE_SRC =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  // 1) 처음 마운트: 카카오맵 스크립트 로드 & 지도 생성
  useEffect(() => {
    const kakaoApiKey = process.env.REACT_APP_KAKAO_MAP_APP_KEY;
    if (!kakaoApiKey) {
      console.error("Kakao API Key is not provided in .env file.");
      return;
    }

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
      mapRef.current = new window.kakao.maps.Map(container, options);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 2) parks/center 바뀔 때: 마커 생성 (기본마커는 Kakao 내장)
  useEffect(() => {
    if (!mapRef.current || !window.kakao) return;

    const { kakao } = window;
    const map = mapRef.current;

    // 기존 마커 제거
    markersRef.current.forEach((obj) => {
      obj.marker.setMap(null);
      obj.infoWindow.close();
    });
    markersRef.current = [];

    parks.forEach((park) => {
      const position = new kakao.maps.LatLng(park.latitude, park.longitude);

      // 이미지 옵션을 주지 않으면 Kakao가 제공하는 "기본" 마커(빨간/파란 등)
      const marker = new kakao.maps.Marker({
        position,
        map,
        // image: undefined  // 굳이 안 써도 됨
      });

      const infoWindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${park.name}</div>`,
      });

      // 클릭 이벤트 → 부모에 알림
      kakao.maps.event.addListener(marker, "click", () => {
        onMarkerClick?.(park);
      });

      markersRef.current.push({
        marker,
        infoWindow,
        parkId: park.id,
      });
    });

    // 지도 중심 이동
    map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
  }, [parks, center, onMarkerClick]);

  // 3) selectedPark 바뀔 때: 선택된 마커는 별, 나머지는 기본으로 복귀
  useEffect(() => {
    if (!mapRef.current || !window.kakao) return;
    const { kakao } = window;
    const map = mapRef.current;

    // 별 마커 이미지
    const imageSize = new kakao.maps.Size(24, 35);
    const selectedMarkerImage = new kakao.maps.MarkerImage(
      SELECTED_IMAGE_SRC,
      imageSize
    );

    markersRef.current.forEach((obj) => {
      if (selectedPark && obj.parkId === selectedPark.id) {
        // 선택된 마커 = 별 마커 + infoWindow 열기
        obj.marker.setImage(selectedMarkerImage);
        obj.infoWindow.open(map, obj.marker);
      } else {
        // 해제된 마커 = 기본마커(null 주면 카카오 기본 마커로 복귀)
        obj.marker.setImage(null);
        obj.infoWindow.close();
      }
    });
  }, [selectedPark]);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};

export default KakaoMap;
