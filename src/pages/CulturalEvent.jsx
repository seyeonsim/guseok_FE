import { useEffect, useState } from "react";
import Map from "../components/culturalEvent/Map";
import axios from "axios";
import List from "../components/culturalEvent/List";
import { getEventList, getUserDistrict } from "../api/districtApi";

import "../styles/new/List.css"

function CulturalEvent() {
    const [district, setDistrict] = useState("중구");
    const [districts, setDistricts] = useState([]);
    const [event, setEvent] = useState([]);
    const [districtCoordinates, setDistrictCoordinates] = useState({ lat: 37.5637, lot: 126.9976 }); // 중구 기본값
    const [selectedEvent, setSelectedEvent] = useState({});

    // 좋아요 상태를 관리할 상태 변수 추가
    const [likeStatus, setLikeStatus] = useState({});

    const getDistricts = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BACKSERVER + '/districts');
            setDistricts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getLikeStatus = async (targetId) => {
        const token = localStorage.getItem("token"); 
        if (!token) {
            // console.log("로그인되지 않은 상태입니다. 좋아요 확인 요청을 보내지 않습니다. ");
            return; 
        }
        
        try {
            const response = await axios.get(
                `http://localhost:8080/api/like/event/${targetId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            setLikeStatus((prevState) => ({
                ...prevState,
                [targetId]: response.data
            }));
        } catch (error) {
            console.error("Error fetching like status:", error);
        }
    };

    useEffect(() => {
        getEventList(district, setEvent);
    }, [district]);

    useEffect(() => {
        getDistricts();
        getUserDistrict(setDistrict);
    }, []);

    useEffect(() => {
        // 이벤트가 변경될 때마다 각 이벤트의 좋아요 상태를 확인
        event.forEach((eventData) => {
            getLikeStatus(eventData.no);
        });
    }, [event]);

    const handleDistrictChange = (e) => {
        const selectedDistrict = e.target.value;
        setDistrict(selectedDistrict);

        // 선택된 자치구에 맞는 lat, lot 값을 찾기
        const districtData = districts.find((item) => item.name === selectedDistrict);
        if (districtData) {
            setDistrictCoordinates({
                lat: districtData.lat,
                lot: districtData.lot
            });
        }
    };

    const handleListClick = (eventData) => {
        setSelectedEvent(eventData); 
    };

    const handleMarkerClick = (eventData) => {
        setSelectedEvent(eventData);
    };

    return (
        <>
        <article>
            <h1 className="page-title">문화행사</h1>
            <h2 className="user-district">서울특별시 {district}</h2>
            <select name="" id="" value={district} onChange={handleDistrictChange}>
                <option value="" disabled>- 자치구 변경 -</option>
                {districts.map((item) => (
                    <option key={item.id} value={item.name}>
                        {item.name}
                    </option>
                ))}
            </select>
            <div className="event-container">
                <div className="event-lists" >
                    {event.map((item) => (
                        <List
                            key={item.no}
                            eventData={item}
                            selectedEvent={selectedEvent}
                            onListClick={handleListClick}
                            isLiked={likeStatus[item.no]} // 좋아요 상태 전달
                        />
                    ))}
                </div>

                <div className="event-map-container">
                    <Map
                        event={event}
                        districtCoordinates={districtCoordinates}
                        selectedEvent={selectedEvent}
                        onMarkerClick={handleMarkerClick}
                    />
                </div>
            </div>
        </article>
        </>
    );
}

export default CulturalEvent;
