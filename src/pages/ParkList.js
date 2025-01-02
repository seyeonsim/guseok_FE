import React, { useState, useEffect } from "react";
import DropDown from "../components/DropDown";
import ParkCard from "../components/ParkCard";
import KakaoMap from "../components/KakaoMap";
import "../styles/ParkList.css";

const ParkList = () => {
  const [parks, setParks] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredParks, setFilteredParks] = useState([]);
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.9780 });
  const [selectedDistrict, setSelectedDistrict] = useState("전체 지역");
  const [selectedPark, setSelectedPark] = useState(null);

  // useEffect로 데이터 fetch
  useEffect(() => {
    fetch("http://localhost:8080/park", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 세션 쿠키 포함 (CORS 설정 필요)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // 공원 데이터를 이름 기준으로 가나다 순 정렬
        const sortedParks = data.sort((a, b) => 
        a.name.localeCompare(b.name, "ko"));
        setParks(sortedParks); // 모든 공원 데이터 설정
        setFilteredParks(sortedParks); // 초기값으로 전체 공원 설정

        // 고유한 지역 이름 추출 및 정렬
        const uniqueDistricts = [...new Set(data.map((park) => park.district))]
          .filter((district) => district)
          .sort((a, b) => a.localeCompare(b, "ko"));
        setDistricts(uniqueDistricts); // 지역 리스트 설정
      })
      .catch((error) => console.error("Error fetching parks:", error));
  }, []); // 빈 배열로 설정 -> 컴포넌트 마운트 시 한 번 실행

  useEffect(() => {
    if (selectedDistrict === "전체 지역") {
      setFilteredParks(parks);
    } else {
      const filtered = parks.filter((park) => park.district === selectedDistrict);
      setFilteredParks(filtered);
    }
  }, [parks, selectedDistrict]);

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district); // 선택된 지역 상태 업데이트

    if (district === "전체 지역") {
      setFilteredParks(parks);
      setCenter({ lat: 37.5665, lng: 126.9780 }); // 서울시청 좌표로 초기화
    } else {
      const filtered = parks.filter((park) => park.district === district);
      setFilteredParks(filtered);
      if (filtered.length > 0) {
        setCenter({ lat: filtered[0].latitude, lng: filtered[0].longitude });
      } else {
        setCenter({ lat: 37.5665, lng: 126.9780 }); // 공원이 없을 경우 기본값 설정
      }
    }
  };

  const handleMarkerClick = (park) => {
    if (selectedPark && selectedPark.id === park.id) {
      // 동일한 마커를 다시 클릭하면 초기화
      setSelectedPark(null);
      const updatedParks =
        selectedDistrict === "전체 지역"
          ? parks
          : parks.filter((p) => p.district === selectedDistrict);
      setFilteredParks(updatedParks);
    } else {
      setSelectedPark(park);
      setFilteredParks([park]);
      setCenter({ lat: park.latitude, lng: park.longitude });
    }
  };

  return (
    <div className="park-list-container">
      <div className="park-list">
        <div className="park-list-header">
          <h2>공원 목록</h2>
          <p>지도를 움직여서 공원의 위치를 확인하세요!</p>
          <DropDown 
            districts={districts} 
            onSelect={handleDistrictSelect} 
            value={selectedDistrict} // 현재 선택된 값을 드롭다운에 반영
          />
        </div>
        <div className="park-list-cards">
          {filteredParks.map((park) => (
            <ParkCard key={park.id} park={park} />
          ))}
        </div>
      </div>
      <div className="map-container">
      <KakaoMap
          parks={filteredParks}
          center={center}
          onMarkerClick={handleMarkerClick} // 마커 클릭 이벤트
        />
      </div>
    </div>
  );
};

export default ParkList;
