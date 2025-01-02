import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Header.css'; // 스타일링 파일
import logoImage from '../images/channels4_profile-Photoroom.png'; // 이미지 경로 수정

function Header({ isLoggedIn, onLogout }) {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    const handleMyPage = () => {
        navigate("/mypage");
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logoImage} alt="Aurora Logo" className="logo-image" />
            </div>
            <nav className="nav">
                <ul className="menu">
                    <li><Link to="/main">메인 화면</Link></li>
                    <li><Link to="/cultural">문화 시설</Link></li>
                    <li><Link to="/park">공원 정보</Link></li>
                    <li className="dropdown">
                        <span>흡연/금연 구역</span>
                        <ul className="dropdown-menu">
                            <li><Link to="/smoking">흡연 구역</Link></li>
                            <li><Link to="/nosmoking">금연 구역</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/trash">분리 수거</Link></li>
                    <li><Link to="/mypage">마이 페이지</Link></li>
                </ul>
            </nav>
            <div className="auth-buttons">
                {isLoggedIn ? (
                    <>
                    <button className="mypage-btn" onClick={handleMyPage}>
                        마이페이지
                    </button>
                    <button className="logout-btn" onClick={onLogout}>
                        로그아웃
                    </button>
                </>
                ) : (
                    <>
                        <button className="login-btn" onClick={handleLogin}>
                            로그인
                        </button>
                        <button className="signup-btn" onClick={handleSignup}>
                            회원 가입
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
