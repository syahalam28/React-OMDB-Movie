import "../App.css";
import "../css/portofolio.css";
import "../css/animate.css";
import "../js/portofolio.js";
import WOW from "wowjs";
import Navigation from "../components/Header";
import Content from "../components/Movie";
import ContenDetail from "../components/MovieDetail";
import Loader from "../components/Loader";
import { useState } from "react";
import { useEffect } from "react";
import { Alert } from "antd";
import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.0";

// Global Key
const APIKEY = "9aae4b93";

function SearchPage() {
  const [q, setQuery] = useState("war");
  const [type, setType] = useState("");
  const [page, setPage] = useState();
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [detail, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false);
  const handlePageClick = (e) => {
    console.log(e.selected + 1);
    const newOffset = e.selected + 1;
    setPage(newOffset);
  };

  useEffect(() => {
    new WOW.WOW().init();
    setLoading(true);
    setError(null);
    setData(null);

    fetch(
      `http://www.omdbapi.com/?s=${q}&apikey=${APIKEY}&type=${type}&page=${page}`
    )
      .then((resp) => resp)
      .then((resp) => resp.json())
      .then((response) => {
        if (response.Response == "False") {
          setError(response.Error);
        } else {
          // setPage(page);
          setTotal(Math.ceil(response.totalResults / 10));
          setData(response.Search);
        }
        setLoading(false);
      })
      .catch(({ message }) => {
        setError(message);
        setLoading(false);
      });
  }, [q, type, page]);

  return (
    <div>
      <Navigation
        searchHandler={setQuery}
        filterType={setType}
        pageType={setPage}
      />

      {/* Content */}
      <div className="container">
        <div className="row">
          {loading && <Loader />}
          {error !== null && (
            <div style={{ margin: "20px 0", color: "white" }}>
              <h1>{error}</h1>
              {/* <Alert message={error} type="error" /> */}
            </div>
          )}

          {
            // Menampilkan Content
            // Validation

            data !== null &&
              data.length > 0 &&
              data.map((result, index) => (
                <div className="col-sm-3">
                  <Content
                    key={index}
                    {...result}
                    ShowDetail={setShowDetail}
                    DetailRequest={setDetailRequest}
                  />
                </div>
              ))
          }
          {/* End Of Content */}
          {/* <!-- Modal --> */}
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    {detail.Title}
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  {detailRequest === false ? (
                    <ContenDetail {...detail} />
                  ) : (
                    <Loader />
                  )}
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
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
      </div>
    </div>
  );
}

export default SearchPage;
