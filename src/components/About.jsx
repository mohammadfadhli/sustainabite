import React from "react";
import "../styles/Home.css";
import food_bg from "../assets/food_bg.jpg";
import community_bg from "../assets/community_bg.jpg";
import eat_tgt_bg from "../assets/eat_tgt.jpg";

const About = () => {
  return (
    <div className="container w-100 h-100">
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={food_bg} className="d-block w-100 h-100" alt="..." />
            <div class="carousel-caption d-none d-md-block bg-light text-dark">
              <h5>Sustainabite</h5>
              <p>Give bites back to society</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={community_bg} className="d-block w-100 h-100" alt="..." />
            <div class="carousel-caption d-none d-md-block bg-light text-dark">
              <h5>Togetherness</h5>
              <p>Bringing back our Kampung spirit</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={eat_tgt_bg} className="d-block w-100 h-100" alt="..." />
            <div class="carousel-caption d-none d-md-block bg-light text-dark">
              <h5>Ending food insecurity</h5>
              <p>Together, no one will go hungry.</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default About;
