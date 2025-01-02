import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MyPage.css';

function MyPage () {
    return (
    <div className="mypage-container">
      <div className="mypage-title">
        <h2>마이페이지</h2>
        <button className="modify-btn">회원정보 수정</button>
      </div>
      <div className="mypage-content">
        <div className="mypage-row">
          <div className="mypage-item">
            <label>아이디</label>
            <input type="text" value="Sessac" readOnly />
          </div>
          <div className="mypage-item">
            <label>닉네임</label>
            <input type="text" value="yuthewave" />
          </div>
        </div>
        <div className="mypage-row">
          <div className="mypage-item">
            <label>성별</label>
            <select defaultValue="여성">
              <option value="남성">남성</option>
              <option value="여성">여성</option>
            </select>
          </div>
          <div className="mypage-item">
            <label>전화번호</label>
            <input type="text" value="010-6448-9160" />
          </div>
        </div>
        <div className="mypage-row">
          <div className="mypage-item">
            <label>생년월일</label>
            <input type="text" value="1997.06.19" />
          </div>
          <div className="mypage-item">
            <label>주소</label>
            <select defaultValue="동대문구">
              <option value="양천구">양천구</option>
              <option value="강서구">강서구</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    )
}

export default MyPage;