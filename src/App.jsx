import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Buscador from "./components/Buscador";
import MyMusic from "./components/MyMusic";

function App() {
  return (
    <>
      <div className="container-fluid">
        <Navbar />
        <Routes>
          <Route path="/" element={<Buscador />} />
          <Route path="MyMusic" element={<MyMusic />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
