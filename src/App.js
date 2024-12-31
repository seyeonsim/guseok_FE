import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import SmokingArea from './pages/SmokingArea';
import TrashShedule from './pages/TrashShedule';

function Header() {
  return (
    <header className="header">
        <Router>
          <nav>
            <Link to="/">메인 화면</Link>
            <Link to="/smoking">흡연 구역</Link>
            <Link to="/trash">쓰레기 배출일</Link>
          </nav>
          <Routes>
            <Route path="/smoking" element={<SmokingArea />} />
            <Route path="/" element={<Main />} />
            <Route path="/trash" element={<TrashShedule />} />
          </Routes>
        </Router>
      </header>
  )
}

function Main() {
  return (
    <div>
      구석구석 홈페이지 입니다
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
