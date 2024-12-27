import React, { useEffect } from "react";

const KakaoMap = ({ parks }) => {
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps JavaScript API is not loaded.");
      return;
    }

    // 지도 컨테이너와 옵션 설정
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 초기 중심 좌표 (서울시청)
      level: 5, // 초기 확대 레벨
    };

    const map = new window.kakao.maps.Map(container, options);

    // 마커 생성 함수
    const createMarker = (park) => {
      if (!park.latitude || !park.longitude) {
        console.warn(`Skipping park: ${park.name}, invalid coordinates`);
        return; // 유효하지 않은 좌표는 건너뜀
      }

      const position = new window.kakao.maps.LatLng(park.latitude, park.longitude);

      const marker = new window.kakao.maps.Marker({
        position,
        map,
      });

      // 마커 정보창 설정
      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${park.name}</div>`,
      });

      // 마커 클릭 이벤트 추가
      window.kakao.maps.event.addListener(marker, "click", () => {
        infoWindow.open(map, marker);
      });
    };

    // 공원 데이터로 마커 생성
    parks.forEach((park) => createMarker(park));
  }, [parks]);

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
};

export default KakaoMap;
