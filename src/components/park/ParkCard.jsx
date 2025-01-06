import React, { useEffect, useState } from "react"; // 작성자 : 박유현
import { useNavigate } from "react-router-dom";

// import "../../styles/ParkCard.css";

import "../../styles/new/List.css";
import axios from "axios";


const ParkCard = ({ park }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const { id, name, address, phone, information, image } = park;

  // 길어진 정보는 일정 길이만 표시
  const truncatedInfo =
    information && information.length > 200
      ? information.slice(0, 200) + "..."
      : information;

  // (1) 마운트 시 좋아요 상태 가져오기
  useEffect(() => {
    const getLikeStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLiked(false);
          return;
        }
        const response = await axios.get(
          `http://localhost:8080/api/like/park/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setLiked(response.data === true);
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    };
    getLikeStatus();
  }, [id]);

  // (2) 좋아요 토글
  const toggleLike = async (e) => {
    e.stopPropagation(); // 카드 전체 클릭 방지
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인 후 좋아요를 누를 수 있습니다.");
        return;
      }
      const response = await axios.post(
        `http://localhost:8080/api/like/park/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setLiked((prev) => !prev);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // 카드 전체 클릭 -> 상세페이지 이동
  const handleCardClick = () => {
    navigate(`/park/${id}`);
  };

  return (
    <div className="park-card" onClick={handleCardClick}>
      {/* 좌측에 이미지 */}
      <div className="park-image">
        <img src={image || "/images/default.jpg"} alt={`${name} 이미지`} />
      </div>

      {/* 우측에 텍스트 영역 */}
      <div className="park-details">

        {/* ❶ 공원 이름 + 하트 아이콘을 한 줄에 배치 */}
        <div className="park-title-row">
          <h2 className="park-name">{name}
            {/* 하트 아이콘 (항상 보이도록) */}
            <span
              className="like-icon"
              onClick={toggleLike}
              style={{
                fontSize: "24px",
                cursor: "pointer",
                color: liked ? "red" : "gray",
                marginLeft: "10px", // 필요시 간격 조절
              }}
            >
              {liked ? "🩵" : "🤍"}
            </span>

          </h2>

        </div>

        <p className="park-address">
          <i className="icon-map"></i> {address || "주소 정보 없음"}
        </p>
        <p className="park-phone">
          <i className="icon-phone"></i> {phone || "전화번호 없음"}
        </p>
        <p className="park-info">{truncatedInfo || "공원 정보 없음"}</p>
      </div>

      </div>

  );
};

export default ParkCard;
