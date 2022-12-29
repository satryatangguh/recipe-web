import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../Rating/Rating.css";

const Rate = () => {
  let { foodID } = useParams();

  const [food, setFood] = useState("");
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
                <h2 className="card-title fs-4 mb-3">{food && food.name}</h2>
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
                <i className="ri-star-fill me-1"></i>
                {food && food.rating}
              </span>
              <span className="text-muted d-flex align-items-center rate">
                <i className="ri-heart-fill me-1"></i>
                {food && food.totalLikes}
              </span>
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
                      <label
                        forhtml="inputName"
                        className="form-label fw-bold mt-1"
                      >
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
                      <label
                        forhtml="inputName"
                        className="form-label fw-bold mt-1"
                      >
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
