import React, { useEffect, useState } from "react";
import axios from "axios";

const KakaoMap = ({ smokingAreas, selectedDistrict, selectedIndex }) => {
  const [isLoaded, setIsLoaded] = useState(false); // Kakao API 로드 상태
  const [map, setMap] = useState(null); // 지도 객체
  const [markers, setMarkers] = useState([]); // 마커 객체 배열
  const [isFirstLoad, setIsFirstLoad] = useState(true); // 초기 로드 상태 추가
  const [currentInfoWindow, setCurrentInfoWindow] = useState(null); // 현재 열린 InfoWindow 추적

  const kakaoApiKey = process.env.REACT_APP_KAKAO_JS;
  const kakaoRestkey = process.env.REACT_APP_KAKAO_REST;

  useEffect(() => {

    if (!kakaoApiKey) {
      console.error("Kakao JavaScript API key is missing.");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        //Geogoder 초기화 위치 변경
          const geocoder = new window.kakao.maps.services.Geocoder();
          console.log("Geocoder 객체 생성 성공:", geocoder);
      } else {
          console.error("Kakao Maps API 로드 실패");
      }
  };

    document.head.appendChild(script);

    script.onload = () => {
      setIsLoaded(true);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isLoaded && window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본 좌표
          level: 3,
        };
        const newMap = new window.kakao.maps.Map(container, options);
        setMap(newMap);
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    //마커 제거 함수
    const removeAllMarkers = () => {
      if (currentInfoWindow) {
        currentInfoWindow.close();
        setCurrentInfoWindow(null);
      }

      console.log("Removing all markers...");
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]);
    };

    //최초 로드 시 마커 생성 및 쿼터 방지
    if (isFirstLoad && selectedDistrict === "default") {
      console.log("Skipping marker creation on first load.");
      setIsFirstLoad(false); // 초기 로드 상태를 해제
      return;
    }

    //전체구 선택 시 마커 초기화(api 쿼터 초과 방지)
    if(selectedDistrict === "default" || !map) {
      removeAllMarkers();
      return;
    }
    
    //최로 로드x 전체구x 흡연 구역이 존재할 때
    if (smokingAreas.length > 0 && !isFirstLoad && selectedDistrict !== "default") {
      console.log("Marker is updated!");

      // 기존 마커 제거
      removeAllMarkers();

      // 지도 중심 설정
      axios
        .get(
          `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
            smokingAreas[0].address
          )}`,
          { headers: { Authorization: `KakaoAK ${kakaoRestkey}` } }
        )
        .then((response) => {
          if (response.data.documents.length > 0) {
            //리스트의 가장 첫번째 장소로 지도 중심을 이동
            const firstLocation = response.data.documents[0];
            const center = new window.kakao.maps.LatLng(
              firstLocation.y,
              firstLocation.x
            );
            map.setCenter(center);
          }
        })
        .catch((error) =>
          console.error("Error fetching coordinates for first location:", error)
        );

      // 마커 생성
      const createMarkers = async () => {
        const newMarkers = [];
        for (const area of smokingAreas) {
          if (area && area.address) {
            try {
              const response = await axios.get(
                `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
                  area.address
                )}`,
                { headers: { Authorization: `KakaoAK ${kakaoRestkey}` } }
              );
  
              if (response.data.documents.length > 0) {
                const location = response.data.documents[0];
                const position = new window.kakao.maps.LatLng(location.y,location.x);
                const address = area.address;
                const marker = new window.kakao.maps.Marker({
                  position,
                  map,
                  address,
                });

                const infoWindow = new window.kakao.maps.InfoWindow({
                  content: `<div style="padding:5px;">${area.address}</div>`,
                });

                // 마커 클릭 이벤트
                window.kakao.maps.event.addListener(marker, 'click', () => {
                    if(currentInfoWindow) {
                      currentInfoWindow.close();
                    }

                    infoWindow.open(map, marker);
                    setCurrentInfoWindow(infoWindow);
                });

                newMarkers.push(marker);
              }
            } catch (error) {
              console.error(`Error fetching coordinates for ${area.address}:`, error);
            }
          }
        }

        // 지도를 클릭했을 때 InfoWindow 닫기
        window.kakao.maps.event.addListener(map, 'click', () => {
          if (currentInfoWindow) {
              currentInfoWindow.close();
              setCurrentInfoWindow(null);
          }
        });
        setMarkers(newMarkers); // 마커 업데이트
      };
      createMarkers(); //마커 생성
    }
  }, [map, smokingAreas, selectedDistrict]);

  useEffect(() => {
    if (selectedIndex !== null && markers.length > selectedIndex && selectedDistrict !== "default") {
      const selectedMarker = markers[selectedIndex];
      if (selectedMarker) {
        const position = selectedMarker.getPosition();
        map.setCenter(position); // 지도 중심 이동

        if (currentInfoWindow) {
          currentInfoWindow.close();
        }
  
        // InfoWindow 표시
        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${smokingAreas[selectedIndex].address}</div>`,
        });
        infoWindow.open(map, selectedMarker);

        setCurrentInfoWindow(infoWindow);
      }
    }
  }, [selectedIndex, markers, map, smokingAreas]);

  return (
    <div
      id="map"
      style={{ width: "500px", height: "500px", marginLeft: "20px", marginTop: "10px", borderRadius: "10px", boxShadow: "0 3px 6px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0,0,0,0.23)"}}
    />
  );
};

export default KakaoMap;
