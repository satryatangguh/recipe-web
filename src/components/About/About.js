import React from "react";
import "../About/About.css";
import about from "../../assets/about.webp";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <section className="container-fluid p-home p-responsive">
        <div className="row align-items-center g-lg-5 g-md-4 g-4">
          <div className="col-lg-4 col-md-5 col-12 text-center">
            <img
              className="rounded-5 img-fluid img-about"
              src={about}
              alt="about"
            />
          </div>
          <div className="col-lg-6 col-md-7 col-12">
            <h1 className="title text-start">About us</h1>
            <div className="mt-3">
              <p className="about-lh">
                Cookpedia is a website built by and for kitchen enthusiast. Most importantly, Cookpedia connects home cooks with their sources of inspiration to other home cooks.
              </p>
              <p className="about-lh">
                Cookpedia changed the food world by providing tools to share
                recipes and cooking tips. Every day, cooks from around the world
                share recipes and inspire them with photo, ingredients, review,
                and ratings.
              </p>
            </div>
            <Link
              style={{ textDecoration: "none" }}
              to="/our-recipes"
            >
              <button
                type="button"
                className="btn btn-success shadow d-flex align-items-center p-3"
              >
                Explore Our Recipes
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
