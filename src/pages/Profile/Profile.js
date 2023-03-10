import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../Profile/Profile.css";
import ImageForm from "../../components/ImageForm/ImageForm";
import defaultImage from "../../assets/default.webp";

const Profile = () => {
  const [profile, setProfile] = useState();
  const [uploadImage, setUploadImage] = useState("");

  const onImageError = (e) => {
    e.target.src = defaultImage;
  };

  const getProfile = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/user`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    })
      .then((response) => {
        console.log(response.data.user);
        setProfile(response.data.user);
      })
      .catch((error) => {
        console.log(error);
        alert("Error, reload the page!");
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/api/v1/update-profile`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
      data: {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        profilePictureUrl: uploadImage,
      },
    })
      .then((response) => {
        console.log(response);
        getProfile();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: profile && profile.name,
      email: profile && profile.email,
      phoneNumber: profile && profile.phoneNumber,
      profilePictureUrl: profile && profile.profilePictureUrl,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid Email address").required("Required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10,12}$/, "Must be in digit")
        .required("Required"),
    }),
  });

  return (
    <>
      <section className="container-fluid py-5">
        <div className="mx-auto profile-detail">
          <h1 className="title text-center">My Profile</h1>
          <div className="card my-3 shadow">
            <div className="card-body">
              <div className="row g-2">
                <div className="col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center">
                  <img
                    src={profile && profile.profilePictureUrl ? profile && profile.profilePictureUrl : defaultImage}
                    className="img-fluid m-0 img-profile-page"
                    alt={profile && profile.name}
                    onError={onImageError}
                  />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8">
                  <h2 className="card-title text-center text-sm-start fs-4 mb-3">
                    {profile && profile.name}
                  </h2>
                  <div className="d-flex gap-2 mb-1 d-flex align-items-center">
                    <i className="ri-mail-fill fs-5"></i>
                    <p className="card-text">{profile && profile.email}</p>
                  </div>
                  <div className="d-flex gap-2 mb-1 align-items-center">
                    <i className="ri-phone-fill fs-5"></i>
                    <p className="card-text">
                      {profile && profile.phoneNumber}
                    </p>
                  </div>
                  <div className="d-flex gap-2 mb-1 align-items-center">
                    <i className="ri-account-circle-fill fs-5"></i>
                    <p className="card-text text-capitalize">
                      {profile && profile.role} account
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer ">
              <div className="d-flex justify-content-end align-items-center">
                <button
                  type="button"
                  className="btn text-light btn-success shadow d-flex align-items-center py-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Profile</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <div className="text-center">
                    <img
                      src={
                        profile && profile.profilePictureUrl
                          ? profile && profile.profilePictureUrl
                          : defaultImage
                      }
                      className="img-fluid img-profile-page mb-3"
                      alt={profile && profile.name}
                      onError={onImageError}
                    />
                  </div>
                  <form onSubmit={(e) => handleSubmit(e, profile.id)}>
                    <div className="row mb-3">
                      <div className="col-lg-12">
                        <label
                          htmlFor="inputName"
                          className="form-label fw-bold mb-1"
                        >
                          Username
                        </label>
                        <input
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Enter username"
                        />
                      </div>
                      {formik.touched.name && formik.errors.name ? (
                        <div className="text-danger">{formik.errors.name}</div>
                      ) : null}
                    </div>

                    <div className="row mb-3">
                      <div className="col-lg-12">
                        <label
                          htmlFor="inputEmail"
                          className="form-label fw-bold mb-1"
                        >
                          Email
                        </label>
                        <input
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Enter email"
                        />
                      </div>
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                      ) : null}
                    </div>

                    <div className="row mb-3">
                      <div className="col-lg-12">
                        <label
                          htmlFor="inputPhoneNumber"
                          className="form-label fw-bold mb-1"
                        >
                          Phone Number
                        </label>
                        <input
                          value={formik.values.phoneNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          className="form-control"
                          id="phoneNumber"
                          placeholder="Enter phone number"
                        />
                      </div>
                      {formik.touched.phoneNumber &&
                      formik.errors.phoneNumber ? (
                        <div className="text-danger">
                          {formik.errors.phoneNumber}
                        </div>
                      ) : null}
                    </div>

                    <ImageForm onChange={(value) => setUploadImage(value)} />

                    <div className="text-start mt-3">
                      <button
                        type="submit"
                        className="btn text-light shadow btn-success"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
