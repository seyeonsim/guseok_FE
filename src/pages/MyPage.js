//작성자: 윤정연;

import React, { useEffect, useState } from 'react';
import '../styles/MyPage.css';
import apiClient from '../api/apiClient';
import ParkCard from '../components/park/ParkCard';

function MyPage({ onRegionChange }) {
  const [isEdit, setIsEdit] = useState(false);
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
  const [likedParks, setLikedParks] = useState([]);
  const [likedSmokingAreas, setLikedSmokingAreas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/mypage/');
        setFormData(response.data);

        const districtResponse = await apiClient.get('/districts');
        setDistricts(districtResponse.data);

        const likedParksResponse = await apiClient.get('/mypage/likedParks');
        setLikedParks(likedParksResponse.data);

        const likedSmokingResponse = await apiClient.get('/mypage/likedSmoking');
        setLikedSmokingAreas(likedSmokingResponse.data);
      } catch (error) {
        console.error("Failed to fetch user data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "district") {
      onRegionChange(value);
    }
  };

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const onCancelClick = () => {
    setIsEdit(false);
  };

  const Modal = ({ message, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );

  const onUpdateClick = async () => {
    try {
      await apiClient.post('/mypage/update', formData);
      setMessage("회원 정보가 수정되었습니다");
      setIsEdit(false);

      const updatedData = await apiClient.get('/mypage/');
      setFormData(updatedData.data);

      setShowModal(true);
    } catch (error) {
      setMessage("회원 정보 수정이 실패하였습니다");
      setShowModal(true);
    }
  };

  return (
    <div>
      <div className="mypage-container">
        <div className="mypage-title">
          <h2>마이페이지</h2>
          {isEdit ? (
            <div>
              <button className="modify-btn" onClick={onUpdateClick}>수정</button>
              <button className="modify-btn" onClick={onCancelClick}>취소</button>
            </div>
          ) : (
            <button className="modify-btn" onClick={handleEditClick}>회원정보 수정</button>
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
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly={!isEdit}
              />
            </div>
          </div>
          <div className="mypage-row">
            <div className="mypage-item">
              <label>성별</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={!isEdit}
              >
                <option value="Male">남성</option>
                <option value="Female">여성</option>
              </select>
            </div>
            <div className="mypage-item">
              <label>전화번호</label>
              <input type="text" value="010-1111-2222" readOnly />
            </div>
          </div>
          <div className="mypage-row">
            <div className="mypage-item">
              <label>생년월일</label>
              <input
                type="date"
                name="birth"
                value={formData.birth}
                onChange={handleChange}
                readOnly={!isEdit}
                placeholder="YYYY-MM-DD"
                maxLength="10"
              />
            </div>
            <div className="mypage-item">
              <label>자치구</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                disabled={!isEdit}
              >
                {district.map((item) => (
                  <option key={item.id} value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="liked-parks-section">
        <h3>내가 좋아요한 공원</h3>
        {likedParks.length === 0 ? (
          <p>아직 좋아요한 공원이 없습니다.</p>
        ) : (
          <div className="liked-park-cards">
            {likedParks.map((park) => (
              <ParkCard key={park.id} park={park} />
            ))}
          </div>
        )}
      </div>

      <div className="liked-parks-section">
        <h3>내가 좋아요한 흡연 구역</h3>
        {likedSmokingAreas.length === 0 ? (
          <p>아직 좋아요한 흡연 구역이 없습니다.</p>
        ) : (
          <div className="liked-park-cards">
            {likedSmokingAreas.map((area) => (
              <div className="smoking-card" key={area.id}>
                <p>{area.address}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && <Modal message={message} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default MyPage;
