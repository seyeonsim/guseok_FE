import { useEffect, useRef } from "react";

function Map({event, districtCoordinates}) {
  const mapRef = useRef(null);
  
  useEffect(() => {
    // 카카오맵 API가 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      const container = mapRef.current; // 지도 컨테이너
      const options = {
        center: new window.kakao.maps.LatLng(districtCoordinates.lat, districtCoordinates.lot), // 초기 위치
        level: 8, // 지도 확대 수준
      };

      // 지도를 생성
      const map = new window.kakao.maps.Map(container, options);

      // 마커 추가
      event.forEach((item) => {
        const position = new window.kakao.maps.LatLng(item.lat, item.lot);
        const marker = new window.kakao.maps.Marker({
          position: position,
        });

        marker.setMap(map); // 지도에 마커 추가
      });
    }
  }, [event, districtCoordinates]);

    return (
        <>
        <div ref={mapRef} id="map" style={{width:500+ 'px', height:400 + 'px'}}></div>
        </>
    );
}

export default Map;