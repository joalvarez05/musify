import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import musify from "../img/musify.webp";

function Navbar() {
  return (
    <>
      <nav className="navbar bg-body-tertiary my-4">
        <div className="container-fluid">
          <a href="#" className="navbar-brand fw-bold text-spotify">
            <LazyLoadImage
              src={musify}
              alt="logo brand"
              width="24"
              height="24"
              className="d-inline-block align-text-top ms-1 me-2"
            />
            Musify
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
