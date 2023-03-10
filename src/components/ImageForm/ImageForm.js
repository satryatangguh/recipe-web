import React, { useState} from 'react';
import axios from 'axios';
import "../ImageForm/ImageForm.css";

const ImageForm = ({onChange}) => {
  const [image, setImage] = useState("")

  const handleChange = (e) => {
    // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  const handleApi = () => {
    const url = `${process.env.REACT_APP_BASEURL}/api/v1/upload-image`;
    const formData = new FormData();
    formData.append("image", image);
    const headersApi = {
      headers: {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
        Authorization: `Bearer${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios.post(url, formData, headersApi).then((response) => {
      console.log(response);
      onChange(response.data.url);
      alert(`${response.data.message}`);
    }).catch((error) => {
      console.log(error);
      alert("Image file size too large!");
    })
  }

  return (
    <>
      <div className="row mb-3">
        <div className="col-lg-12">
          <label className="form-label fw-bold mb-1">Image</label>
          <div className="d-flex">
            <input
              className="form-control file-upload"
              type="file"
              onChange={handleChange}
              accepts="image/*"
            />
            <button
              onClick={handleApi}
              className="btn btn-success btn-upload"
              encType="multipart/form-data"
              type="button"
            >
              <i className="ri-upload-2-line"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageForm;