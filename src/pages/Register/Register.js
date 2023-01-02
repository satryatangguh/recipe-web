import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../Register/Register.css";

const Register = () => {
  const [image, setImage] = useState("https://fakeimg.pl/350x200/");
  const [saveImage, setSaveImage] = useState(null);

  // function

  const formSignup = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      role: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: "https://api-bootcamp.do.dibimbing.id/api/v1/register",
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          passwordRepeat: values.passwordRepeat,
          role: values.role,
          phoneNumber: values.phoneNumber,
        },
      })
        .then((response) => {
          alert("Registration Success!");
          window.location.reload();
        })
        .catch((error) => {
          alert("Registration failed. Try Again!");
        });
    },
  });

  return (
    <>
      <section className="container-fluid background-sign-up d-flex align-items-center">
        <div className="card mx-auto shadow sign-up-card py-3 px-2">
          <div className="card-body">
            <h2 className="title text-center mb-4">Sign Up</h2>
            <form onSubmit={formSignup.handleSubmit}>
              <div className="row mb-2">
                <div className="col-6">
                  <label className="form-label fw-bold mb-0">Username</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter Username"
                    className="form-control"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.name}
                  />
                  {formSignup.touched.username && formSignup.errors.username ? (
                    <div>{formSignup.errors.username}</div>
                  ) : null}
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold mb-0">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.email}
                  />

                  {formSignup.touched.email && formSignup.errors.email ? (
                    <div>{formSignup.errors.email}</div>
                  ) : null}
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-6">
                  <label className="form-label fw-bold mb-0">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    className="form-control"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.password}
                  />

                  {formSignup.touched.password && formSignup.errors.password ? (
                    <div>{formSignup.errors.password}</div>
                  ) : null}
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold mb-0">
                    Confirm Password
                  </label>
                  <input
                    id="passwordRepeat"
                    name="passwordRepeat"
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.passwordRepeat}
                  />

                  {formSignup.touched.passwordRepeat &&
                  formSignup.errors.passwordRepeat ? (
                    <div>{formSignup.errors.passwordRepeat}</div>
                  ) : null}
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-6">
                  <label className="form-label fw-bold mb-0">Phone</label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter Phone Number"
                    className="form-control"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.phoneNumber}
                  />

                  {formSignup.touched.phoneNumber &&
                  formSignup.errors.phoneNumber ? (
                    <div>{formSignup.errors.phoneNumber}</div>
                  ) : null}
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold mb-0">Select Role</label>
                  <select
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.role}
                    component="select"
                    id="role"
                    name="role"
                    multiple={false}
                    className="form-select"
                  >
                    <option value="">Select a Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>

              <div className="row mb-2">
                <label className="form-label fw-bold mb-0">Photo Profile</label>
                <div className="d-flex">
                  <input
                    className="form-control file-upload"
                    type="file"
                    id="formFile"
                  />
                  <button className="btn btn-success btn-upload">Upload</button>
                </div>
              </div>

              <div className="mt-3">
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-success"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
