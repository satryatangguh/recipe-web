import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../Rating/Rating.css";

const Rating = () => {
  let { foodID } = useParams();

  const [data, setData] = useState();
  const [rating, setRating] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${foodID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [foodID]);

  const getFoodRating = () => {
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
    getFoodRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodID]);

  const onSubmit = (e) => {
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
                  src={data.imageUrl}
                  className="img-fluid m-0 img-food"
                  alt={data.name}
                />
              </div>
              <div className="col-lg-8 col-md-8 col-sm-8">
                <h2 className="card-title fs-4 mb-3">{data.name}</h2>
                <div className="d-flex gap-2 mb-1">
                  <i className="ri-file-list-line"></i>
                  <p className="card-text">
                    <span className="fw-bold">Description: </span>
                    {data.description}
                  </p>
                </div>
                <div className="d-flex gap-2 mb-1">
                  <i className="ri-file-list-line"></i>
                  <p className="card-text">
                    <span className="fw-bold">Ingredients: </span>
                    {data &&
                      data.ingredients.map((m, index) => {
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
                    {data.createdAt}
                  </p>
                </div>
                <div className="d-flex gap-2 mb-1">
                  <i className="ri-file-list-line"></i>
                  <p className="card-text">
                    <span className="fw-bold">Updated at: </span>
                    {data.updatedAt}
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
                  to={`/rating/${data.id}`}
                >
                  <i className="ri-star-fill me-1"></i>
                </Link>
                {data.rating}
              </span>
              <span className="text-muted d-flex align-items-center rate">
                <i className="ri-heart-fill me-1"></i>
                {data.totalLikes}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            className="btn bgcolor1 text-light btn-success shadow"
            data-bs-toggle="modal"
            data-bs-target={`#rating${data && data.data.id}`}
          >
            Rate Food
          </button>
        </div>
        
        <div
          className="modal fade"
          id={`rating${data && data.id}`}
          tabIndex="-1"
          aria-labelledby="modal-title"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-body">
                <Formik
                  initialValues={{
                    rating: "",
                    review: "",
                  }}
                  enableReinitialize={true}
                  validationSchema={Yup.object({
                    rating: Yup.string().required("Required"),
                    review: Yup.string().required("Required"),
                  })}
                  onSubmit={onSubmit}
                >
                  <div className="container-md my-3">
                    <div className="text-center">
                      <h2>Rate this Food</h2>
                      <h4 className="color1 fw-bolder">{data && data.name}</h4>
                    </div>
                    <div className="row justify-content-center my-3">
                      <div className="col-md-12">
                        <img
                          src={data && data.data.imageUrl}
                          className="img-fluid food-card-image mx-auto d-block mb-3"
                          alt=""
                        />
                        <Form>
                          <MyTextInput
                            label="Rating"
                            name="rating"
                            type="number"
                          />

                          <MyTextInput
                            label="Review"
                            name="review"
                            type="text"
                          />

                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn text-light shadow btn-success"
                            >
                              Add
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </Formik>
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
