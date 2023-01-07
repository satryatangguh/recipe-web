import React from "react";
import "../Feature/Feature.css";

const Feature = () => {
  return (
    <section className="container-fluid p-home bg-feature">
      <div className="row">
        <div className="col-12">
          <h1 className="text-white text-center">Our Features</h1>
        </div>
      </div>
      <div className="row gy-4">
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="p-4 text-center text-white">
            <div className="feature-icon">
              <i className="ri-shield-star-fill"></i>
            </div>
            <h3 className="mt-4 mb-2 fs-5">Add Rating and Review</h3>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="p-4 text-center text-white">
            <div className="feature-icon">
              <i className="ri-refresh-fill"></i>
            </div>
            <h3 className="mt-4 mb-2 fs-5">Update and Publish Recipes</h3>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="p-4 text-center text-white">
            <div className="feature-icon">
              <i className="ri-heart-add-fill"></i>
            </div>
            <h3 className="mt-4 mb-2 fs-5">Add to Favourites</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
