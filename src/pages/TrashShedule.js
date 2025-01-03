import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SmokingArea.css';
import SmokingNav from '../components/SmokingNav';
import TrashList from '../components/TrashList';
import apiClient from '../components/apiClient';

function TrashShedule({region}) {
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(region? region : "default");
    const [schedule, setSchedule] = useState([]);

    const fetchTrashSchedule = async () => {
        try {
            const response = await apiClient.get('/trash/')
            const fetchedDistricts = response.data.districts;
            setDistricts(fetchedDistricts);

            if(fetchedDistricts.includes(selectedDistrict)) {
                handleDistrictChange(selectedDistrict);
            } else {
                setSchedule(response.data.trashSchedules);
            }
        } catch (error) {
            console.error('Error fetching districts: ', error);
        }
    };

    const handleDistrictChange = (district) => {
        setSchedule([]);
        setSelectedDistrict(district);
        apiClient.get(`/trash/district?districts=${encodeURIComponent(district)}`)
            .then((response) => {
                setSchedule(response.data.trashSchedules);
            })
            .catch((error) => console.error('Error fetching districts:', error));
    }

    const handleReset = () => {
        setSelectedDistrict("default"); // 선택된 구역 초기화
        setSchedule([]); // 현재 데이터를 지우고 초기 상태로 돌아갈 준비
  
        apiClient
          .get('/trash/') // 리셋 엔드포인트 호출 (필요 시)
          .then((response) => {
            setSchedule(response.data.trashSchedules);
          })
          .catch((error) => console.error('Error resetting data:', error));
      };

    // 초기 데이터 로드
    useEffect(() => {
    fetchTrashSchedule();
    }, [region]); // region 의존성 추가

    return(
        <div className="container">
            <SmokingNav 
                Title={"쓰레기 배출일"}
                districts={districts}
                selectedDistrict={selectedDistrict}
                onDistrictChange={handleDistrictChange}
                onReset={handleReset} 
            />
            <div className="maincontent">
                <TrashList 
                    trashSchedules={schedule} 
                    district={selectedDistrict}
                />
            </div>
        </div>
    );
}

export default TrashShedule;