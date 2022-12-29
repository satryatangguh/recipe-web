import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../Rating/Rating.css";

const Rating = () => {
  let { foodsID } = useParams();

  const [food, setFood] = useState();
  const [rating, setRating] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${foodsID}`,
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
  }, [foodsID]);

  const getFoodRating = () => {
    axios({
      method: "get",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/food-rating/${foodsID}`,
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
    getFoodRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodsID]);

  const onSubmit = (e) => {
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/rate-food/${foodsID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
      data: {
        rating: values.rating,
        review: values.review,
      },
    })
      .then((response) => {
        console.log(response);
        getFoodRating();
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
                  src={food.imageUrl}
                  className="img-fluid m-0 img-food"
                  alt={food.name}
                />
              </div>
              <div className="col-lg-8 col-md-8 col-sm-8">
                <h2 className="card-title fs-4 mb-3">{food.name}</h2>
                <div className="d-flex gap-2 mb-1">
                  <i className="ri-file-list-line"></i>
                  <p className="card-text">
                    <span className="fw-bold">Description: </span>
                    {food.description}
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
                    {food.createdAt}
                  </p>
                </div>
                <div className="d-flex gap-2 mb-1">
                  <i className="ri-file-list-line"></i>
                  <p className="card-text">
                    <span className="fw-bold">Updated at: </span>
                    {food.updatedAt}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer ">
            <div className="d-flex align-items-center mt-auto">
              <span className="text-muted d-flex align-items-center me-3 rate">
                <i className="ri-star-fill me-1"></i>
                {food.rating}
              </span>
              <span className="text-muted d-flex align-items-center rate">
                <i className="ri-heart-fill me-1"></i>
                {food.totalLikes}
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
          id={`rating${food && data.id}`}
          tabIndex="-1"
          aria-labelledby="modal-title"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-body">
                <form
                  className="box-addFoods"
                  onSubmit={(e) => onSubmit(e, data.id)}
                >
                  <div className="text-center">
                    <h2
                      style={{
                        color: "#0d6efd",
                        position: "relative",
                        right: "-30px",
                      }}
                    >
                      Create Rating
                    </h2>
                    <h4 className="color1 fw-bolder">
                      {/* {foods && foods.name} */}
                    </h4>
                  </div>
                  <div
                    style={{ position: "relative", right: "40px" }}
                    className="row gap-4"
                  >
                    <div className="col-md-6">
                      <label for="inputName" className="form-label">
                        Rating
                      </label>
                      <input
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="number"
                        className="add-input"
                        id="rating"
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="inputName" className="form-label">
                        Review
                      </label>
                      <input
                        value={formik.values.review}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        className="add-input"
                        id="review"
                      />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">
                        Create
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

export default Rating;
