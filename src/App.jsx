import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
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
     <p className="text-center">&copy; 2024 <a href="https://uhmo.com.ar/" target="_blank">by UHMO</a> Todos los derechos reservados.</p>

    </>
  );
}

export default App;
