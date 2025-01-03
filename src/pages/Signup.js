import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    birth: "",
    gender: "",
    district: "",
  });

  const navigate = useNavigate();

  const districts = [
    "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구",
    "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구",
    "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구",
    "종로구", "중구", "중랑구"
  ];

  const genders = ["남성", "여성"];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  for (const key in formData) {
    if (!formData[key] || formData[key].trim() === "") {
      alert(`${key}를 입력해주세요.`);
      return;
    }
  }

  try {
    const response = await api.post("/api/signup", formData);
    alert("회원가입 되었습니다.");
    navigate("/login"); // 회원가입 성공 후 로그인 페이지로 이동
  } catch (error) {
    alert("회원가입이 실패했습니다.");
  }
};

return (
  <div className="signup-div-container">
    <div className="signup-container">
    <h1 className="signup-title">회원가입</h1>
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="이메일을 입력하세요"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">이름</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="이름을 입력하세요"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="birth">생년월일</label>
        <input
          type="date"
          name="birth"
          id="birth"
          value={formData.birth}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="gender">성별</label>
        <select
          name="gender"
          id="gender" 
          value={formData.gender} 
          onChange={handleChange}>
          <option value="">성별을 선택하세요</option>
          {genders.map((gender, index) => (
            <option key={index} value={gender}>
              {gender}
            </option>
          ))}
          </select>
      </div>
      <div className="form-group">
        <label htmlFor="district">자치구</label>
        <select
          name="district"
          id="districts"
          value={formData.district}
          onChange={handleChange}>
          <option value="">자치구를 선택하세요</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>
      <div className="button-wrapper">
        <button type="submit" className="signup-button">
          회원가입
        </button>
      </div>
    </form>
  </div>
  </div>
);
}

export default Signup;