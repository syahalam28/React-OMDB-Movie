import React from "react";
import { Link } from "react-router-dom";

const MovieListHeading = (props) => {
  return (
    <div className="col">
      <nav className="navbar ">
        <div className="container-fluid">
          <a class="navbar-brand wow slideInLeft" href="/">
            <img
              style={{ width: "30px", height: "24" }}
              src="https://img.freepik.com/free-icon/3d-glasses_318-853705.jpg?size=338&ext=jpg"
              alt="Movie"
            />
            <span className="text-white"> OCTO MOVIE</span>
          </a>
        </div>
      </nav>
      <nav className="navbar ">
        <div className="container-fluid justify-content-start">
          {/* <input type="text" id="type" /> */}
          <Link to="/" className="btn btn-outline-light me-2 wow fadeInUp">
            Search Movie
          </Link>
          <Link
            to="/FavoritePage"
            className="btn btn-outline-light me-2 wow fadeInUp"
          >
            Favorite
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MovieListHeading;
