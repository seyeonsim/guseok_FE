import { useEffect, useRef } from "react";

function Map({event}) {
  const mapRef = useRef(null);
  
  useEffect(() => {
    // 카카오맵 API가 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      const container = mapRef.current; // 지도 컨테이너
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 초기 위치
        level: 70, // 지도 확대 수준
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
  }, [event]); // `event`가 변경될 때마다 지도 및 마커를 갱신

    return (
        <>
        <div ref={mapRef} id="map" style={{width:500+ 'px', height:400 + 'px'}}></div>
        </>
    );
}

export default Map;