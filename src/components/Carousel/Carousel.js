import React from "react";
import "../Carousel/Carousel.css"

const Carousel = () => {
  return (
    <>
      <div id="heroSlider" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item text-center bg-cover vh-100 active slide-1">
            <div class="container h-100 d-flex align-items-center justify-content-center">
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <h6 class="text-white">WELCOME TO COOKPEDIA</h6>
                  <h1 class="display-1 my-3 fw-bold text-white">
                    Find Our Tasty Recipes Here
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div class="carousel-item text-center bg-cover vh-100 slide-2">
            <div class="container h-100 d-flex align-items-center justify-content-center">
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <h6 class="text-white">WELCOME TO COOKPEDIA</h6>
                  <h1 class="display-1 my-3 fw-bold text-white">
                    We Give You Fresh & Delicious
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#heroSlider"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#heroSlider"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carousel;
