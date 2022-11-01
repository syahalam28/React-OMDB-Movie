import "./App.css";
import "./css/portofolio.css";
import "./css/animate.css";
import "./js/portofolio.js";
import WOW from "wowjs";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import FavoritePage from "./pages/FavoritePage";
import IntroPage from "./pages/IntroPage";
import LoginPage from "./pages/loginPage";
import ProtectedRoute from "./components/ProtectedRoute ";

function App() {
  useEffect(() => {
    new WOW.WOW().init();
  });

  return (
    <div>
      <Routes>
        <Route path="/SearchMovie" element={<SearchPage />}></Route>
        <Route path="/" element={<IntroPage />}></Route>
        <Route
          path="/FavoritePage"
          element={
            <ProtectedRoute>
              <FavoritePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
