import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CulturalEvent from "./pages/CulturalEvent";
import React from "react";
import ParkList from "./pages/ParkList";
import ParkDetail from "./pages/ParkDetail";
import SmokingArea from './pages/SmokingArea';
import TrashShedule from './pages/TrashShedule';
import MyPage from './pages/MyPage';
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/cultural" element={<CulturalEvent />}/>
        <Route path="/park" element={<ParkList />}/>
        <Route path="/park/:id" element={<ParkDetail />} />
        <Route path="/smoking" element={<SmokingArea />} />
        <Route path="/trash" element={<TrashShedule />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
