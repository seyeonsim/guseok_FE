import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ParkCard.css";

const ParkCard = ({ park }) => {
  const navigate = useNavigate(); // React Router의 navigate 함수 사용

  const handleClick = () => {
    navigate(`/park/${park.id}`); // 공원 ID를 기반으로 이동
  };

  const { name, address, phone, information, image } = park;

  const truncatedInfo =
    information && information.length > 200
      ? information.slice(0, 200) + "..."
      : information;

  return (
    <div className="park-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="park-image">
        <img src={image || "/images/default.jpg"} alt={`${name} 이미지`} />
      </div>
      <div className="park-details">
        <h2 className="park-name">{name}</h2>
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
