import { useState } from "react";
import "./App.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import musify from "./img/musify.webp";

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
      <LazyLoadImage src={musify} alt="musify" className="img-fluid brand" />
      <h1 className="text-success">Spotify API</h1>
      <div>
        <form
          onSubmit={handleSearch}
          className="d-flex flex-column align-items-center"
        >
          <input
            className="form-control"
            type="text"
            value={cancion}
            onChange={(e) => setCancion(e.target.value)}
          />
          <button type="submit" className="btn btn-outline-success m-3">
            Buscar
          </button>
        </form>
        <div className="container">
          <div className="row gap-2">
            {canciones.map((cancion) => (
              <>
                <div key={cancion.data.id} className="col">
                  <ul className="list-group list-group-flush d-flex justify-content-center">
                    <LazyLoadImage
                      src={cancion.data.albumOfTrack.coverArt.sources[0].url}
                      alt={cancion.data.artists.items[0].profile.name}
                      effect="blur"
                    />
                    <h2>{cancion.data.artists.items[0].profile.name}</h2>
                    <li className="fs-3 list-group-item">
                      {cancion.data.name}
                    </li>
                  </ul>
                  <a
                    href={cancion.data.uri}
                    className="btn btn-outline-success"
                  >
                    Play Song
                  </a>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
