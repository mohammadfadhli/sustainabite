import React from "react";
import { Outlet } from "react-router";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-*" style={{zIndex: "10"}}>
        <div className="container-fluid">
          <button
            className="btn btn-primary-outline menu"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            {/* <i className="fa fa-bars" style={{color: "black"}}></i> */}
            <span className="navbar-toggler-icon"></span>
          </button>

          <button type="button" id="logout_btn" className="btn bai">
            bai bai
          </button>
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
            style={{color: "black"}}
          >
            name here
          </h6>
          <button
            type="button"
            className="btn-close btn-close-black"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="ps-2">Home</div>
        </div>
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default NavBar;
