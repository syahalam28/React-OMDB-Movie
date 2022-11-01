import React from "react";

const MovieList = ({
  imdbID,
  ShowDetail,
  DetailRequest,
  Poster,
  Title,
  favouriteComponent,
  handleFavouritesClick,
}) => {
  const APIKEY = "ad645020";
  const FavouriteComponent = favouriteComponent;
  // Function Click
  const clickHandler = () => {
    // Display Modal
    DetailRequest(true);

    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${APIKEY}`)
      .then((resp) => resp)
      .then((resp) => resp.json())
      .then((response) => {
        DetailRequest(false);
        ShowDetail(response);
        console.log(ShowDetail);
      })
      .catch(({ message }) => {
        DetailRequest(false);
      });
  };

  return (
    <>
      <div
        className="image-container d-flex justify-content-start m-3"
        onClick={() => clickHandler()}
        style={{ width: "20rem" }}
      >
        <img
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
          className="wow fadeInUp"
          src={
            Poster === "N/A"
              ? "https://img.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_114360-7912.jpg?size=626&ext=jpg&ga=GA1.2.1833429700.1666169274&semt=sph"
              : Poster
          }
          alt={Title}
        ></img>

        <div className="card-body">
          <div
            href="#"
            className="overlay"
            onClick={() =>
              handleFavouritesClick({
                imdbID,
                Poster,
                Title,
                ShowDetail,
                DetailRequest,
              })
            }
          >
            <FavouriteComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieList;
