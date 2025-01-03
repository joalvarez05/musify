import { useState, useEffect } from "react";

function MyMusic() {
  const [savedSongs, setSavedSongs] = useState(
    JSON.parse(localStorage.getItem("savedSongs"))
  );
  useEffect(() => {
    const songs = localStorage.getItem("savedSongs");
    if (songs) {
      setSavedSongs(JSON.parse(songs));
    }
  }, []);

  const removeSong = (songId) => {
    const updatedSongs = savedSongs.filter((song) => song.data.id !== songId);
    setSavedSongs(updatedSongs);
    localStorage.setItem("savedSongs", JSON.stringify(updatedSongs));
  };

  return (
    <>
      <h2 className="text-center my-5">My Songs</h2>
      <div className="container">
        <div className="row gap-2 d-flex justify-content-center">
          {savedSongs === null || savedSongs.length === 0 ? (
            <div
              className="alert alert-warning text-center fw-medium text-dark"
              role="alert"
            >
              <span>No songs saved </span>
            </div>
          ) : (
            savedSongs.map((song) => (
              <div key={song.data.id} className="col text-center song-card">
                <ul className="list-group list-group-flush d-flex justify-content-center">
                  <img
                    src={song.data.albumOfTrack.coverArt.sources[0].url}
                    alt={song.data.artists.items[0].profile.name}
                    className="img-pequena"
                  />
                  <h2 className="song-title">
                    {song.data.artists.items[0].profile.name}
                  </h2>
                  <li className="fs-4 p-0 list-group-item">
                    {song.data.name.length > 45
                      ? song.data.name.slice(0, 44) + "..."
                      : song.data.name}
                  </li>
                </ul>
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <a
                    href={song.data.uri}
                    className="btn btn-outline-success mt-3"
                  >
                    Play Song
                  </a>
                  <button
                    onClick={() => removeSong(song.data.id)}
                    role="button"
                    className="btn btn-danger mt-3"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default MyMusic;
