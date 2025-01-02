import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
