import { useEffect, useState } from "react";
import { getEventList, getParkList, getUserDistrict } from "../api/districtApi";
import MainEventCard from "../components/mainPage/MainEventCard";
import MainParkCard from "../components/mainPage/MainParkCard";
import { Link } from "react-router-dom";
import Carousel from "../components/mainPage/Carousel";
import "../styles/new/MainEventCard.css"

function MainPage() {
    const [district, setDistrict] = useState("중구");
    const [event, setEvent] = useState([]);
    const [park, setPark] = useState([]);

    useEffect(() => {
        getUserDistrict(setDistrict);
    }, []);

    useEffect(() => {
        getEventList(district, setEvent, 4);
        getParkList(district, setPark, 4);
    }, [district]);
    return ( <>
        <Carousel />
        
            <article>
                <Link to={'/cultural'}>
                    <p className="article-title">서울시 {district} 문화행사 🎭 {'>'} </p>
                </Link>
                <div className="main-event-container">
                    {event.map((item) => (
                        <MainEventCard
                        key={item.no}
                        eventData={item}
                        />
                    ))}
                </div>
            </article>

            <article>
                <Link to={'/park'}>
                    <p className="article-title">서울시 {district} 공원정보 🌳 {'>'}</p>
                </Link>
                <div className="main-park-container">
                    {park.map((item) => (
                        <MainParkCard
                        key={item.id}
                        parkData={item}
                        />
                    ))}
                </div>
            </article>

            {/* <p>흡연구역 {'>'}</p> */}
        

    </> );
}

export default MainPage;