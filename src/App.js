import "./App.css";
import "./css/portofolio.css";
import "./css/animate.css";
import "./js/portofolio.js";
import WOW from "wowjs";
import Navigation from "./components/Header";
import Content from "./components/Movie";
import ContenDetail from "./components/MovieDetail";
import Loader from "./components/Loader";
import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Alert } from "antd";
import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.0";
import SearchPage from "./pages/SearchPage";
import FavoritePage from "./pages/FavoritePage";

// Global Key
const APIKEY = "9aae4b93";

function App() {
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
      <Routes>
        <Route path="/" element={<SearchPage />}></Route>
        <Route path="/FavoritePage" element={<FavoritePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
