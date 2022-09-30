import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginApi } from "../../redux/reducers/userReducer";
import signin from "../../assets/img/signin-image.jpg";
import toastService from "../../util/toast.service";
import LoginFb from "./LoginFb/LoginFb";

const eye = <FontAwesomeIcon icon={faEye} />;
export default function Login(props) {
  const dispatch = useDispatch();
  // show pass
  const [passwordShow, setPasswordShow] = useState(false);
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  // Lấy dữ liệu từ form
  const frm = useFormik({
    initialValues: {
      // Dữ liệu ban đầu mặc định của form
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      // check validation
      email: Yup.string()
        .required("Email không được bỏ trống !")
        .email("Email không đúng định dạng !"),
      password: Yup.string()
        .required("Password không được bỏ trống !")
        .min(6, "pass từ 6 - 32 ký tự !")
        .max(32, "pass từ 6 - 32 ký tự !"),
      // .matches(/cybersoft/, 'password không đúng đinh dạng !')
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginApi(values));
    },
  });
  return (
    <section className="sign-in">
      <div className="container_form">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img src={signin} alt="sing up image" />
            </figure>
          </div>
          <div className="signin-form">
            <h2 className="form-title">Login</h2>
            <form
              className="register-form"
              id="register-form"
              onSubmit={frm.handleSubmit}
            >
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-user fa-lg me-3 fa-fw" />
                <div className="form-outline flex-fill mb-0">
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  <div className="text-danger position-absolute mt-1">
                    {frm.errors.email && frm.touched.email ? (
                      <span className="text-danger">{frm.errors.email}</span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-lock fa-lg me-3 fa-fw" />
                <div
                  className="form-outline flex-fill mb-0"
                  style={{ position: "relative" }}
                >
                  <input
                    type={passwordShow ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    required
                    placeholder="Your Password"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  <div className="text-danger position-absolute mt-1">
                    {frm.errors.password && frm.touched.password ? (
                      <span className="text-danger">{frm.errors.password}</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <button
                    type="button"
                    className="show"
                    style={{
                      position: "absolute",
                      top: 8.5,
                      right: 10,
                      border: "none",
                      opacity: "0.5",
                      background: "none",
                    }}
                    onClick={togglePassword}
                  >
                    <i>{eye}</i>
                  </button>
                </div>
              </div>
              <div className="form-group register d-flex justify-content-start align-items-baseline gap-3 ms-5 mt-5">
                <button className="btn btn-success login" type="submit">
                  Login
                </button>
                <a className="" href="/registerfrm">
                  Register now ?
                </a>
              </div>
            </form>
            <div
              className="mt-3 ms-5
            "
            >
              <LoginFb />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// npm i --save @fortawesome/fontawesome-svg-core
// npm i --save @fortawesome/free-solid-svg-icons
// npm i --save @fortawesome/react-fontawesome
