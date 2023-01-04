import React, {useState, useRef} from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../Register/Register.css";

const Register = () => {
  const [saveImage, setSaveImage] = useState("");
  const fileUpload = useRef(null);

  function handleChangeUploadImage(e) {
    console.log(e.target.files[0]);
    let uploaded = e.target.files[0];
    setSaveImage(uploaded);
  }

  function handleSave() {
    if (!saveImage) {
      alert("please upload a image first");
    } else {
      console.log(fileUpload.current.files[0]);
      let formData = new FormData();
      formData.append("image", saveImage);

      let configurasi = {
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
          Authorization: `Bearer${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(
          "https://api-bootcamp.do.dibimbing.id/api/v1/upload-image",
          formData,
          configurasi
        )
        .then((response) => {
          console.log(response);
          alert("Upload Picture successful !!");
        })
        .catch((error) => {
          console.error(error);
          alert("Upload Picture Failed !!");
        });
    }
  }

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
          profilePictureUrl: values.profilePictureUrl,
        },
      })
        .then((response) => {
          console.log(response);
          alert("Registration Success!");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
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
                  <label className="form-label fw-bold mb-0 label-register">
                    Username
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter Username"
                    className="form-control fs-12px"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.name}
                  />
                  {formSignup.touched.username && formSignup.errors.username ? (
                    <div>{formSignup.errors.username}</div>
                  ) : null}
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold mb-0 label-register">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-control fs-12px"
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
                  <label className="form-label fw-bold mb-0 label-register">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    className="form-control fs-12px"
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.password}
                  />

                  {formSignup.touched.password && formSignup.errors.password ? (
                    <div>{formSignup.errors.password}</div>
                  ) : null}
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold mb-0 label-register">
                    Confirm Password
                  </label>
                  <input
                    id="passwordRepeat"
                    name="passwordRepeat"
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control fs-12px"
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
                  <label className="form-label fw-bold mb-0 label-register">
                    Phone
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter Phone Number"
                    className="form-control fs-12px"
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
                  <label className="form-label fw-bold mb-0 label-register">
                    Select Role
                  </label>
                  <select
                    onChange={formSignup.handleChange}
                    onBlur={formSignup.handleBlur}
                    value={formSignup.values.role}
                    component="select"
                    id="role"
                    name="role"
                    multiple={false}
                    className="form-select fs-12px"
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>

              <div className="row mb-2">
                <label className="form-label fw-bold mb-0 label-register">
                  Photo Profile
                </label>
                <div className="d-flex">
                  <input
                    type="file"
                    className="form-control file-upload fs-12px"
                    id="formFile"
                    accept="image/*"
                    ref={fileUpload}
                    onChange={handleChangeUploadImage}
                  />
                  <button
                    onClick={handleSave}
                    className="btn btn-success btn-upload fs-12px"
                  >
                    <i className="ri-upload-2-line"></i>
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-success fs-12px"
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
