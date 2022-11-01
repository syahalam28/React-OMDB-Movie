import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [error, setErrorMessage] = useState({ value: "" });
  const [data, setData] = useState({ username: "", password: "" });

  console.log("auth", localStorage.getItem("isAuthenticated"));

  const handleInputChange = (e) => {
    setData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //if username or password field is empty, return error message
    if (data.username === "" || data.password === "") {
      setErrorMessage((prevState) => ({
        value: "Empty username or password field",
      }));
    } else if (
      data.username == "izaazsyahalam@gmail.com" &&
      data.password == "syahalam28"
    ) {
      //Signin Success
      localStorage.setItem("token", "login");
      navigate(from, { replace: true });
    } else {
      //If credentials entered is invalid
      setErrorMessage((prevState) => ({
        value: "Invalid username or password",
      }));
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block cover"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      {error.value && (
                        // MySwal.fire({
                        //   icon: "error",
                        //   title: "Oops...",
                        //   text: `${error.value}`,
                        //   footer: '<Link to="/"></Link>',
                        //   showConfirmButton: false,
                        // })
                        // Swal.fire(`${error.value}`, "", "success")
                        <p className="text-danger"> {error.value} </p>
                      )}
                      <form action="" method="post">
                        <div className="mb-3">
                          <label
                            for="exampleInputEmail1"
                            className="form-label"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            className="form-control input"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            required
                            name="username"
                            autofocus
                            onChange={(e) => handleInputChange(e)}
                          />
                          <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                          </div>
                        </div>
                        <div className="mb-3">
                          <label
                            for="exampleInputPassword1"
                            className="form-label"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="inputPassword5"
                            className="form-control"
                            aria-describedby="passwordHelpBlock"
                            required
                            name="password"
                            onChange={(e) => handleInputChange(e)}
                          />
                          <div id="passwordHelpBlock" className="form-text">
                            Your password must be 8-20 characters long, contain
                            letters and numbers, and must not contain spaces,
                            special characters, or emoji.
                          </div>
                        </div>
                        <div className="mb-3 form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                          />
                          <label
                            className="form-check-label"
                            for="exampleCheck1"
                          >
                            Remember Me
                          </label>
                        </div>

                        <button
                          style={{ width: "100%" }}
                          type="submit"
                          className="btn btn-primary input"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                        <hr />
                      </form>
                      <div className="text-center">
                        <a
                          style={{ textDecoration: "none" }}
                          className="small"
                          href="/"
                        >
                          Back To Home Page
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
