import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // ← 좋아요 API 요청용
import "../styles/ParkDetail.css";

const ParkDetail = () => {
  const { id } = useParams(); // URL의 :id 파라미터
  const [park, setPark] = useState(null); // 공원 정보
  const [loading, setLoading] = useState(true); 
  const [liked, setLiked] = useState(false); // ← 좋아요 상태

  // 1) 공원 상세정보 fetch
  useEffect(() => {
    fetch(`http://localhost:8080/park/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPark(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching park detail:", error);
        setLoading(false);
      });
  }, [id]);

  // 2) 서버에서 해당 공원 좋아요 여부 조회 (로그인된 사용자 기준)
  useEffect(() => {
    const getLikeStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // 비로그인 상태면 false 처리
          setLiked(false);
          return;
        }
        const response = await axios.get(
          `http://localhost:8080/api/like/park/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        // 서버에서 boolean(true/false)로 내려준다고 가정
        setLiked(response.data === true);
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
        `http://localhost:8080/api/like/park/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // 정상 응답 시 liked 상태 뒤집기
        setLiked((prev) => !prev);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!park) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="park-detail-container">
      <div className="park-header">
        {/* 공원 이름 + 좋아요 아이콘을 나란히 배치 */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 className="park-name" style={{ marginRight: "10px" }}>
            {park.name || "공원 이름 없음"}
          </h2>
          {/* 하트 아이콘 */}
          <div
            style={{
              fontSize: "24px",
              cursor: "pointer",
              color: liked ? "red" : "gray",
            }}
            onClick={handleToggleLike}
          >
            {liked ? "❤️" : "🤍"}
          </div>
        </div>

        <button className="back-button" onClick={() => window.history.back()}>
          목록 조회
        </button>
      </div>
      <hr />
      <div className="park-content">
        <div className="park-images">
          <div className="image-label">사진</div>
          <img
            src={park.image || "/images/default.jpg"}
            alt={`${park.name} 이미지`}
            className="park-image"
          />
          <div className="image-label">지도</div>
          <img
            src={park.map || "/images/default-map.jpg"}
            alt={`${park.name} 지도`}
            className="park-map"
          />
        </div>
        <div className="park-info">
          <div className="info-left">
            <p>정보</p>
            <div className="info-box">{park.information || "정보 없음"}</div>
          </div>
          <div className="info-right">
            <div>
              <p>주소</p>
              <div className="info-box">{park.address || "주소 정보 없음"}</div>
            </div>
            <div>
              <p>전화번호</p>
              <div className="info-box">{park.phone || "전화번호 없음"}</div>
            </div>
            <div>
              <p>시설</p>
              <div className="info-box">{park.facility || "시설 정보 없음"}</div>
            </div>
            <div>
              <p>면적</p>
              <div className="info-box">{park.area || "면적 정보 없음"}</div>
            </div>
            <div>
              <p>링크</p>
              <div className="info-box">
                {park.link ? (
                  <a href={park.link} target="_blank" rel="noopener noreferrer">
                    링크 보기
                  </a>
                ) : (
                  "링크 없음"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkDetail;
