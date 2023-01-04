import React, { useState, useEffect } from "react";
import axios from "axios";
import "../FoodList/FoodList.css";

const FoodList = () => {
  const [food, setFood] = useState([]);

  const getFoodData = () => {
    const headers = localStorage.getItem("token")
      ? {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        }
      : { apiKey: `${process.env.REACT_APP_APIKEY}` };
    axios({
      method: "get",
      url: "https://api-bootcamp.do.dibimbing.id/api/v1/foods",
      headers: headers,
    })
      .then((response) => {
        console.log(response.data.data);
        setFood(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error, reload the page!");
      });
  };

  useEffect(() => {
    getFoodData();
  }, []);

  const deleteFood = (id) => {
    axios({
      method: "delete",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/delete-food/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    }).then((response) => {
      console.log(response);
      getFoodData();
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <section className="container-fluid py-5 min-vh-100">
        <h1 className="title text-center">Recipe List</h1>
        <div className="row row-cols row-cols-md-3 row-cols-lg-5 g-4 mt-3 mx-lg-5 mx-4">
          {food &&
            food.map((r) => {
              return (
                <React.Fragment key={r.id}>
                  <div className="card-group gy-0">
                    <div className="card mh-100 shadow mt-4">
                      <img
                        src={r.imageUrl}
                        className="card-img-top mx-auto card-image"
                        alt={r.name}
                      />
                      <div className="card-body d-flex flex-column p-2">
                        <h5 className="card-title text-start text-capitalize fs-6 mb-1">
                          {r.name}
                        </h5>
                        <div className="d-flex align-items-center mt-auto">
                          <span className="text-muted d-flex align-items-center me-3 rate">
                            <i className="ri-star-fill me-1"></i>
                            {r.rating}
                          </span>
                          <span className="text-muted d-flex align-items-center rate">
                            <i className="ri-heart-fill me-1"></i>
                            {r.totalLikes}
                          </span>
                        </div>
                      </div>
                      <div className="card-footer d-flex align-items-center justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn text-light btn-danger shadow d-flex align-items-center"
                          onClick={() => deleteFood(r.id)}
                        >
                          <i className="ri-delete-bin-fill"></i>
                        </button>
                        <button
                          type="button"
                          className="btn text-light btn-success shadow d-flex align-items-center"
                          data-bs-toggle="modal tooltip"
                          data-bs-target="#edit"
                        >
                          <i className="ri-pencil-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default FoodList;
