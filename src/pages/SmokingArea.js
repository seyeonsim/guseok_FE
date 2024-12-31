import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SmokingArea.css';
import KakaoMap from './KakaoMap';
import SmokingList from './SmokingList';
import SmokingNav from './SmokingNav';

function SmokingArea() {
    var [districts, setDistricts] = useState([]);
    var [smokingAreas, setSmokingAreas] = useState([]);
    var [selectedDistrict, setselectedDistrict] = useState("default");

    //초기 데이터
    useEffect(()=>{
          axios.get(`/api/smoking/`)
            .then((response) => {
              setDistricts(response.data.districts); // 중복 제거된 districts
              setSmokingAreas(response.data.smokingAreas); // 모든 흡연 구역
            })
            .catch((error) => console.error('Error fetching districts:', error));
      }, []);

    var handleDistrictChange = (district) => {
      setSmokingAreas([]); // 이전 데이터를 초기화하여 혼동 방지
      setselectedDistrict(district); // 상태 업데이트
        axios.get(`/api/smoking/district?districts=${district}`)
            .then((response)=> {
                setSmokingAreas(response.data.smokingAreas);
            })
            .catch((error)=>console.error('Error fetching filtered district data:', error));
    };

    const handleReset = () => {
      setselectedDistrict("default"); // 선택된 구역 초기화
      setSmokingAreas([]); // 현재 데이터를 지우고 초기 상태로 돌아갈 준비

      axios
        .get('/api/smoking/') // 리셋 엔드포인트 호출 (필요 시)
        .then((response) => {
          setSmokingAreas(response.data.smokingAreas);
        })
        .catch((error) => console.error('Error resetting data:', error));
    };

    return (
      <div className="container">
        <SmokingNav 
            Title={"흡연 구역"}
            districts={districts}
            selectedDistrict={selectedDistrict}
            onDistrictChange={handleDistrictChange}
            onReset={handleReset} 
        />
        <div className="maincontent">
          <SmokingList smokingAreas={smokingAreas} />
          <KakaoMap
            smokingAreas={smokingAreas}
            selectedDistrict={selectedDistrict} 
        />
        </div>
      </div>
    );
  }

export default SmokingArea;