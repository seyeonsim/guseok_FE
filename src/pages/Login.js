import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import api from "../api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || email.trim() === "") {
        alert("이메일을 입력해주세요.");
        return;
    }
    if (!password || password.trim() === "") {
        alert("비밀번호를 입력해주세요.");
        return;
    }

    try {
      const response = await api.post("/api/login", { email, password });

        if (response.status === 200) {
            const data = response.data;
            if (data.token) {
                alert("로그인 되었습니다.");
                onLogin(data.token); // 토큰 처리
                navigate("/main"); // 로그인 성공 시 이동
            } else {
                alert("서버에서 적절한 응답이 없습니다.");
            }
        } else {
            alert("로그인에 실패했습니다.");
        }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
            alert("잘못된 이메일입니다.");
        } else if (error.response.status === 401) {
            alert("잘못된 비밀번호입니다.");
        } else {
            alert(`서버 오류: ${error.response.status} - ${error.response.data}`);
        }
    } else {
        alert("네트워크 문제로 인해 요청을 처리할 수 없습니다.");
    }
}
};

return (
  <div className="login-container">
    <h1 className="login-title">로그인</h1>
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">아이디</label>
        <input
          type="email"
          id="email"
          placeholder="아이디"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="login-button">
        로그인
      </button>
    </form>
  </div>
);
}


export default Login;
