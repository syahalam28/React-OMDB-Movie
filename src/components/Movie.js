const APIKEY = "ad645020";
const Content = ({
  Title,
  imdbID,
  Poster,
  Type,
  ShowDetail,
  DetailRequest,
  Year,
}) => {
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
      })
      .catch(({ message }) => {
        DetailRequest(false);
      });
  };
  // document.getElementById("cari").value("");
  return (
    <div className="portofolio">
      <div
        className="card mt-4 image-container "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ width: "18rem", height: "550px", cursor: "pointer" }}
        onClick={() => clickHandler()}
      >
        <img
          style={{ width: "100%" }}
          src={
            Poster === "N/A"
              ? "https://img.freepik.com/free-vector/404-error-with-person-looking-concept-illustration_114360-7912.jpg?size=626&ext=jpg&ga=GA1.2.1833429700.1666169274&semt=sph"
              : Poster
          }
          className="card-img-top img-thumbnail"
          alt={Title}
        />
        <div className="card-body">
          <span className="badge rounded-pill text-bg-dark">{Type}</span>

          <h5 className="card-title">{Title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{Year}</h6>
        </div>
      </div>
    </div>
  );
};
export default Content;
