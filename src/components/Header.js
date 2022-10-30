// import Search from "antd/lib/input/Search";
import Search from "./Search";
import { NavLink, Link } from "react-router-dom";

const Navigation = ({ searchHandler, filterType, pageType }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container-fluid">
          <a class="navbar-brand wow slideInLeft" href="/">
            <img
              src="https://img.freepik.com/free-icon/3d-glasses_318-853705.jpg?size=338&ext=jpg"
              alt="Movie"
              width="30"
              height="24"
            />
            <span> OCTO MOVIE</span>
          </a>

          {/* <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={(value) => searchHandler(value)}
          /> */}
          {/* <div className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Movie Title"
              aria-label="Search"
              id="cari"
              // onSearch={(value) => searchHandler(value)}
            />
            <button
              onClick={() =>
                searchHandler(
                  document.getElementById("cari").value,
                  (document.getElementById("cari").value = "")
                )
              }
              data-wow-duration="2s"
              className="btn btn-outline-light wow slideInLeft"
              type="submit"
            >
              Search
            </button>
          </div> */}
          <Search search={searchHandler} />
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
          <button
            data-wow-duration="2s"
            id="movie"
            value={"movie"}
            onClick={() => filterType(document.getElementById("movie").value)}
            className="btn btn-sm btn-outline-secondary me-2 wow fadeInUp"
            type="submit"
          >
            Movie
          </button>
          <button
            data-wow-duration="2s"
            className="btn btn-sm btn-outline-secondary me-2 wow fadeInUp"
            type="button"
            id="series"
            value={"series"}
            onClick={() => filterType(document.getElementById("series").value)}
          >
            Series
          </button>
          <button
            data-wow-duration="2s"
            className="btn btn-sm btn-outline-secondary wow fadeInUp me-2"
            type="button"
            id="episode"
            value={"episode"}
            onClick={() => filterType(document.getElementById("episode").value)}
          >
            Episode
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
