import React, { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import MovieListHeading from "../components/MovieListHeading";
import SearchBox from "../components/SearchBox";
import AddFavourites from "../components/AddFavourites";
import RemoveFavourites from "../components/RemoveFavourites";
import ReactPaginate from "react-paginate";
import ScrollContainer from "react-indiana-drag-scroll";
import ContentDetail from "../components/MovieDetail";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import "../portofolio.css";
import "../App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("war");
  const [total, setTotal] = useState();
  const [page, setPage] = useState();
  const [detail, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [force, setForce] = useState("");

  const handlePageClick = (e) => {
    console.log(e.selected + 1);
    const newOffset = e.selected + 1;
    setPage(newOffset);
  };

  const getMovieRequest = async (searchValue, page) => {
    let url = "";

    if (searchValue === "") {
      url = `https://www.omdbapi.com/?s=war&apikey=ad645020&page=${page}`;
    } else {
      url = `https://www.omdbapi.com/?s=${searchValue}&apikey=ad645020&page=${page}`;
    }

    // const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=9aae4b93&page=${page}`;
    setLoading(true);
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Response == "False") {
      // setTotal(0);
      setTotal(Math.ceil(responseJson.totalResults / 10));
      setPage(1);
    } else {
      setMovies(responseJson.Search);
      setForce(0);
      setTotal(Math.ceil(responseJson.totalResults / 10));
    }
    setLoading(false);
  };

  useEffect(() => {
    getMovieRequest(searchValue, page);
  }, [searchValue, page]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movies) => {
    const newFavouriteList = [...favourites, movies];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };
  // const popoverTriggerList = document.querySelectorAll(
  //   '[data-bs-toggle="popover"]'
  // );
  // const popoverList = [...popoverTriggerList].map(
  //   (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  // );

  return (
    <div>
      <div className="container-fluid movie-app">
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading="Movies" />
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
        {loading && <Loader />}
        {error !== null && (
          <div style={{ margin: "20px 0", color: "white" }}>
            <h1>{error}</h1>
          </div>
        )}
        <button type="button" className="btn btn-lg btn-outline-light">
          Movies
        </button>
        <ScrollContainer className="row">
          {movies.map((result, index) => (
            <MovieList
              ShowDetail={setShowDetail}
              DetailRequest={setDetailRequest}
              movies={movies}
              handleFavouritesClick={addFavouriteMovie}
              favouriteComponent={AddFavourites}
              key={index}
              {...result}
            />
          ))}
        </ScrollContainer>
        <button type="button" className="btn btn-lg btn-outline-light">
          Favourites
        </button>
        <ScrollContainer className="row">
          {favourites.map((result, index) => (
            <MovieList
              ShowDetail={setShowDetail}
              DetailRequest={setDetailRequest}
              movies={favourites}
              handleFavouritesClick={removeFavouriteMovie}
              favouriteComponent={RemoveFavourites}
              key={index}
              {...result}
            />
          ))}
          \
        </ScrollContainer>
      </div>
      <div className="pagination">
        <ReactPaginate
          previousLabel={"Back"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={total}
          marginPagesDisplayed={1}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          forcePage={force}
        />
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-white"
                id="exampleModalLabel"
              >
                {detail.Title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {detailRequest === false ? (
                <ContentDetail {...detail} />
              ) : (
                <Loader />
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Of Modal --> */}
      <Footer />
    </div>
  );
};

export default App;
