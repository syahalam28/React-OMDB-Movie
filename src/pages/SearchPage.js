import "../portofolio.css";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import WOW from "wowjs";
import Navigation from "../components/Header";
import Content from "../components/Movie";
import Loader from "../components/Loader";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import ContentDetail from "../components/MovieDetail";
import Footer from "../components/Footer";
// import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";

// Global Key
const APIKEY = "9aae4b93";

function SearchPage() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [q, setQuery] = useState("");
  const [type, setType] = useState("");
  const [force, setForce] = useState("");
  const [page, setPage] = useState("");
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

    if (q !== "") {
      fetch(
        `http://www.omdbapi.com/?s=${q}&apikey=${APIKEY}&type=${type}&page=${page}`
      )
        .then((resp) => resp)
        .then((resp) => resp.json())
        .then((response) => {
          if (response.Response == "False") {
            setError(response.Error);
            setTotal(0);
            setForce(0);
            setPage(1);
          } else {
            setTotal(Math.ceil(response.totalResults / 10));
            setForce(0);
            setData(response.Search);
          }
          setLoading(false);
        })
        .catch(({ message }) => {
          setError(message);
          setLoading(false);
        });
      dispatch({
        type: "SET_MOVIES",
        payload: data,
      });
    } else if (q === "") {
      fetch(
        `http://www.omdbapi.com/?s=war&apikey=${APIKEY}&type=${type}&page=${page}`
      )
        .then((resp) => resp)
        .then((resp) => resp.json())
        .then((response) => {
          if (response.Response == "False") {
            setError(response.Error);
            setTotal(0);
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
      dispatch({
        type: "SET_MOVIES",
        payload: data,
      });
    }
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
                <div key={index} className="col-sm-4 ">
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
            className="modal fade"
            id="exampleModal"
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
      </div>
      <Footer />
    </div>
  );
}

export default SearchPage;
