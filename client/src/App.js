import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Detail from "./components/Deteail";
import VideogameCreate from "./components/VideogameCreate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Home/:id" element={<Detail />} />
          <Route path="/Create" element={<VideogameCreate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
