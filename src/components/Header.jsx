import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import '../styles/Header.css'; // 스타일링 파일
import "../styles/new/Header.css";

function Header({ isLoggedIn, onLogout, region }) {
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
        <>
        <header>
            <div className="header">
                <div className="logo">
                    {/* <img src={logoImage} alt="Aurora Logo" className="logo-image" /> */}
                    <Link to={"/"}>🔍 구석구석</Link>
                </div>
                <nav className="nav">
                    <ul className="menu">
                        <li><Link to="/cultural">문화행사</Link></li>
                        <li><Link to="/park">공원정보</Link></li>
                        <li className="dropdown">
                            흡연/금연구역
                            <ul className="dropdown-menu">
                                <li><Link to="/smoking">흡연구역</Link></li>
                                <li><Link to="/nosmoking">금연구역</Link></li>
                            </ul>
                        </li>
                        {/* 기존 구조 */}
                        {/* <li className="dropdown">
                            <span>흡연/금연 구역</span>
                            <ul className="dropdown-menu">
                                <li><Link to="/smoking">흡연 구역</Link></li>
                                <li><Link to="/nosmoking">금연 구역</Link></li>
                            </ul>
                        </li> */}
                        <li><Link to="/trash">분리배출</Link></li>
                    </ul>
                </nav>
                <div className="auth-buttons">
                    {isLoggedIn && region ? (
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
                                회원가입
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
        </>
    );
}

export default Header;
