import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SmokingArea.css';
import SmokingNav from '../components/SmokingNav';
import TrashList from '../components/TrashList';

function TrashShedule() {
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("default");
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        axios.get(`/api/trash/`)
        .then((response) => {
            setDistricts(response.data.districts);
            setSchedule(response.data.trashSchedules);
        })
        .catch(error=>console.error('Error fetching districts:', error));
    }, []);

    const handleDistrictChange = (district) => {
        setSchedule([]);
        setSelectedDistrict(district);
        axios.get(`/api/trash/district?districts=${district}`)
            .then((response) => {
                setSchedule(response.data.trashSchedules);
            })
            .catch((error) => console.error('Error fetching districts:', error));
    }

    const handleReset = () => {
        setSelectedDistrict("default"); // 선택된 구역 초기화
        setSchedule([]); // 현재 데이터를 지우고 초기 상태로 돌아갈 준비
  
        axios
          .get('/api/trash/') // 리셋 엔드포인트 호출 (필요 시)
          .then((response) => {
            setSchedule(response.data.trashSchedules);
          })
          .catch((error) => console.error('Error resetting data:', error));
      };

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