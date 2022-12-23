import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Formik, Form, useField } from "formik";
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
        apiKey: "w05KkI9AWhKxzvPFtXotUva-",
      },
    }).then((response) => {
      setData(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }, [foodID]);

  const getFoodRating = () => {
    axios({
      method: "get",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/food-rating/${foodID}`,
      headers: {
        apiKey: "w05KkI9AWhKxzvPFtXotUva-",
      },
    }).then((response) => {
      setRating(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getFoodRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodID]);

  const onSubmit = (values) => {
    console.log(values);
    axios({
      method: "post",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/rate-food/${foodID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: "w05KkI9AWhKxzvPFtXotUva-",
      },
      data: {
        rating: values.rating,
        review: values.review,
      },
    }).then((response) => {
      console.log(response);
      getFoodRating();
    }).catch((error) => {
      console.log(error);
    });
  };

  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className='mb-3'>
        <label htmlFor={props.id || props.name}>
          {label}
        </label>
        <input className="text-input form-control" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };
  
  return (
    <>
      <section>
        <div className="container-md mt-3">
          <h2 className="text-center mt-4 mb-4 fw-bolder">Rating</h2>
          <div className="card mb-3 mx-auto shadow food-detail">
            <div className="row g-1">
              <div className="col-lg-4">
                <img
                  src={data && data.data.imageUrl}
                  className="img-fluid m-2 food-image"
                  alt={data && data.data.name}
                />
              </div>
              <div className="col-lg-8">
                <div className="card-body">
                  <h5 className="card-title">{data && data.data.name}</h5>
                  <p className="card-text">{data && data.data.description}</p>
                  <p className="card-text">
                    <i className="fa-brands fa-elementor">
                      {data &&
                        data.data.ingredients.map((m, index) => {
                          return (
                            <span key={index}>{(index ? ", " : "") + m}</span>
                          );
                        })}
                    </i>
                  </p>
                  <p className="card-text">
                    <i
                      className="ri-star-fill m-1"
                    ></i>
                    {data && data.data.rating}
                  </p>
                </div>
              </div>
              <div className="card-footer">
                <p
                  className="text-muted card-footer-text mb-1"
                >
                  Created at: {data && data.data.createdAt}
                </p>
                <p
                  className="text-muted card-footer-text mb-1"
                >
                  Updated at: {data && data.data.updatedAt}
                </p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn bgcolor1 text-light btn-success shadow"
              data-bs-toggle="modal"
              data-bs-target={`#staticBackdrop_${data && data.data.id}`}
            >
              Rate Food
            </button>
          </div>
          <div
            className="modal fade"
            id={`staticBackdrop_${data && data.data.id}`}
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
                        <h4 className="color1 fw-bolder">
                          {data && data.data.name}
                        </h4>
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
            rating.data.map((r) => {
              return (
                <div key={r.id}>
                  <ul className="mx-auto list-group list-review mt-3">
                    <li className="list-group-item shadow">
                      <div className="d-flex justify-content-start gap-2">
                        <div className="d-flex">
                          <img
                            src={r.user.profilePictureUrl}
                            className="img-fluid img-profile"
                            alt={r.user.name}
                          />
                        </div>
                        <div className="d-flex">
                          <div>
                            <p className="fw-bold review-name mb-1">
                              {r.user.name}
                            </p>
                            <p className="d-flex align-items-center review-name">
                              <i className="ri-star-fill me-1"></i>
                              {r.rating}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-start review-comment">
                        <p>{r.review}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}

export default Rating;