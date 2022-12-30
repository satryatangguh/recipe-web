import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Favorite/Favorite.css";
import { Link } from 'react-router-dom';

const Favorite = () => {
  const [favorite, setFavorite] = useState();

  const getLikeFood = () => {
    axios({
      method: "get",
      url: "https://api-bootcamp.do.dibimbing.id/api/v1/like-foods",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      },
    }).then((response) => {
      console.log(response);
      setFavorite(response.data.data);
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getLikeFood();
  }, []);
  
  const handleLike = (id, isLike) => {
    if (!isLike) {
      axios({
        method: "post",
        url: "https://api-bootcamp.do.dibimbing.id/api/v1/like",
        data: {
          foodId: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      axios({
        method: "post",
        url: "https://api-bootcamp.do.dibimbing.id/api/v1/unlike",
        data: {
          foodId: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }
    getLikeFood();
  };
  
  return (
    <>
      <section className="container-fluid py-5">
        <h1 className="title text-center">My Favorite</h1>
        <div className="row row-cols row-cols-md-3 row-cols-lg-5 g-4 mt-3 mx-lg-5 mx-4">
          {favorite &&
            favorite.map((r) => {
              return (
                <>
                  <div className="card-group gy-0" key={r.id}>
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
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`/rating/${r.id}`}
                            >
                              <i className="ri-star-fill me-1"></i>
                            </Link>
                            {r.rating}
                          </span>
                          <span className="text-muted d-flex align-items-center rate">
                            <i
                              className="ri-heart-fill me-1"
                              style={{
                                color: `${r.isLike ? "red" : "gray"}`,
                              }}
                              onClick={() => handleLike(r.id, r.isLike)}
                            ></i>
                            {r.totalLikes}
                          </span>
                        </div>
                      </div>
                      <div className="card-footer d-flex align-items-center justify-content-end">
                        <Link
                          style={{ textDecoration: "none", fontSize: "13px" }}
                          to={`/detail/${r.id}`}
                          className="d-flex align-items-center text-success"
                        >
                          View Detail
                          <i className="ri-arrow-right-line ms-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </section>
    </>
  );
}

export default Favorite