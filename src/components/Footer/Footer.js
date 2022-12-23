import React from 'react'
import "../Footer/Footer.css"

const Footer = () => {
  return (
    <footer className="bg-dark">
      <div className="container-fluid p-5 pb-2">
        <div className="footer-top">
          <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1 gy-4">
            <div className="col">
              <h5 className="text-white">Contacts</h5>
              <div className="mt-3">
                <span className="text-decoration-none text-white-50">
                  <i className="ri-mail-line me-2 fs-5"></i>cookpedia@mail.com
                </span>
                <br />
                <span className="text-decoration-none text-white-50">
                  <i className="ri-phone-line me-2 fs-5"></i>123140122
                </span>
              </div>
            </div>
            <div className="col">
              <h5 className="text-white">Follow</h5>
              <div className="social-icon mt-3 d-flex align-items-center">
                <span className="text-white-50">
                  <i className="me-1 fs-5 p-2 rounded ri-twitter-fill"></i>
                </span>
                <span className="text-white-50">
                  <i className="me-1 fs-5 p-2 rounded ri-facebook-circle-fill"></i>
                </span>
                <span className="text-white-50">
                  <i className="me-1 fs-5 p-2 rounded ri-youtube-fill"></i>
                </span>
                <span className="text-white-50">
                  <i className="fs-5 p-2 rounded ri-instagram-fill"></i>
                </span>
              </div>
            </div>
            <div className="col flex-md-grow-1">
              <h5 className="text-white">Subscribe and never miss a post!</h5>
              <div className="mt-3 col-12 col-sm-10 col-md-8 col-lg-12">
                <form action="" className="">
                  <div className="input-group rounded-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="It's Free!"
                    />
                    <button className="btn btn-info px-4 py-2" type="button">
                      <i className="fw-bold far fa-paper-plane"></i>
                      <span className="d-none d-sm-inline">Subscribe</span>
                    </button>
                  </div>
                </form>
                <small className="text-white-50">
                  *Subscribe to our newsletter to receive early updates and new
                  recipes info.
                </small>
              </div>
            </div>
          </div>
        </div>
        <div
          className="text-white-50
            footer-bottom
            mt-5
            d-flex
            justify-content-center
            align-items-center
          "
        >
          <p className="me-1">
            &copy; All Rights Reserved. Made By
            <span className="text-decoration-none text-white ms-1">
              Satrya Tangguh Puruhita
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;