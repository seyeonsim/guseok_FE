import { useEffect, useState } from "react";
import Map from "../components/sy/Map";
import axios from "axios";
import List from "../components/sy/List";
import { getEventList } from "../api/districtApi";

function CulturalEvent() {
    const [district, setDistrict] = useState("중구");
    const [districts, setDistricts] = useState([]);
    const [event, setEvent] = useState([]);
    const [districtCoordinates, setDistrictCoordinates] = useState({ lat: 37.5637, lot: 126.9976 }); // 중구 기본값
    const [selectedEvent, setSelectedEvent] = useState({});

    const getDistricts = async () => {
        try {
          const response = await axios.get(process.env.REACT_APP_BACKSERVER +'/districts');
          console.log(response.data);
          setDistricts(response.data);
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        getEventList(district, setEvent);
    }, [district]);

    useEffect(() => {
        getDistricts();
    }, []);

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
    }

    return (
        <>
        <h1>Cultural Event</h1>
        <h2>서울특별시 {district}</h2>
        <select name="" id="" value={district} onChange={handleDistrictChange}>
            <option value="">- 자치구 변경 -</option>
            {districts.map((item) => (
                <option key={item.id} value={item.name} >
                    {item.name}
                </option>
            ))}
        </select>
        <div style={{display: "flex"}}>
            <div style={{ overflowY: "auto", height: "70vh" }}>
                {event.map((item) => (
                    <List 
                        key={item.no} 
                        eventData={item} 
                        selectedEvent={selectedEvent} 
                        onListClick={handleListClick} 
                    />
                ))}
            </div>
            <Map 
                event={event} 
                districtCoordinates={districtCoordinates} 
                selectedEvent={selectedEvent} 
                onMarkerClick={handleMarkerClick} 
            />
        </div>
        </>
    );
}

export default CulturalEvent;
