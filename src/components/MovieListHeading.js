import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MovieListHeading = (props) => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/SearchMovie");
  };
  return (
    <div className="col">
      <nav className="navbar ">
        <div className="container-fluid">
          <a className="navbar-brand wow slideInLeft" href="/SearchMovie">
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
            Home
          </Link>
          <Link
            to="/SearchMovie"
            className="btn btn-outline-light me-2 wow fadeInUp"
          >
            Search Movie
          </Link>
          <Link
            to="/FavoritePage"
            className="btn btn-outline-light me-2 wow fadeInUp"
          >
            Favorite
          </Link>
          {localStorage.getItem("token") && (
            <button
              data-wow-duration="2s"
              className="btn btn-sm btn-outline-danger wow fadeInUp me-2"
              type="button"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MovieListHeading;
