import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../Rating/Rating.css";

const Rate = () => {
  let { foodID } = useParams();

  const [food, setFood] = useState();
  const [rating, setRating] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${foodID}`,
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
  }, [foodID]);

  const getRating = () => {
    axios({
      method: "get",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/food-rating/${foodID}`,
      headers: {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    })
      .then((response) => {
        console.log(response);
        setRating(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/rate-food/${foodID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
      data: {
        rating: values.rating,
        review: values.review,
      },
    })
      .then((res) => {
        console.log(res);
        getRating();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      rating: "",
      review: "",
    },
    validationSchema: Yup.object({
      rating: Yup.string().required("Required"),
      review: Yup.string().required("Required"),
    }),
  });

  return (
    <>
      <section className="container-fluid py-5">
        <div
          className="card mb-3 mx-auto  shadow"
          style={{ maxWidth: `540px` }}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={food && food.imageUrl}
                className="img-fluid m-2 shadow"
                style={{ height: "250px" }}
                alt={food && food.name}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "26px" }}>
                  {food && food.name}
                </h5>
                <div className="d-flex gap-2 mt-4">
                  <i
                    className="bi bi-card-list"
                    style={{ color: "#0d6efd", fontSize: "16px" }}
                  ></i>
                  <p className="text-desc" style={{ fontSize: "16px" }}>
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Desc:
                    </span>{" "}
                    {food && food.description}
                  </p>
                </div>
                <div className="d-flex gap-2" style={{ marginTop: "-20px" }}>
                  <i
                    className="bi bi-card-checklist"
                    style={{ color: "#0d6efd", fontSize: "16px" }}
                  ></i>
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Ingredients:
                    {food &&
                      food.ingredients.map((i, index) => {
                        return (
                          <span
                            style={{ fontWeight: "normal", fontSize: "16px" }}
                            key={index}
                          >
                            {(index ? ", " : " ") + i}
                          </span>
                        );
                      })}
                  </p>
                </div>
                <p className="card-text">
                  <i
                    className="fa-solid fa-star m-1"
                    style={{ color: `gold` }}
                  ></i>
                  {food && food.rating}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            className="btn text-light btn-success shadow"
            data-bs-toggle="modal"
            data-bs-target={`#rating${food && food.id}`}
          >
            Rate Food
          </button>
        </div>

        <div
          className="modal fade"
          id={`rating${food && food.id}`}
          tabIndex="-1"
          aria-labelledby="modal-title"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-center">
                  <h2 className="fs-3">Rate This Food</h2>
                  <img
                    src={food && food.imageUrl}
                    className="img-fluid img-food-rate my-3"
                    alt={food && food.name}
                  />
                </div>
                <form onSubmit={(e) => handleSubmit(e, food.id)}>
                  <div className="row">
                    <div className="col-lg-12 mb-4">
                      <label forhtml="inputName" className="form-label fw-bold mt-1">
                        Rating
                      </label>
                      <input
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="number"
                        className="form-control"
                        id="rating"
                      />
                    </div>
                    <div className="col-lg-12">
                      <label forhtml="inputName" className="form-label fw-bold mt-1">
                        Review
                      </label>
                      <input
                        value={formik.values.review}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        className="form-control"
                        id="review"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <button
                        type="submit"
                        className="btn text-light shadow btn-success"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {rating &&
          rating.map((rate) => {
            return (
              <div key={rate.id}>
                <ul className="mx-auto list-group list-review mt-3">
                  <li className="list-group-item shadow">
                    <div className="d-flex justify-content-start gap-2">
                      <div className="d-flex">
                        <img
                          src={rate.user.profilePictureUrl}
                          className="img-fluid img-profile"
                          alt={rate.user.name}
                        />
                      </div>
                      <div className="d-flex">
                        <div>
                          <p className="fw-bold review-name mb-1">
                            {rate.user.name}
                          </p>
                          <p className="d-flex align-items-center review-name">
                            <i className="ri-star-fill me-1"></i>
                            {rate.rating}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start review-comment">
                      <p>{rate.review}</p>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
      </section>
    </>
  );
};

export default Rate;
