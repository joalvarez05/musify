import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import musify from "../img/musify.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Audio } from "react-loader-spinner";
import { getSong } from "../services/api";
import { validateSong } from "../utils/validateSong";

function Buscador() {
  const [cancion, setCancion] = useState("");
  const [canciones, setCanciones] = useState([]);
  const [savedSongs, setSavedSongs] = useState(
    JSON.parse(localStorage.getItem("savedSongs")) || []
  );
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!validateSong(cancion)) return;
    getSong(cancion, setCanciones, setLoading);
    setCancion("");
  };

  const handleClick = (song) => {
    setSavedSongs((prevSongs) => {
      const alreadySaved = prevSongs.find((s) => s.data.id === song.data.id);

      if (alreadySaved) {
        Swal.fire("This song is already saved!");
        return prevSongs;
      }

      const updatedSongs = [...prevSongs, song];
      localStorage.setItem("savedSongs", JSON.stringify(updatedSongs));

      Swal.fire({
        title: "Do you want to save this song?",
        showDenyButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!");
        }
      });

      return updatedSongs;
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center flex-column gap-2">
        <LazyLoadImage
          src={musify}
          alt="musify"
          className="img-fluid brand"
          id="main"
        />
        <h1 className="text-spotify">Spotify API</h1>
        <p className="text-center fw-medium lead">
          1) Search a song. <br />
          2) Save it to your library. <br />
          3) Play it whenever you want. <br />
          <span className="text-spotify">Powered by the Spotify API.</span>
        </p>
        <p className="fw-medium h5">Please search for a song to play</p>
      </div>
      <div className="mt-3">
        <form
          onSubmit={handleSearch}
          className="d-flex flex-column align-items-center"
        >
          <input
            className="form-control w-50"
            type="text"
            name="buscador"
            maxLength={50}
            minLength={3}
            value={cancion}
            onChange={(e) => setCancion(e.target.value)}
          />
          <button type="submit" className="btn btn-outline-secondary m-3">
            Search
          </button>
        </form>
        <div className="container">
          <div className="row gap-2 d-flex align-items justify-content-center">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Audio
                  height="75"
                  width="75"
                  color="#1dd75f"
                  ariaLabel="loading"
                />
              </div>
            ) : (
              canciones?.map((cancion) => (
                <div
                  key={cancion.data.id}
                  className="col text-center song-card"
                >
                  <ul className="list-group list-group-flush d-flex justify-content-center">
                    <LazyLoadImage
                      src={cancion.data.albumOfTrack.coverArt.sources[0]?.url}
                      alt={cancion.data.artists.items[0]?.profile.name}
                      effect="blur"
                      className="img-pequena"
                    />
                    <h2 className="song-title">
                      {cancion.data.artists.items[0]?.profile.name}
                    </h2>
                    <li className="fs-4 p-0 list-group-item">
                      {cancion.data.name.length > 45
                        ? `${cancion.data.name.slice(0, 44)}...`
                        : cancion.data.name}
                    </li>
                  </ul>
                  <div className="d-flex justify-content-center align-items-center gap-3">
                    {cancion.data.uri.startsWith("spotify:") ? (
                      <a
                        href={cancion.data.uri}
                        className="btn btn-outline-success mt-3"
                      >
                        Play song
                      </a>
                    ) : (
                      <p>Invalid URI</p>
                    )}
                    <button
                      onClick={() => handleClick(cancion)}
                      className="btn btn-outline-primary mt-3"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {canciones.length > 0 && (
            <div className="fixed-arrow">
              <a href="#">
                <FontAwesomeIcon icon={faArrowUp} color="black" size="1x" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Buscador;
