import React from "react";

const NavBar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-*">
        <div class="container-fluid">
          <button
            class="btn btn-primary-outline menu"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <i class="fa fa-bars" style="color: white;"></i>
          </button>

          <button type="button" id="logout_btn" class="btn bai">
            bai bai
          </button>
        </div>
      </nav>

      <div
        class="offcanvas offcanvas-start text-bg-dark"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="name_user_logged_in"
      >
        <div class="offcanvas-header">
          <h6
            class="offcanvas-title"
            id="name_user_logged_in"
            style="color: #2d5db2;"
          >
            name here
          </h6>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div class="ps-2">Home</div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
