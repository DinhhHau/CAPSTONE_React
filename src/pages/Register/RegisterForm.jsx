import React from "react";
import singup from "../../assets/img/signup-image.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registeApi } from "../../redux/reducers/userReducer";
import { NavLink } from "react-router-dom";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const frm = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      phone: "",
      selector: "male",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required(" *** Email không được bỏ trống ***")
        .email("*** Email không đúng định dạng ***"),
      password: Yup.string()
        .required(" *** Password không được bỏ trống ***")
        .min(6, "*** Password từ 6 - 32 ký tự ***")
        .max(32, "pass từ 6 - 32 ký tự !"),
      // passwordConfirm: Yup.string().when("password", {
      //   is: val => (val && val.length > 0 ? true : false),
      //   then: Yup.string().oneOf(
      //     [Yup.ref("password")],
      //     "Cả hai mật khẩu cần phải giống nhau !!!"
      //   )
      // }),
      passwordConfirm: Yup.string()
        .required(" *** PasswordConfirm không được bỏ trống ***")
        .oneOf([Yup.ref("password")], " *** Password phải trùng nhau ***"),
      name: Yup.string()
        .matches(
          /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
          "*** Name Không đúng định dạng ***"
        )
        .required("*** Name không được bỏ trống ***"),
      phone: Yup.string()
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
          " *** Phone phải từ 03 05 07 08 09 và có 10 số ***"
        )
        .required("*** Phone không được bỏ trống ***"),
    }),
    onSubmit: (values) => {
      console.log(values);

      dispatch(registeApi(values));
    },
  });
  return (
    <div className="main-form">
      {/* Sign up form */}
      <section className="signup" id="register">
        <div className="container_form">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">REGISTER</h2>
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
                      id="name"
                      name="name"
                      required
                      placeholder="Your Name"
                      onChange={frm.handleChange}
                      onBlur={frm.handleBlur}
                    />
                    <div className="text-danger position-absolute mt-1">
                      {frm.errors.name && frm.touched.name ? (
                        <span className="text-danger">{frm.errors.name}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-envelope fa-lg me-3 fa-fw" />
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
                  <div className="form-outline flex-fill mb-0">
                    <input
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
                        <span className="text-danger">
                          {frm.errors.password}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-key fa-lg me-3 fa-fw" />
                  <div className="form-outline flex-fill mb-0">
                    <input
                      className="form-control"
                      id="passwordConfirm"
                      name="passwordConfirm"
                      required
                      placeholder="Repeat your password"
                      onChange={frm.handleChange}
                      onBlur={frm.handleBlur}
                    />
                    <div className="text-danger position-absolute mt-1">
                      {frm.errors.passwordConfirm &&
                      frm.touched.passwordConfirm ? (
                        <span className="text-danger">
                          {frm.errors.passwordConfirm}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-phone fa-lg me-3 fa-fw" />
                  <div className="form-outline flex-fill mb-0">
                    <input
                      className="form-control"
                      id="phone"
                      name="phone"
                      required
                      placeholder="Your Phone"
                      onChange={frm.handleChange}
                      onBlur={frm.handleBlur}
                    />
                    <div className="text-danger position-absolute mt-1">
                      {frm.errors.phone && frm.touched.phone ? (
                        <span className="text-danger">{frm.errors.phone}</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div id="gender" className="gender">
                  {/* <span>Gender</span> */}
                  <i className="fas fa-venus-mars fa-lg me-3 fa-fw" />
                  <div className="radio gender_inp">
                    <input
                      id="male"
                      type="radio"
                      name="selector"
                      defaultValue="male"
                      defaultChecked
                      onChange={frm.handleChange}
                    />
                    <label className="radio-label" htmlFor="male">
                      Male
                    </label>
                    <input
                      id="female"
                      type="radio"
                      name="selector"
                      defaultValue="female"
                      onChange={frm.handleChange}
                    />
                    <label className="radio-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
                <div className="form-group mt-2-frm">
                  <input
                    type="checkbox"
                    name="agree-term"
                    id="agree-term"
                    className="agree-term"
                  />
                  <label htmlFor="agree-term" className="label-agree-term">
                    <span>
                      <span />
                    </span>
                    I agree all statements in{" "}
                    <a href="#" className="term-service">
                      Terms of service
                    </a>
                  </label>
                </div>
                <div className="form-group form-button">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src={singup} />
              </figure>
              <NavLink to="/login" className="signup-image-link">
                I am already member
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
