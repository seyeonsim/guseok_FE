import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CulturalEvent from "./pages/CulturalEvent";
import React from "react";
import ParkList from "./pages/yh/ParkList";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/cultural" element={<CulturalEvent />}/>
        <Route path="/park" element={<ParkList />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
