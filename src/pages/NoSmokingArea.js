import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SmokingArea.css';
import NoSmokingList from '../components/NoSmokingList';
import SmokingNav from '../components/SmokingNav';
import KakaoMap from './KakaoMap';
import apiClient from '../components/apiClient';

function SmokingArea({region}) {
    var [districts, setDistricts] = useState([]);
    var [nosmokingAreas, setnosmokingAreas] = useState([]);
    var [selectedDistrict, setselectedDistrict] = useState(region? region : "default");
    const [selectedIndex, setSelectedIndex] = useState(null);

    const fetchNoSmokingData = async () => {
      try {
          const response = await apiClient.get('/nosmoking/')
          const fetchedDistricts = response.data.districts;
          setDistricts(fetchedDistricts);

          if(fetchedDistricts.includes(selectedDistrict)) {
              handleDistrictChange(selectedDistrict);
          } else {
              setnosmokingAreas(response.data.noSmokingAreas);
          }
      } catch (error) {
          console.error('Error fetching districts: ', error);
      }
  };

    //지역 클릭 시
    var handleDistrictChange = (district) => {
      setnosmokingAreas([]); // 이전 데이터를 초기화하여 혼동 방지
      setselectedDistrict(district); // 상태 업데이트
      apiClient.get(`/nosmoking/district?districts=${encodeURIComponent(district)}`)
            .then((response)=> {
                setnosmokingAreas(response.data.noSmokingAreas); //자치구에 해당되는 구역 업데이트
            })
            .catch((error)=>console.error('Error fetching filtered district data:', error));
    };

    //초기화 버튼
    const handleReset = () => {
      setselectedDistrict("default"); // 선택된 구역 초기화
      setnosmokingAreas([]); // 현재 데이터를 지우고 초기 상태로 돌아갈 준비

      apiClient
        .get('/nosmoking/') // 리셋 엔드포인트 호출 (필요 시)
        .then((response) => {
          setnosmokingAreas(response.data.noSmokingAreas);
        })
        .catch((error) => console.error('Error resetting data:', error));
    };

    //리스트 클릭 시 지도 이동을 위한 인덱스
    const handleListClick = (index) => {
      setSelectedIndex(index); // 선택된 인덱스 업데이트
    };

    // 초기 데이터 로드
    useEffect(() => {
      fetchNoSmokingData();
    }, [region]); // region 의존성 추가

    return (
      <div className="container">
        <SmokingNav 
            Title={"금연 구역"}
            districts={districts}
            selectedDistrict={selectedDistrict}
            onDistrictChange={handleDistrictChange}
            onReset={handleReset} 
        />
        <div className="maincontent">
          <NoSmokingList nosmokingAreas={nosmokingAreas} onListClick={handleListClick} />
          <KakaoMap
            smokingAreas={nosmokingAreas}
            selectedDistrict={selectedDistrict}
            selectedIndex={selectedIndex}
            transformCoordinates={false}
          />
        </div>
      </div>
    );
  }

export default SmokingArea;