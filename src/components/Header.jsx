import React from "react";
import { Link } from "react-router-dom";
import '../styles/Header.css'; // 스타일링 파일
import logoImage from '../images/channels4_profile-Photoroom.png'; // 이미지 경로 수정

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src={logoImage} alt="Aurora Logo" className="logo-image" />
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">메인 화면</Link></li>
                    <li><Link to="/cultural">문화 행사</Link></li>
                    <li><Link to="/park">공원 정보</Link></li>
                    <li><Link to="/smoking">흡연 시설</Link></li>
                    <li><Link to="/trash">분리 수거</Link></li>
                    <li><Link to="/mypage">마이 페이지</Link></li>
                </ul>
            </nav>
            <div className="auth-buttons">
                <button className="login-btn">로그인</button>
                <button className="signup-btn">회원 가입</button>
            </div>
        </header>
    );
}

export default Header;
