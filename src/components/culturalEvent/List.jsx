import axios from "axios";
import { useEffect, useRef, useState } from "react";

function List({ eventData, selectedEvent, onListClick }) {
    const listRef = useRef(null);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (selectedEvent?.no && selectedEvent.no === eventData.no) {
            listRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [selectedEvent, eventData]);

    // 좋아요 토글 함수
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
                // 응답이 성공적이면 상태를 반전시킴
                setIsLiked(!isLiked);
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    return (
        <div 
            ref={listRef}
            style={{ 
                display: "flex", 
                padding: '10px', 
                margin: '10px', 
                cursor: 'pointer',
                border: selectedEvent.no === eventData.no ? '2px solid red' : '1px solid #ccc' 
            }}
            onClick={() => onListClick(eventData)}
        >
            <div>
                <img src={eventData.main_img} alt={eventData.title} />
            </div>
            <div>
                <strong>{eventData.title}</strong>
                <p>{eventData.place}</p>
            </div>
            {/* 좋아요 하트 아이콘 */}
            <div 
                style={{
                    cursor: 'pointer',
                    marginLeft: 'auto',
                    fontSize: '24px',
                    color: isLiked ? 'red' : 'gray',
                }}
                onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트가 리스트 항목에 전달되지 않도록
                    toggleLike(); // 하트 클릭 시 좋아요 상태 토글
                }}
            >
                {isLiked ? '❤️' : '🤍'} {/* 하트 아이콘 표시 */}
            </div>
        </div>
    );
}

export default List;
