import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SmokingArea.css';
import KakaoMap from './KakaoMap';
import SmokingList from '../components/SmokingList';
import SmokingNav from '../components/SmokingNav';
import apiClient from '../components/apiClient';

function SmokingArea({region}) {
    var [districts, setDistricts] = useState([]);
    var [smokingAreas, setSmokingAreas] = useState([]);
    var [selectedDistrict, setselectedDistrict] = useState(region? region : "default");
    const [selectedIndex, setSelectedIndex] = useState(null);

    //데이터 가져오는 함수
    const fetchSmokingData = async () => {
      try {
        const response = await apiClient.get('/smoking/');
        const fetchedDistricts = response.data.districts;
        setDistricts(fetchedDistricts); // 중복 제거된 districts 설정
  
        // region 값이 districts에 포함되어 있는지 확인
        if (fetchedDistricts.includes(selectedDistrict)) {
          handleDistrictChange(selectedDistrict); // 선택된 지역 데이터 가져오기
        } else {
          setSmokingAreas(response.data.smokingAreas); // 모든 흡연 구역 데이터
        }
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };

    //특정 지역 클릭 시
    var handleDistrictChange = (district) => {
      setSmokingAreas([]); // 이전 데이터를 초기화하여 혼동 방지
      setselectedDistrict(encodeURIComponent(district)); // 상태 업데이트
      apiClient.get(`/smoking/district?districts=${encodeURIComponent(district)}`)
            .then((response)=> {
                setSmokingAreas(response.data.smokingAreas); //자치구에 해당되는 구역 업데이트
            })
            .catch((error)=>console.error('Error fetching filtered district data:', error));
    };

    //초기화 버튼
    const handleReset = () => {
      setselectedDistrict("default"); // 선택된 구역 초기화
      setSmokingAreas([]); // 현재 데이터를 지우고 초기 상태로 돌아갈 준비

      apiClient
        .get('/smoking/') // 리셋 엔드포인트 호출 (필요 시)
        .then((response) => {
          setSmokingAreas(response.data.smokingAreas);
        })
        .catch((error) => console.error('Error resetting data:', error));
    };

    //리스트 클릭 시 지도 이동을 위한 인덱스
    const handleListClick = (index) => {
      setSelectedIndex(index); // 선택된 인덱스 업데이트
    };
    
    // 초기 데이터 로드
    useEffect(() => {
      fetchSmokingData();
    }, [region]); // region 의존성 추가

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
          <SmokingList smokingAreas={smokingAreas} onListClick={handleListClick} />
          <KakaoMap
            smokingAreas={smokingAreas}
            selectedDistrict={selectedDistrict}
            selectedIndex={selectedIndex}
            transformCoordinates={true}
          />
        </div>
      </div>
    );
  }

export default SmokingArea;