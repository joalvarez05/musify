import React from "react";
import { Link } from "react-router-dom";
function Breadcrumb() {
  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link
              to="/"
              className="fw-medium text-decoration-none text-yellow "
            >
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Library
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
