const ContentDetail = ({
  Title,
  Poster,
  imdbRating,
  Rated,
  Genre,
  Plot,
  Runtime,
  Director,
  Actors,
}) => {
  return (
    <div>
      <div className="card mb-3 bg-dark " style={{ width: "100%" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              style={{ height: "100%" }}
              src={Poster}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body text-white">
              <small className="text-muted">{Director}</small>
              <h5 className="card-title">{Title}</h5>
              <h6 className="card-title">{Rated}</h6>
              <small className="text-muted">{Runtime}</small>
              <br />
              <small className="text-muted">{Actors}</small>

              <p className="card-text">{Plot}</p>
              <small className="text-muted">{Genre}</small>
              <br />
              <small className="text-muted">Rating {imdbRating}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
