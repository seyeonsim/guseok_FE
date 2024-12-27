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

  useEffect(() => {
    fetch("http://localhost:8080/api/parks")
      .then((response) => response.json())
      .then((data) => {
        setParks(data);
        setFilteredParks(data);

        const uniqueDistricts = [...new Set(data.map((park) => park.district))]
          .filter((district) => district)
          .sort((a, b) => a.localeCompare(b, "ko"));

        setDistricts(uniqueDistricts);
      })
      .catch((error) => console.error("Error fetching parks:", error));
  }, []);

  const handleDistrictSelect = (district) => {
    if (district === "") {
      setFilteredParks(parks);
      setCenter({ lat: 37.5665, lng: 126.9780 }); // 전체 지역일 경우 기본값으로 이동
    } else {
      const filtered = parks.filter((park) => park.district === district);
      setFilteredParks(filtered);

      if (filtered.length > 0) {
        // 첫 번째 공원의 좌표를 중심으로 설정
        setCenter({ lat: filtered[0].latitude, lng: filtered[0].longitude });
      }
    }
  };

  return (
    <div className="park-list-container">
      <div className="park-list">
        <h2>공원 목록</h2>
        <p>지도를 움직여 공원을 확인하세요!</p>
        <DropDown districts={districts} onSelect={handleDistrictSelect} />
        <div>
          {filteredParks.map((park) => (
            <ParkCard key={park.id} name={park.name} />
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
