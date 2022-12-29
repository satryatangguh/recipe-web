import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Detail/Detail.css";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const [food, setFood] = useState("");
  const { id } = useParams();
  
  useEffect(() => {
    axios({
      method: "get",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${id}`,
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    })
      .then((response) => {
        console.log(response);
        setFood(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <section className="container-fluid py-5">
        <div className="card mb-3 mx-auto shadow food-detail">
          <div className="card-body">
            <div className="row g-2">
              <div className="col-lg-4 col-md-4 col-sm-4">
                <img
                  src={food && food.imageUrl}
                  className="img-fluid m-0 img-food"
                  alt={food && food.name}
                />
              </div>
              <div className="col-lg-8 col-md-8 col-sm-8">
                <h2 className="card-title fs-4 mb-3">{food.name}</h2>
                <div className="d-flex gap-2 mb-1">
                  <i className="ri-file-list-line"></i>
                  <p className="card-text">
                    <span className="fw-bold">Description: </span>
                    {food && food.description}
                  </p>
                </div>
                <div className="d-flex gap-2 mb-1">
                  <i className="ri-file-list-line"></i>
                  <p className="card-text">
                    <span className="fw-bold">Ingredients: </span>
                    {food &&
                      food.ingredients.map((m, index) => {
                        return (
                          <span key={index}>{(index ? ", " : "") + m}</span>
                        );
                      })}
                  </p>
                </div>
                <div className="d-flex gap-2 mb-1">
                  <i className="ri-file-list-line"></i>
                  <p className="card-text">
                    <span className="fw-bold">Created at: </span>
                    {food && food.createdAt}
                  </p>
                </div>
                <div className="d-flex gap-2 mb-1">
                  <i className="ri-file-list-line"></i>
                  <p className="card-text">
                    <span className="fw-bold">Updated at: </span>
                    {food && food.updatedAt}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer ">
            <div className="d-flex align-items-center mt-auto">
              <span className="text-muted d-flex align-items-center me-3 rate">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/rating/${food.id}`}
                >
                  <i className="ri-star-fill me-1"></i>
                </Link>
                {food && food.rating}
              </span>
              <span className="text-muted d-flex align-items-center rate">
                <i className="ri-heart-fill me-1"></i>
                {food && food.totalLikes}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Detail;