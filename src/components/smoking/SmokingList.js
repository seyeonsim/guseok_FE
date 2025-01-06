import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../styles/SmokingArea.css';

function SmokingList({smokingAreas, onListClick, area, index, id, key}) {
  // 좋아요 상태를 관리할 상태 변수 추가
  const [likeStatus, setLikeStatus] = useState({});

  useEffect(() => {
    const getLikeStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // 비로그인 상태면 false 처리
          setLikeStatus(false);
          return;
        }
        const response = await axios.get(
          `http://localhost:8080/api/like/smoking/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        // 서버에서 boolean(true/false)로 내려준다고 가정
        setLikeStatus(response.data === true);
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };
    getLikeStatus();
  }, [id]);

  // 3) 좋아요 토글 함수
  const handleToggleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인 후 좋아요를 누를 수 있습니다.");
        return;
      }
      // 서버에 POST로 좋아요 토글 요청
      const response = await axios.post(
        `http://localhost:8080/api/like/smoking/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // 정상 응답 시 likeStatus 상태 뒤집기
        setLikeStatus((prev) => !prev);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

    return(
        <div 
          key={key}
          className="facility-card"
          onClick={() => onListClick(index)}
          style={{ cursor: "pointer" }}
        >
          <p>📍 {area.address} {area.detail}</p>
          <div
            style={{
              fontSize: "24px",
              cursor: "pointer",
              color: likeStatus ? "red" : "gray",
            }}
            onClick={handleToggleLike}
          >
            {likeStatus ? "🩵" : "🤍"}
          </div>
          <p>🚩 {area.open}</p>
        </div>
    )
}

export default SmokingList;