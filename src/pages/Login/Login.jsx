import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginApi } from "../../redux/reducers/userReducer";
import toastService from "../../util/toast.service";

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
        .min(1, "pass từ 6 - 32 ký tự !")
        .max(32, "pass từ 6 - 32 ký tự !"),
      // .matches(/cybersoft/, 'password không đúng đinh dạng !')
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginApi(values));
    },
  });
  return (
    <form className="form-login" onSubmit={frm.handleSubmit}>
      <div className="title my-5">
        <h3>Login</h3>
      </div>
      <div className="mid">
        <div className="form-group">
          <p>Email</p>
          <input
            className="form-control mb-1"
            id="email"
            name="email"
            placeholder="email"
            onChange={frm.handleChange}
            onBlur={frm.handleBlur}
          />
          {frm.errors.email && frm.touched.email ? (
            <span className="text-danger">{frm.errors.email}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <p>Password</p>
          <div className="show-pass" style={{ position: "relative" }}>
            <input
              type={passwordShow ? "text" : "password"}
              className="form-control mb-1"
              id="password"
              name="password"
              placeholder="password"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            <button
              type="button"
              className="show"
              style={{
                position: "absolute",
                top: 8.5,
                right: 10,
                border: "none",
                opacity: "0.5",
              }}
              onClick={togglePassword}
            >
              <i>{eye}</i>
            </button>
          </div>
          {frm.errors.password && frm.touched.password ? (
            <span className="text-danger">{frm.errors.password}</span>
          ) : (
            ""
          )}
        </div>
        <div className="form-group register d-flex">
          <NavLink to={`/register`}>Register now ?</NavLink>
          <button className="btn btn-success" type="submit">
            Login
          </button>
        </div>
        <div className="fb-connect"></div>
      </div>
    </form>
  );
}

// npm i --save @fortawesome/fontawesome-svg-core
// npm i --save @fortawesome/free-solid-svg-icons
// npm i --save @fortawesome/react-fontawesome
