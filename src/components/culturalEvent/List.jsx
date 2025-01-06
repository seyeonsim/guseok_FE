import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../../styles/new/List.css"

function List({ eventData, selectedEvent, onListClick, isLiked }) {
    const listRef = useRef(null);
    const [liked, setLiked] = useState(isLiked);

    useEffect(() => {
        setLiked(isLiked); // 부모로부터 받은 좋아요 상태로 초기화
    }, [isLiked]);

    useEffect(() => {
        if (selectedEvent?.no && selectedEvent.no === eventData.no) {
            listRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [selectedEvent, eventData]);

    const toggleLike = async () => {
        try {
            const token = localStorage.getItem("token"); // JWT 토큰 가져오기
            const response = await axios.post(
                `http://localhost:8080/api/like/event/${eventData.no}`, 
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                setLiked(!liked); // 좋아요 상태 토글
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    return (
        <div className="list-card"
            ref={listRef}
            style={{ 
                border: selectedEvent.no === eventData.no ? "2px solid #a9c3f2" : "1px solid #ccc",
            }}
            onClick={() => onListClick(eventData)}
        >
            <div className="list-img">
                <img src={eventData.main_img} alt={eventData.title} />
            </div>
            <div className="list-text">
                <h3>{eventData.title} 
                <span
                style={{
                    cursor: "pointer",
                    marginLeft: "auto",
                    fontSize: "24px",
                    color: liked ? "red" : "gray",
                }}
                onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트가 리스트 항목에 전달되지 않도록
                    toggleLike(); // 하트 클릭 시 좋아요 상태 토글
                }}
            >
                {liked ? " 🩵" : " 🤍"}
            </span>
                </h3>
                
                <p>{eventData.event_date}</p>
                <p>{eventData.place}</p>
                <p>{eventData.use_trgt}</p>
                <p>
                    <a href={eventData.org_link} target="_blank">
                    상세 페이지
                    </a>
                </p>
            </div>
        </div>
    );
}

export default List;
