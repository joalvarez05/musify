import { useState } from "react";
import "./App.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import musify from "./img/musify.webp";
import Navbar from "./components/Navbar";

function App() {
  const [cancion, setCancion] = useState("");
  const [canciones, setCanciones] = useState([]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (cancion.trim() === "") {
      alert("Debes ingresar algo");
      return;
    }
    setCancion("");
    getSong(cancion);
  };
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
    },
  };

  async function getSong(cancion) {
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${cancion}&type=multi&offset=0&limit=20&numberOfTopResults=5`;
      let data = await fetch(url, options);
      let res = await data.json();
      setCanciones(res.tracks.items);
    } catch (error) {
      console.log(`ups... error ${error}`);
    }
  }
  return (
    <>
      <div className="container-fluid">
        <Navbar />
        <div className="d-flex justify-content-center align-items-center flex-column gap-2">
          <LazyLoadImage
            src={musify}
            alt="musify"
            className="img-fluid brand"
          />
          <h1 className="text-spotify">Spotify API</h1>
          <p className="fw-medium">Please search for a song to play</p>
        </div>
        <div>
          <form
            onSubmit={handleSearch}
            className="d-flex flex-column align-items-center"
          >
            <input
              className="form-control w-50"
              type="text"
              name="buscador"
              value={cancion}
              onChange={(e) => setCancion(e.target.value)}
            />
            <button type="submit" className="btn btn-outline-secondary m-3">
              Search
            </button>
          </form>
          <div className="container">
            <div className="row gap-2 d-flex align-items justify-content-center">
              {canciones.map((cancion) => (
                <>
                  <div
                    key={cancion.data.id}
                    className="col text-center song-card"
                  >
                    <ul className="list-group list-group-flush d-flex justify-content-center">
                      <LazyLoadImage
                        src={cancion.data.albumOfTrack.coverArt.sources[0].url}
                        alt={cancion.data.artists.items[0].profile.name}
                        effect="blur"
                        className="img-pequena"
                      />
                      <h2 className="song-title">
                        {cancion.data.artists.items[0].profile.name}
                      </h2>
                      <li className="fs-4 p-0 list-group-item">
                        {cancion.data.name.length > 45
                          ? cancion.data.name.slice(0, 44) + "..."
                          : cancion.data.name}
                      </li>
                    </ul>
                    <a
                      href={cancion.data.uri}
                      className="btn btn-outline-success mt-3"
                    >
                      Play Song
                    </a>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
