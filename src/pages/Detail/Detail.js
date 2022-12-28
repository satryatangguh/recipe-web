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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    })
      .then((response) => {
        setFood(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <section className="container-fluid py-5">
        <div className="card mb-3 mx-auto shadow food-detail">
          <div className="card-body">
            <div className="row g-1">
              <div className="col-lg-4">
                <img
                  src={food.imageUrl}
                  className="img-fluid m-2 food-image"
                  alt={food.name}
                />
              </div>
              <div className="col-lg-8">
                <h5 className="card-title">{food.name}</h5>
                <p className="card-text">{food.description}</p>
                <p className="card-text">
                  <i className="fa-brands fa-elementor">
                    {food &&
                      food.ingredients.map((m, index) => {
                        return (
                          <span key={index}>{(index ? ", " : "") + m}</span>
                        );
                      })}
                  </i>
                </p>
                <p className="card-text">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/rating/${food.id}`}
                  >
                    <i className="ri-star-fill m-1"></i>
                    {food.rating}
                  </Link>
                </p>
                <p className="card-text">
                  <i className="ri-heart-fill m-1"></i>
                  {food.totalLikes}
                </p>
              </div>
            </div>
          </div>
          <div className="card-footer ">
            <p className="text-muted card-footer-text mb-1">
              Created at: {food.createdAt}
            </p>
            <p className="text-muted card-footer-text mb-1">
              Updated at: {food.updatedAt}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Detail;