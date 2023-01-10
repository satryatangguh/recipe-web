import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, useField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import "../FoodList/FoodList.css";
import ImageForm from "../../components/ImageForm/ImageForm";

const FoodList = () => {
  const [food, setFood] = useState();
  const [uploadImage, setUploadImage] = useState("");

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

  const handleUpdate = (values) => {
    axios({
      method: "post",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/update-food/${values.id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
      data: {
        name: values.name,
        description: values.description,
        ingredients: values.ingredients,
        imageUrl: uploadImage,
      },
    }).then((response) => {
      getFoodData();
      window.location.reload();
    }).catch((error) => {
      console.log(error);
    });
  }

  const deleteFood = (id) => {
    if (window.confirm(`Are you sure want to delete this food?`)) {
      axios({
        method: "delete",
        url: `https://api-bootcamp.do.dibimbing.id/api/v1/delete-food/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
      }).then((response) => {
        getFoodData();
        
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  const InputText = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="row mb-3">
        <div className="col-lg-12">
          <label className="form-label fw-bold mb-1" htmlFor={props.id || props.name}>{label}</label>
          <input className="form-control" {...field} {...props} />
          {meta.touched && meta.error ? (
            <div className="text-danger">{meta.error}</div>
          ) : null}
        </div>
      </div>
    );
  };

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
                          data-bs-toggle="modal"
                          data-bs-target={`#staticBackdrop_${r.id}`}
                        >
                          <i className="ri-pencil-fill"></i>
                        </button>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id={`staticBackdrop_${r.id}`}
                      tabIndex="-1"
                      aria-labelledby="modal-title"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content p-3">
                          <div className="modal-body">
                            <div className="text-center fs-3">
                              <h2 className="fs-3">Update {r.name}</h2>
                            </div>
                            <Formik
                              initialValues={{
                                name: r.name,
                                description: r.description,
                                ingredients: r.ingredients,
                                imageUrl: r.imageUrl,
                                id: r.id,
                              }}
                              validationSchema={Yup.object({
                                name: Yup.string().required("Required"),
                                description: Yup.string().required("Required"),
                              })}
                              onSubmit={handleUpdate}
                            >
                              <Form>
                                <InputText
                                  label="Name"
                                  name="name"
                                  type="text"
                                  placeholder="Food Name"
                                />
                                <InputText
                                  label="Description"
                                  name="description"
                                  type="text"
                                  placeholder="Description"
                                />
                                <ImageForm
                                  onChange={(value) => setUploadImage(value)}
                                />

                                <div className="row mb-3">
                                  <div className="col-lg-12">
                                    <label className="form-label fw-bold mb-1">
                                      Ingredients
                                    </label>
                                    <FieldArray name="ingredients">
                                      {(fieldArrayProps) => {
                                        const { push, remove, form } =
                                          fieldArrayProps;
                                        const { values } = form;
                                        const { ingredients } = values;
                                        return (
                                          <div>
                                            {ingredients.map(
                                              (ingredient, index) => (
                                                <div
                                                  key={index}
                                                  className="d-flex input-group mb-1"
                                                >
                                                  <Field
                                                    name={`ingredients[${index}]`}
                                                    placeholder={`Ingredient ${
                                                      index + 1
                                                    }`}
                                                    className="form-control"
                                                  />
                                                  {index > 0 && (
                                                    <button
                                                      type="button"
                                                      className="btn btn-danger "
                                                      onClick={() =>
                                                        remove(index)
                                                      }
                                                    >
                                                      <i className="ri-delete-bin-line"></i>
                                                    </button>
                                                  )}
                                                  <button
                                                    type="button"
                                                    className="btn btn-success "
                                                    onClick={() => push("")}
                                                  >
                                                    <i className="ri-add-fill"></i>
                                                  </button>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        );
                                      }}
                                    </FieldArray>
                                  </div>
                                </div>
                                <div className="text-center mt-3">
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                  >
                                    Save Change
                                  </button>
                                </div>
                              </Form>
                            </Formik>
                          </div>
                        </div>
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
