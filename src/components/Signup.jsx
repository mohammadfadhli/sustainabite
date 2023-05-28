import { useContext, useEffect, useState } from "react";
import { db } from "../firebase.jsx";
import { collection, setDoc, doc } from "firebase/firestore";
import { AuthContext } from "../auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { axios } from "axios";

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
                
                axios.get('https://api.telegram.org/bot6275114275:AAF_kcJECWGk0NXGKDvS-XM8OK7coUyrTag/sendMessage?chat_id=-976439463&text=' + displayName + " just joined! :)").then(function(response) {
                    console.log('alerted group!');
                })
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
                    <div class="alert alert-danger mt-3" role="alert">
                        {errorMsg}
                    </div>
                </>
            );
        }
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
                        Display Name
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="displayname"
                        onChange={(e) => {
                            setDisplayName(e.target.value);
                        }}
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
                    />
                </div>
                <div>
                    <p>
                        Already have an account?{" "}
                        <Link to={"/login"}>Log In Here</Link>
                    </p>
                </div>
                <button type="submit" class="btn btn-primary">
                    Sign Up
                </button>
            </form>
            <ShowAlert></ShowAlert>
        </div>
    );
}

export default SignUp;
