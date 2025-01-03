import { useEffect, useState } from "react";
import { getEventList, getParkList } from "../api/districtApi";
import MainEventCard from "../components/mainPage/MainEventCard";
import MainParkCard from "../components/mainPage/MainParkCard";
import { Link } from "react-router-dom";
import Carousel from "../components/mainPage/Carousel";

function MainPage() {
    const [district, setDistrict] = useState("중구");
    const [event, setEvent] = useState([]);
    const [park, setPark] = useState([]);

    useEffect(() => {
        getEventList(district, setEvent, 4);
        getParkList(district, setPark, 4);
    }, []);
    return ( <>
        <Carousel />
    

    <Link to={'/cultural'}>
        <p>문화행사 {'>'} </p>
    </Link>
    <div style={{display: "flex"}}>
        {event.map((item) => (
            <MainEventCard
            key={item.no}
            eventData={item}
            />
        ))}
    </div>

    <p>공원 {'>'}</p>
    <div style={{display: "flex"}}>
        {park.map((item) => (
            <MainParkCard
            key={item.id}
            parkData={item}
            />
        ))}
    </div>

    <p>흡연구역 {'>'}</p>

    </> );
}

export default MainPage;