import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Home/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [food, setFood] = useState([]);

  const getFoodData = () => {
    const headers = localStorage.getItem("token")
      ? {
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        }
      : { apiKey: "w05KkI9AWhKxzvPFtXotUva-" };
    axios({
      method: "get",
      url: "https://api-bootcamp.do.dibimbing.id/api/v1/foods",
      headers: headers,
    })
      .then((resp) => {
        console.log(resp);
        setFood(resp.data.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error, try reloading the page");
      });
  };

  useEffect(() => {
    getFoodData();
  }, []);

  const handleLike = (id, isLike) => {
    if (!isLike) {
      axios({
        method: "post",
        url: "https://api-bootcamp.do.dibimbing.id/api/v1/like",
        data: {
          foodId: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        },
      })
        .then((response) => {
          console.log(response);
          getFoodData();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios({
        method: "post",
        url: "https://api-bootcamp.do.dibimbing.id/api/v1/unlike",
        data: {
          foodId: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        },
      })
        .then((response) => {
          console.log(response);
          getFoodData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="container-fluid">
        <h1 className="title text-center">Our Recipes</h1>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4 mx-3">
          {food &&
            food.map((r) => {
              return (
                <div className="card-group" key={r.id}>
                  <div className="card h-100 shadow mt-3">
                    <img
                      src={r.imageUrl}
                      className="card-img-top mx-auto"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "200px",
                      }}
                      alt={r.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center text-capitalize fs-5 mb-4">
                        {r.name}
                      </h5>
                      <p className="card-text fs-6 mb-1 fw-bold">
                        Desc: <span className="fw-normal">{r.description}</span>
                      </p>
                      <p className="card-text fs-6 mb-1 fw-bold">
                        Ingredients:{" "}
                        {r.ingredients.map((m, index) => {
                          return (
                            <span className="fw-normal" key={index}>
                              {(index ? ", " : " ") + m}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                    <div className="card-footer">
											<div className="d-flex align-items-center">
												<span className="text-muted d-flex align-items-center me-3">
													<Link style={{textDecoration: "none"}} to={`/rating/${r.id}`}>
														<i
															className="ri-star-fill me-1"
															style={{
																fontSize: "20px",
																color: `gold`,
															}}
														></i>
													</Link>
													{r.rating}
												</span>
												<span className="text-muted d-flex align-items-center">
													<i
														className="ri-heart-fill me-1"
														style={{
															fontSize: "20px",
															color: `${r.isLike ? "red" : "gray"}`,
														}}
														onClick={() => handleLike(r.id, r.isLike)}
													></i>
													{r.totalLikes}
												</span>
											</div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
