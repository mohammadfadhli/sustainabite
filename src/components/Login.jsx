/**
 * Login.jsx
 * handles Firebase email-password authentication
 */


import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import login_bg from "../assets/login.jpg";
import "../styles/Login_Signup.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/"); //if user is not logged in, bring back to index page

    } catch (error) {
      if (error.code == "auth/too-many-requests") {
        setErrorMsg("Too many failed login attempts. Please try again later.");
        
      } else if (
        error.code == "auth/wrong-password" ||
        error.code == "auth/user-not-found"
      ) {
        setErrorMsg("Incorrect Email or Password");
      } else {
        setErrorMsg(error.code);
      }
      console.log(error.code);
    }
  }

  useEffect(() => {
    if (errorMsg) {
      const toRef = setTimeout(() => {
        setErrorMsg("");
        clearTimeout(toRef);
      }, 2000);
    }
  }, [errorMsg]);

  function ShowAlert() {
    if (errorMsg) {
      return (
        <>
          <div class="alert alert-danger mt-3" role="alert">
            {errorMsg}
          </div>
        </>
      );
    }
  }

  return (
    <>
      <img
        className="login-signup-img"
        style={{
          backgroundImage: "url(" + login_bg + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className="container"
        style={{
          zIndex: 1,
          position: "absolute",
          top: "20%",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
        }}
      >
        <div className="row justify-content-center d-flex ">
          <div className="col-10 col-md-8 bg-light p-5 border rounded-3">
            <form onSubmit={login}>
              <h4 class="text-center mb-3">Login</h4>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <p>
                  Don't have an account?{" "}
                  <Link to={"/signup"}>Sign Up Here</Link>
                </p>
              </div>
              <button type="submit" class="btn btn-primary">
                Login
              </button>
            </form>
            <ShowAlert></ShowAlert>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
