import "../App.css";
import "../css/portofolio.css";
import "../css/animate.css";
import "../js/portofolio.js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
        value: "Empty username/password field",
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
      setErrorMessage((prevState) => ({ value: "Invalid username/password" }));
    }
  };

  return (
    <div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col-lg-6 d-none d-lg-block cover"></div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form action="" method="post">
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">
                            Email address
                          </label>
                          <input
                            type="email"
                            class="form-control input"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            required
                            name="username"
                            autofocus
                            onChange={(e) => handleInputChange(e)}
                          />
                          <div id="emailHelp" class="form-text">
                            We'll never share your email with anyone else.
                          </div>
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            id="inputPassword5"
                            class="form-control"
                            aria-describedby="passwordHelpBlock"
                            required
                            name="password"
                            onChange={(e) => handleInputChange(e)}
                          />
                          <div id="passwordHelpBlock" class="form-text">
                            Your password must be 8-20 characters long, contain
                            letters and numbers, and must not contain spaces,
                            special characters, or emoji.
                          </div>
                        </div>
                        <div class="mb-3 form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="exampleCheck1"
                          />
                          <label class="form-check-label" for="exampleCheck1">
                            Remember Me
                          </label>
                        </div>

                        <button
                          style={{ width: "100%" }}
                          type="submit"
                          class="btn btn-primary input"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                        <hr />
                      </form>
                      <div class="text-center">
                        <a
                          style={{ textDecoration: "none" }}
                          class="small"
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
