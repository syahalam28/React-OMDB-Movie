const Search = ({ search }) => {
  return (
    <div>
      <div className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search Movie Title"
          aria-label="Search"
          id="cari"
          autoComplete="off"
          // onSearch={(value) => searchHandler(value)}
        />
        <button
          onClick={() =>
            search(
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
      </div>
    </div>
  );
};

export default Search;
