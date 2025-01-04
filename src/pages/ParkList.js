import React, { useState, useEffect } from "react";
import DropDown from "../components/DropDown";
import ParkCard from "../components/ParkCard";
import KakaoMap from "../components/KakaoMap";
import "../styles/ParkList.css";

const ParkList = () => {
  // ----- 주 상태들 -----
  const [parks, setParks] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredParks, setFilteredParks] = useState([]);
  const [displayedParks, setDisplayedParks] = useState([]);
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.9780 }); // 기본 서울시청
  const [selectedDistrict, setSelectedDistrict] = useState(null); // 처음엔 null(로그인 정보 대기)
  const [selectedPark, setSelectedPark] = useState(null);

  // 로딩 완료 여부
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isParksLoaded, setIsParksLoaded] = useState(false);

  // -----------------------------------------------------------------
  // 1) 사용자 정보 (로그인 유무 + 자치구) 가져오기
  // -----------------------------------------------------------------
  useEffect(() => {
    fetch("http://localhost:8080/userinfo", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not logged in");
      })
      .then((data) => {
        if (data && data.district) {
          // 사용자 자치구 사용
          setSelectedDistrict(data.district);
        } else {
          // 자치구 정보가 없으면 "전체 지역"
          setSelectedDistrict("전체 지역");
        }
        setIsUserLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        // 비로그인
        setSelectedDistrict("전체 지역");
        setIsUserLoaded(true);
      });
  }, []);

  // -----------------------------------------------------------------
  // 2) 공원 목록 가져오기
  // -----------------------------------------------------------------
  useEffect(() => {
    fetch("http://localhost:8080/park", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // 이름 한글 정렬
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name, "ko"));
        setParks(sorted);

        // 자치구 목록
        const uniqueDistricts = [...new Set(sorted.map((p) => p.district))]
          .filter((d) => d)
          .sort((a, b) => a.localeCompare(b, "ko"));
        setDistricts(["전체 지역", ...uniqueDistricts]);

        setIsParksLoaded(true);
      })
      .catch((err) => console.error(err));
  }, []);

  // -----------------------------------------------------------------
  // 3) user & parks 모두 로딩 끝난 뒤 → selectedDistrict에 맞춰 필터링
  // -----------------------------------------------------------------
  useEffect(() => {
    if (!isUserLoaded || !isParksLoaded) return; // 아직 둘 중 하나라도 로드 안 됨
    if (selectedDistrict === null) return; // 자치구 정보도 아직 모름

    let newFiltered = [];

    if (selectedDistrict === "전체 지역") {
      newFiltered = parks;
      setCenter({ lat: 37.5665, lng: 126.9780 }); // 서울시청
    } else {
      newFiltered = parks.filter((p) => p.district === selectedDistrict);
      if (newFiltered.length > 0) {
        setCenter({
          lat: newFiltered[0].latitude,
          lng: newFiltered[0].longitude,
        });
      } else {
        setCenter({ lat: 37.5665, lng: 126.9780 });
      }
    }

    setFilteredParks(newFiltered);
    setSelectedPark(null); // 구 바뀌면 선택 해제
  }, [isUserLoaded, isParksLoaded, selectedDistrict, parks]);

  // -----------------------------------------------------------------
  // 4) filteredParks 바뀔 때 → displayedParks 업데이트
  // -----------------------------------------------------------------
  useEffect(() => {
    setDisplayedParks(filteredParks);
  }, [filteredParks]);

  // -----------------------------------------------------------------
  // 5) 드롭다운에서 자치구 선택
  // -----------------------------------------------------------------
  const handleDistrictSelect = (dist) => {
    setSelectedDistrict(dist);
  };

  // -----------------------------------------------------------------
  // 6) 마커 클릭 시
  //    - 이미 선택된 마커 누르면 해제,
  //    - 아니면 해당 공원만 왼쪽에 표시
  // -----------------------------------------------------------------
  const handleMarkerClick = (park) => {
    if (selectedPark && selectedPark.id === park.id) {
      setSelectedPark(null);
      setDisplayedParks(filteredParks);
    } else {
      setSelectedPark(park);
      setDisplayedParks([park]);
    }
  };

  // 아직 center가 null이 아닌지, 또는 로딩 중 상태표시 할 수도 있음
  // 여기서는 간단히 로딩은 끝났어도 selectedDistrict가 null이면 대기 중으로 처리
  if (selectedDistrict === null) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="park-list-container">
      <div className="park-list">
        <div className="park-list-header">
          <h2>공원 목록</h2>
          <p>지도를 움직여서 공원의 위치를 확인하세요!</p>
          <DropDown
            districts={districts}
            onSelect={handleDistrictSelect}
            value={selectedDistrict}
          />
        </div>

        <div className="park-list-cards">
          {displayedParks.map((park) => (
            <ParkCard key={park.id} park={park} />
          ))}
        </div>
      </div>

      <div className="map-container">
        <KakaoMap
          parks={filteredParks}
          center={center}
          selectedPark={selectedPark}
          onMarkerClick={handleMarkerClick}
        />
      </div>
    </div>
  );
};

export default ParkList;
