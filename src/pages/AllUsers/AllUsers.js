import React, { useState, useEffect} from 'react';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from 'formik';
import "../AllUsers/AllUsers.css";

const AllUsers = () => {
  const [users, setUsers] = useState([])

  const getUsers = () => {
    axios({
      method: "get",
      url: "https://api-bootcamp.do.dibimbing.id/api/v1/all-user",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    }).then((response) => {
      console.log(response.data);
      setUsers(response.data.data);
    }).catch((error) => {
      console.log(error);
      alert("Error, reload the page!");
    });
  }

  useEffect(() => {
    getUsers();
  }, [])
  
  const handleSubmit = (e, id) => {
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
      data: {
        role: values.role,
      },
    })
      .then((response) => {
        console.log(response);
        getUsers();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const formik = useFormik({
    initialValues: {
      role: "",
    },
    validationSchema: Yup.object({}),
  });

  return (
    <>
      <section className="container-fluid py-5 min-vh-100">
        <h1 className="title text-center">All Users</h1>
        <div className="row row-cols row-cols-md-3 row-cols-lg-5 g-4 mt-3 mx-lg-5 mx-4">
          {users && users.map((r) => {
            return (
              <React.Fragment key={r.id}>
                <div className="card-group gy-0">
                  <div className="card shadow mt-4">
                    <div className="card-body d-flex flex-column p-2">
                      <img
                        src={r.profilePictureUrl}
                        className="img-card-profile mx-auto mb-2"
                        alt={r.name}
                      />
                      <h5 className="card-title text-center fs-5 mb-3">
                        {r.name}
                      </h5>
                      <div className="d-flex gap-2 d-flex align-items-center mt-auto">
                        <i className="ri-mail-fill fs-5"></i>
                        <p className="card-text  font-12px text-truncate">
                          {r.email}
                        </p>
                      </div>
                      <div className="d-flex gap-2 d-flex align-items-center">
                        <i className="ri-phone-fill fs-5"></i>
                        <p className="card-text  font-12px">{r.phoneNumber}</p>
                      </div>
                      <div className="d-flex gap-2 d-flex align-items-center">
                        <i className="ri-account-circle-fill fs-5"></i>
                        <p className="card-text  font-12px">{r.role} account</p>
                      </div>
                    </div>
                    <div className="card-footer d-flex align-items-center justify-content-center">
                      <button
                        type="button"
                        className="btn text-light btn-success shadow d-flex align-items-center py-1"
                        data-bs-toggle="modal"
                        data-bs-target={`#users${r.id}`}
                      >
                        Edit Role
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id={`users${r.id}`}
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content p-3">
                      <div className="modal-body">
                        <div className="text-center">
                          <h2 className="fs-3">Edit Role</h2>
                          <img
                            src={r.profilePictureUrl}
                            className="img-card-profile mx-auto mb-2"
                            alt={r.name}
                          />
                          <h5 className="card-title text-center fs-5 mb-3">
                            {r.name}
                          </h5>
                        </div>
                        <form onSubmit={(e) => handleSubmit(e, r.id)}>
                          <div className="row mb-3">
                            <div className="col-lg-12">
                              <label
                                htmlFor="inputEmail"
                                className="form-label fw-bold mb-1"
                              >
                                Email
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                value={r.email}
                                aria-label="Disabled input example"
                                disabled
                                readOnly
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-lg-12">
                              <label
                                htmlFor="inputPhone"
                                className="form-label fw-bold mb-1"
                              >
                                Phone Number
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                value={r.phoneNumber}
                                aria-label="Disabled input example"
                                disabled
                                readOnly
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-lg-12">
                              <label
                                htmlFor="inputRole"
                                className="form-label fw-bold mb-1"
                              >
                                Change a role
                              </label>
                              <select
                                label="Role"
                                name="role"
                                className="form-select"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.role}
                              >
                                <option value="">Select a Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                              </select>
                            </div>
                          </div>
                          <div className="text-center mt-3">
                            <button type="submit" className="btn btn-success">
                              Save Change
                            </button>
                          </div>
                        </form>
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
}

export default AllUsers;