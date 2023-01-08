import React from "react";
import axios from "axios";
import "../AddFood/AddFood.css";

const AddFood = () => {
  return (
    <>
      <section className="container-fluid background-add-food d-flex align-items-center py-5">
        <div className="card mx-auto shadow sign-up-card py-3 px-2">
          <div className="card-body">
            <h2 className="title text-center mb-4">Add Food</h2>
            <form>
              <div className="row">
                <div className="col-12 mb-2">
                  <label className="form-label fw-bold mb-0">Food Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Food Name"
                    className="form-control"
                  />
                </div>

                <div className="col-12 mb-2">
                  <label className="form-label fw-bold mb-0">Food Description</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Description"
                    className="form-control"
                  />
                </div>

                <div className="col-12 mb-2">
                  <label className="form-label fw-bold mb-0">Food Image</label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    placeholder="Choose Image"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mt-3">
                <input
                  type="submit"
                  value="Add food"
                  className="btn btn-success fs-12px"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddFood