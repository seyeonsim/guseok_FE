import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ID를 URL에서 가져옴
import "../../styles/yh/ParkDetail.css";

const ParkDetail = () => {
  const { id } = useParams(); // URL의 :id 파라미터 가져오기
  const [park, setPark] = useState(null); // 공원 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    // API 호출
    fetch(`http://localhost:8080/park/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPark(data); // 데이터 설정
        setLoading(false); // 로딩 상태 해제
      })
      .catch((error) => {
        console.error("Error fetching park detail:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!park) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="park-detail-container">
      <div className="park-header">
        <h2 className="park-name">{park.name || "공원 이름 없음"}</h2>
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
                  <a
                    href={park.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
