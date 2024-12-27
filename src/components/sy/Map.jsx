import { useEffect } from "react";

function Map() {
    useEffect(() => {
        // Kakao 맵 API가 로드되었는지 확인
        if (window.kakao && window.kakao.maps) {
          const container = document.getElementById('map');
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 초기 위치
            level: 3, // 지도 확대 수준
          };
    
          new window.kakao.maps.Map(container, options);
        }
      }, []); 
    
    
    // function setCenter() {            
    //     // 이동할 위도 경도 위치를 생성합니다 
    //     const moveLatLon = new window.kakao.maps.LatLng(33.452613, 126.570888);
        
    //     // 지도 중심을 이동 시킵니다
    //     map.setCenter(moveLatLon);
    // }
    
    // function panTo() {
    //     // 이동할 위도 경도 위치를 생성합니다 
    //     const moveLatLon = new window.kakao.maps.LatLng(33.450580, 126.574942);
        
    //     // 지도 중심을 부드럽게 이동시킵니다
    //     // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    //     map.panTo(moveLatLon);            
    // }        

    return (
        <>
        <h2>Map</h2>
        <div id="map" style={{width:500+ 'px', height:400 + 'px'}}></div>
        </>
    );
}

export default Map;