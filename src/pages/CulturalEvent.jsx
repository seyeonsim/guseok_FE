import { useEffect, useState } from "react";
import Map from "../components/sy/Map";
import axios from "axios";
import List from "../components/sy/List";

function CulturalEvent() {
    const [district, setDistrict] = useState("중구");
    const [districts, setDistricts] = useState([]);
    const [event, setEvent] = useState([]);
    const [districtCoordinates, setDistrictCoordinates] = useState({ lat: 37.5637, lot: 126.9976 }); // 중구 기본값


    const getDistricts = async () => {
        try {
          const response = await axios.get(process.env.REACT_APP_BACKSERVER +'/districts');
          console.log(response.data);
          setDistricts(response.data);
        } catch (error) {
          console.error(error);
        }
      };

    const getEventList = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BACKSERVER + '/event', {
                params: { district }
            });
    
            console.log(response.data);
            setEvent(response.data);

        } catch(error) {
            console.log(error)
        }

    };

    useEffect(() => {
        getEventList();
        getDistricts();
    }, [district]);

    const handleDistrictChange = (e) => {
        // console.log(e.target.value);
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


    return (
        <>
        <h1>Cultural Event</h1>
        <h2>서울특별시 {district}</h2>
        <select name="" id="" onChange={handleDistrictChange}>
            <option value="">- 자치구 변경 -</option>
            {districts.map((item) => (
                <option key={item.id} value={item.name} >
                    {item.name}
                </option>
            ))}
        </select>
        <div style={{display: "flex"}}>
            <List event={event} />
            <Map event={event} districtCoordinates={districtCoordinates}/>
        </div>
        </>
    );
}

export default CulturalEvent;