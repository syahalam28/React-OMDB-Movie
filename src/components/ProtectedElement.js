import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedElement({ children, clickme }) {
  let location = useLocation();

  if (localStorage.getItem("token")) {
    return (
      <div>
        <button
          onClick={() => clickme()}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
          className="btn btn-outline-dark"
        >
          Official Trailer
        </button>
      </div>
    );
  }

  return children;
}
