import { useContext, useState } from "react";
import { db } from "../firebase.jsx";
import { collection, setDoc, doc } from "firebase/firestore";
import { AuthContext } from "../auth";
import { useNavigate } from "react-router";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    function signUp(e) {
        e.preventDefault()
        createUser(email, password)
        navigate("/")
    }

    return (
        <div class="container">
            <form onSubmit={signUp}>
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
                        class="form-control"
                        id="exampleInputPassword1"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <button type="submit" class="btn btn-primary">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUp;
