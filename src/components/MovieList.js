import React from "react";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <>
      {props.movies.map((movie, index) => (
        <div
          class="image-container d-flex justify-content-start m-3"
          style={{ width: "20rem" }}
        >
          <img className="wow fadeInUp" src={movie.Poster} alt="movie"></img>
          <div class="card-body">
            <div
              href="#"
              class="overlay"
              onClick={() => props.handleFavouritesClick(movie)}
            >
              <FavouriteComponent />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
