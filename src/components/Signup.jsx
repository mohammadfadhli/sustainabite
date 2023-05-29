import { useContext, useEffect, useState } from "react";
import { db } from "../firebase.jsx";
import { collection, setDoc, doc } from "firebase/firestore";
import { AuthContext } from "../auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import signup_bg from "../assets/signup.jpg";
import "../styles/Login_Signup.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { createUser, updateUserName } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  async function signUp(e) {
    e.preventDefault();
    try {
      await createUser(email, password).then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          displayName: displayName,
          uid: user.uid,
          bio: "",
          allergy: "",
          address: "",
          // profilepicture: "https://firebasestorage.googleapis.com/v0/b/stellarknight2-eddf1.appspot.com/o/users%2Fdefaultdp.png?alt=media&token=979791e0-ff90-40b7-ab8c-38f2579a05cb"
        });

        // const axios = require("axios");
        axios
          .post(
            "https://api.telegram.org/bot" +
              import.meta.env.VITE_TELEGRAM_BOT_ID +
              "/sendMessage?chat_id=" +
              import.meta.env.VITE_TELEGRAM_CHAT_ID +
              "&text=" +
              displayName +
              " just joined! :)",
            {}
          )
          .then(function (response) {
            console.log("alerted group!" + response);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
      await updateUserName({ displayName: displayName });
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code == "auth/weak-password") {
        setErrorMsg(
          "Your password is too weak. Please pick a stronger password."
        );
      } else if (error.code == "auth/email-already-in-use") {
        setErrorMsg("This Email is already in use.");
      } else {
        setErrorMsg(error.code);
      }
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
          <div className="alert alert-danger mt-3" role="alert">
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
          backgroundImage: "url(" + signup_bg + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className="container"
        style={{ zIndex: 1, position: "absolute", top: "20%", margin: "auto"}}  
      >
        <div className="row justify-content-center d-flex">
          <div className="col-6 bg-light p-5">
            <form onSubmit={signUp}>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Display Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="displayname"
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <Link to={"/login"}>Log In Here</Link>
                </p>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </form>
            <ShowAlert></ShowAlert>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
