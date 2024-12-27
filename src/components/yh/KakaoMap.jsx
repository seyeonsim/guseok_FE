import React, { useEffect } from "react";

const KakaoMap = ({ parks }) => {
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps JavaScript API is not loaded.");
      return;
    }

    const container = document.getElementById("map");

    // 기존의 Kakao 지도 초기화
    if (container.hasChildNodes()) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    }

    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울시청 좌표
      level: 5,
    };

    const map = new window.kakao.maps.Map(container, options);

    const createMarker = (park) => {
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
    };

    parks.forEach((park) => createMarker(park));
  }, [parks]);

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
};

export default KakaoMap;
