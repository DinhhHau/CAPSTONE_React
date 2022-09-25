import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registeApi } from "../../redux/reducers/userReducer";
//
export default function Register(props) {
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
        email: Yup.string().required('Email không được bỏ trống !').email('email không đúng định dạng !'),
        password: Yup.string().required('Password không được bỏ trống !').min(6,'pass từ 6 - 32 ký tự !').max(32,'pass từ 6 - 32 ký tự !'),
        passwordConfirm: Yup.string().when("password", {
          is: val => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Cả hai mật khẩu cần phải giống nhau !!!"
          )
        }),
        name: Yup.string().matches(/[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,"Tên Không đúng định dạng !").required('Name không được bỏ trống !'),
        phone: Yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/,"Phone phải từ 03 05 07 08 09 và có 10 số!").required('Phone không được bỏ trống !'),
      }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(registeApi(values));
    },
  });

  return (
    <div className="register">
      <div className="container">
        <div className="title">
          <p>Register</p>
        </div>

        <form className="form" id="formRegister" onSubmit={frm.handleSubmit}>
        {/* <form className="form" id="formRegister" onSubmit={handleSubmit()}> */}
          <div className="reg-content">
            <div className="reg-left">
              <div className="material-form-field">
                <input
                  id="email"
                  placeholder="email@gmail.com"
                  required
                  name="email"
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                <label
                  className="material-form-field-label"
                  htmlFor="field-text"
                >
                  Email
                </label>
                {frm.errors.email && frm.touched.email ? <span className="text-danger">{frm.errors.email}</span> : ''}
              </div>
              <div className="material-form-field">
                <input
                  id="password"
                  required
                  name="password"
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                <label
                  className="material-form-field-label"
                  htmlFor="field-text"
                >
                  Password
                </label>
                {frm.errors.password && frm.touched.password ? <span className="text-danger">{frm.errors.password}</span> : ''}

              </div>
              <div className="material-form-field">
                <input
                  id="passwordConfirm"
                  required
                  name="passwordConfirm"
                  onChange={frm.handleChange}
                />
                <label
                  className="material-form-field-label"
                  htmlFor="field-text"
                >
                  Password Confirm
                </label>
                {frm.errors.passwordConfirm ? <span className="text-danger">{frm.errors.passwordConfirm}</span> : ''}

              </div>
            </div>
            <div className="reg-right">
              <div className="material-form-field">
                <input
                  id="name"
                  required
                  name="name"
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                <label
                  className="material-form-field-label"
                  htmlFor="field-text"
                >
                  Name
                </label>
                {frm.errors.name && frm.touched.name ? <span className="text-danger">{frm.errors.name}</span> : ''}

              </div>
              <div className="material-form-field">
                <input
                  id="phone"
                  required
                  name="phone"
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                <label
                  className="material-form-field-label"
                  htmlFor="field-text"
                >
                  Phone
                </label>
                {frm.errors.phone && frm.touched.phone ? <span className="text-danger">{frm.errors.phone}</span> : ''}

              </div>
              <div id="gender" className="gender">
                <span>Gender</span>
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
              <button id="submit" className="btn-submit" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
