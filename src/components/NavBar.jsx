import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../auth";
import { Link } from "react-router-dom";

function IsLoggedIn(props) {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-*">
                <div className="container-fluid">
                    <button
                        className="btn btn-primary-outline menu"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasExample"
                        aria-controls="offcanvasExample"
                    >
                        {/* <i className="fa fa-bars" style={{color: "black"}}></i> */}
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <Link reloadDocument to={"/"}>
                        <button
                            type="button"
                            id="logout_btn"
                            className="btn bai"
                            onClick={props.handleLogOut}
                        >
                            logout
                        </button>
                    </Link>
                </div>
            </nav>

            <div
                className="offcanvas offcanvas-start text-bg-light"
                tabIndex="-1"
                id="offcanvasExample"
                aria-labelledby="name_user_logged_in"
            >
                <div className="offcanvas-header">
                    <h6
                        className="offcanvas-title"
                        id="name_user_logged_in"
                        style={{ color: "black" }}
                    >
                        {props.displayname}
                    </h6>
                    <button
                        type="button"
                        className="btn-close btn-close-black"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <Link to={"/"}>
                        <div className="ps-2">Home</div>
                    </Link>
                    <Link to={"addpost"}>
                        <div className="ps-2">Add Post</div>
                    </Link>
                </div>
            </div>
            <Outlet></Outlet>
        </>
    );
}

function IsLoggedOut() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-*">
                <div className="container-fluid">
                    <button
                        className="btn btn-primary-outline menu"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasExample"
                        aria-controls="offcanvasExample"
                    >
                        {/* <i className="fa fa-bars" style={{color: "black"}}></i> */}
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <Link to={"login"}>
                        <button
                            type="button"
                            id="logout_btn"
                            className="btn bai"
                        >
                            login
                        </button>
                    </Link>
                </div>
            </nav>

            <div
                className="offcanvas offcanvas-start text-bg-light"
                tabIndex="-1"
                id="offcanvasExample"
                aria-labelledby="name_user_logged_in"
            >
                <div className="offcanvas-header">
                    <h6
                        className="offcanvas-title"
                        id="name_user_logged_in"
                        style={{ color: "black" }}
                    >
                        {/* name here */}
                    </h6>
                    <button
                        type="button"
                        className="btn-close btn-close-black"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <Link to={"/"}>
                        <div className="ps-2">Home</div>
                    </Link>
                </div>
            </div>
            <Outlet></Outlet>
        </>
    );
}

const NavBar = () => {
    const { currentUser, logOut, displayName, isLoading } =
        useContext(AuthContext);
    const [showName, setShowName] = useState("");

    useEffect(() => {
        if (currentUser) {
            setShowName(displayName);
        }
    });

    if (!isLoading) {
        if (showName) {
            return (
                <IsLoggedIn
                    handleLogOut={logOut}
                    displayname={showName}
                ></IsLoggedIn>
            );
        } else {
            return <IsLoggedOut></IsLoggedOut>;
        }
    }
};

export default NavBar;
