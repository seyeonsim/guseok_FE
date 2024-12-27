import React, { useState, useEffect } from "react";
import DropDown from "../../components/yh/DropDown";
import ParkCard from "../../components/yh/ParkCard";
import KakaoMap from "../../components/yh/KakaoMap";
import "../../styles/yh/ParkList.css"; // 스타일 import

const ParkList = () => {
  const [parks, setParks] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredParks, setFilteredParks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/parks")
      .then((response) => response.json())
      .then((data) => {
        setParks(data);
        setFilteredParks(data);

        // 중복 제거한 지역 리스트 생성 + 가나다순 정렬
        const uniqueDistricts = [...new Set(data.map((park) => park.district))]
          .filter((district) => district) // null 제거
          .sort((a, b) => a.localeCompare(b, "ko")); // 한글 정렬

        setDistricts(uniqueDistricts);
      })
      .catch((error) => console.error("Error fetching parks:", error));
  }, []);

  const handleDistrictSelect = (district) => {
    if (district === "") {
      setFilteredParks(parks);
    } else {
      setFilteredParks(parks.filter((park) => park.district === district));
    }
  };

  return (
    <div className="park-list-container">
      {/* 목록 영역 */}
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

      {/* 지도 영역 */}
      <div className="map-container">
        <KakaoMap parks={filteredParks} />
      </div>
    </div>
  );
};

export default ParkList;
