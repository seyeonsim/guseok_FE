import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MyPage.css';
import apiClient from '../components/apiClient';

function MyPage () {
  const[isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    birth: '',
    gender: '', 
    district: '',
  });
  const [message, setMessage] = useState('');
  const [district, setDistricts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/mypage/');
        console.log("Fetched user data:", response.data); // 디버깅: 응답 데이터 확인

        setFormData(response.data);
        const districtResponse = await apiClient.get('/districts');
        setDistricts(districtResponse.data);
      } catch(error) {
        console.error("Failed to fetch user data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData, [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEdit(true);
  }

  const onCancleClick = () => {
    setIsEdit(false);
  }

  const Modal = ({ message, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );

  //수정 버튼 클릭
  const onUpdateClick = async () => {
    try {
      const response = await apiClient.post('/mypage/update', formData);
      setMessage("User updated Succesfully!");
      setIsEdit(false);

      const updatedData = await apiClient.get('/mypage/');
      setFormData(updatedData.data);

      setShowModal(true);
    } catch (error) {
      setMessage("Failed to update user information");
    }
  }

    return (
      <div className="mypage-container">
        <div className="mypage-title">
          <h2>마이페이지</h2>
          {isEdit ? (
            <div>
              <button className="modify-btn" onClick={onUpdateClick}>
                수정
              </button>
              <button className="modify-btn" onClick={onCancleClick}>
                취소
              </button>
            </div>
          ) : (
            <button className="modify-btn" onClick={handleEditClick}>
              회원정보 수정
            </button>
          )}
        </div>
        <div className="mypage-content">
          <div className="mypage-row">
            <div className="mypage-item">
              <label>아이디</label>
              <input type="text" value={formData.email} readOnly />
            </div>
            <div className="mypage-item">
              <label>닉네임</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} readOnly={!isEdit} />
            </div>
          </div>
          <div className="mypage-row">
            <div className="mypage-item">
              <label>성별</label>
              <select name="gender" value={formData.gender} onChange={handleChange} disabled={!isEdit}>
                <option value="Male">남성</option>
                <option value="Female">여성</option>
              </select>
            </div>
            <div className="mypage-item">
              <label>전화번호</label>
              <input type="text" value="010-6448-9160" readOnly />
            </div>
          </div>
          <div className="mypage-row">
            <div className="mypage-item">
              <label>생년월일</label>
              <input type="text" name="birth" value={formData.birth} onChange={handleChange} readOnly={!isEdit} />
            </div>
            <div className="mypage-item">
              <label>주소</label>
              <select name="district" value={formData.district} onChange={handleChange} disabled={!isEdit}>
                {district.map((item, index) => (
                  <option key={index} value={item}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {showModal && <Modal message={message} onClose={() => setShowModal(false)} />}
      </div>
    )
}

export default MyPage;