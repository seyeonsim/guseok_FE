import { useEffect, useRef } from "react";

function Map({ event, districtCoordinates, selectedEvent, onMarkerClick }) {
  const mapRef = useRef(null);

  /* TODO
  * 마커 마우스오버 시 인포윈도우 생성
  * 지역구 변화 없을 때는 마커 재렌더링 막기?
  * 지역구 변화 없을 때는 지도 중심 재렌더링 막기? 
  */

  // 중복 위치를 그룹화
  const groupMarkersByPosition = (events) => {
    const groups = {};
    events.forEach((event) => {
      const key = `${event.lat},${event.lot}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(event);
    });
    return Object.values(groups);
  };

  // 마커 위치를 원형으로 조정
  const adjustMarkers = (lat, lot, index, total) => {
    const angle = (360 / total) * index; // 각도 계산
    const radius = 0.0001; // 반경 설정
    const radian = (angle * Math.PI) / 180;

    return {
      lat: lat + radius * Math.sin(radian),
      lot: lot + radius * Math.cos(radian),
    };
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(
          districtCoordinates.lat,
          districtCoordinates.lot
        ),
        level: 7,
      };

      const map = new window.kakao.maps.Map(container, options);

      // 그룹화된 마커 처리
      const groupedMarkers = groupMarkersByPosition(event);

      groupedMarkers.forEach((group) => {
        group.forEach((item, index) => {
          const { lat, lot } =
            group.length > 1
              ? adjustMarkers(group[0].lat, group[0].lot, index, group.length)
              : item;

          const position = new window.kakao.maps.LatLng(lat, lot);

          const markerOptions = {
            position: position,
          };

          // 선택된 이벤트 커스텀 이미지
          if (selectedEvent.no === item.no) {
            markerOptions.image = new window.kakao.maps.MarkerImage(
              "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              new window.kakao.maps.Size(30, 44)
            );
            markerOptions.zIndex = 1000;
          }

          const marker = new window.kakao.maps.Marker(markerOptions);
          marker.setMap(map);

          window.kakao.maps.event.addListener(marker, "click", () => {
            onMarkerClick(item);
          });
        });
      });
    }
  }, [event, districtCoordinates, selectedEvent]);

  return (
    <div
      ref={mapRef}
      id="map"
      style={{ width: 500 + "px", height: 400 + "px" }}
    ></div>
  );
}

export default Map;
