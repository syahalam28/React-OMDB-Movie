import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "../css/portofolio.css";
import MovieList from "../components/MovieList";
import MovieListHeading from "../components/MovieListHeading";
import SearchBox from "../components/SearchBox";
import AddFavourites from "../components/AddFavourites";
import RemoveFavourites from "../components/RemoveFavourites";
import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.0";
import ScrollContainer from "react-indiana-drag-scroll";
import ContentDetail from "../components/MovieDetail";
import Loader from "../components/Loader";

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

  const handlePageClick = (e) => {
    console.log(e.selected + 1);
    const newOffset = e.selected + 1;
    setPage(newOffset);
  };

  const getMovieRequest = async (searchValue, page) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=9aae4b93&page=${page}`;
    setLoading(true);
    const response = await fetch(url);
    const responseJson = await response.json();
    setTotal(Math.ceil(responseJson.totalResults / 10));

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    } else if (responseJson.Response == "False") {
      setError(responseJson.Error);
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
            {/* <Alert message={error} type="error" /> */}
          </div>
        )}
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
        />
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal1"
        tabindex="-1"
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
    </div>
  );
};

export default App;
