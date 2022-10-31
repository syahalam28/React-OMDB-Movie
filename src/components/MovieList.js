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
          <img
            className="wow fadeInUp"
            src={
              movie.Poster === "N/A"
                ? "https://img.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_114360-7912.jpg?size=626&ext=jpg&ga=GA1.2.1833429700.1666169274&semt=sph"
                : movie.Poster
            }
            alt={movie.Tile}
          ></img>
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
