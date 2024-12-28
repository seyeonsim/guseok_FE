import React, { useState, useEffect } from "react";
import DropDown from "../../components/yh/DropDown";
import ParkCard from "../../components/yh/ParkCard";
import KakaoMap from "../../components/yh/KakaoMap";
import "../../styles/yh/ParkList.css";

const ParkList = () => {
  const [parks, setParks] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredParks, setFilteredParks] = useState([]);
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.9780 }); // 초기값: 서울시청

  // useEffect로 데이터 fetch
  useEffect(() => {
    fetch("http://localhost:8080/park")
      .then((response) => response.json())
      .then((data) => {
        setParks(data); // 모든 공원 데이터 설정
        setFilteredParks(data); // 초기값으로 전체 공원 설정

        // 고유한 지역 이름 추출 및 정렬
        const uniqueDistricts = [...new Set(data.map((park) => park.district))]
          .filter((district) => district)
          .sort((a, b) => a.localeCompare(b, "ko"));

        setDistricts(uniqueDistricts); // 지역 리스트 설정
      })
      .catch((error) => console.error("Error fetching parks:", error));
  }, []); // 빈 배열로 설정 -> 컴포넌트 마운트 시 한 번 실행

  const handleDistrictSelect = (district) => {
    if (district === "") {
      setFilteredParks(parks);
      setCenter({ lat: 37.5665, lng: 126.9780 }); // 전체 지역일 경우 기본값으로 이동
    } else {
      const filtered = parks.filter((park) => park.district === district);
      setFilteredParks(filtered);

      if (filtered.length > 0) {
        setCenter({ lat: filtered[0].latitude, lng: filtered[0].longitude });
      }
    }
  };

  return (
    <div className="park-list-container">
      <div className="park-list">
        <div className="park-list-header">
          <h2>공원 목록</h2>
          <p>지도를 움직여서 공원의 위치를 확인하세요!</p>
          <DropDown districts={districts} onSelect={handleDistrictSelect} />
        </div>
        <div className="park-list-cards">
          {filteredParks.map((park) => (
            <ParkCard key={park.id} park={park} />
          ))}
        </div>
      </div>
      <div className="map-container">
        <KakaoMap parks={filteredParks} center={center} />
      </div>
    </div>
  );
};

export default ParkList;
