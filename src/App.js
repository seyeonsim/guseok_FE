import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login"; // 로그인 페이지
import Signup from "./pages/Signup"; // 회원가입 페이지
import CulturalEvent from "./pages/CulturalEvent";
import ParkList from "./pages/ParkList";
import ParkDetail from "./pages/ParkDetail";
import SmokingArea from './pages/SmokingArea';
import NoSmokingArea from './pages/NoSmokingArea';
import TrashShedule from './pages/TrashShedule';
import MyPage from './pages/MyPage';
import MainPage from "./pages/MainPage";
import apiClient from "./components/apiClient";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState( // 로그인 상태 관리
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  const [region, setRegion] = useState(null);

  const SearchRegion = () => {
      const fetchData = async () => {
        try {
          const response = await apiClient.get('/mypage/');
          setRegion(response.data.district);
        } catch(error) {
          console.error("User is not logged in");
        }
      };
      fetchData();
    };

  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true); // 로그인 상태를 true로 변경
    setRegion(SearchRegion);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그인 상태를 false로 변경
    console.log({region});
    localStorage.removeItem("token"); //토큰 삭제
    window.location.href = '/login';
  };

  return (
    <>
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/cultural" element={<CulturalEvent />}/>
        <Route path="/park" element={<ParkList />}/>
        <Route path="/park/:id" element={<ParkDetail />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/smoking" element={<SmokingArea region={region} />} />
        <Route path="/nosmoking" element={<NoSmokingArea region={region} />} />
        <Route path="/trash" element={<TrashShedule region={region} />} />
        <Route path="/mypage" element={<MyPage onRegionChange={handleRegionChange} />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
