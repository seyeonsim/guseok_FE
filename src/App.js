import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CulturalEvent from "./pages/CulturalEvent";

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/cultural" element={<CulturalEvent />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
