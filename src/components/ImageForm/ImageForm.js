import React, { useState, useRef } from 'react';
import axios from 'axios';
import "../ImageForm/ImageForm.css"; 

const ImageForm = ({ onChange }) => {
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

      let config = {
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
          Authorization: `Bearer${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post("https://api-bootcamp.do.dibimbing.id/api/v1/upload-image", formData, config)
        .then(function(response) {
          onChange(response.data.url);
        })
        .catch(function(error) {
          console.error(error);
        })
        .then((response) => {
          console.log(response);
          alert("Upload image success")
        })
        .catch((error) => {
          console.log(error);
          alert("Image file is required")
        });
    }
  }
  
  return (
    <>
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
    </>
  );
}

export default ImageForm;