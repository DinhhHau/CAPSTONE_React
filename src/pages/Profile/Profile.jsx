import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getProfileApi } from "../../redux/reducers/userReducer";
// const eye = <FontAwesomeIcon icon={faEye} />;
import { useMutation } from "@tanstack/react-query";
import { v4 } from "uuid";
import userApiService from "../../api-services/user.api.service";
import toastService from "../../util/toast.service";

export default function Profile() {
  const { userLogin } = useSelector((state) => state.userReducer);
  const [updateKey, setUpdateKey] = useState("hello");
  const dispatch = useDispatch();

  const mUpdateProfile = useMutation(
    (newData) => userApiService.updateProfile(newData),
    {
      onSuccess: (res, vars) => {
        toastService.showToast("success", "Successfully", "Updated profile !");
        setUpdateKey(v4());
      },
      onError: (err) => {
        toastService.showToast(
          "error",
          "Error " + err?.status,
          err?.statusText
        );
      },
    }
  );

  useEffect(() => {
    // Khi trang vừa load lên thì gọi api => (dispatch lại getProfile api đã xây dựng)
    dispatch(getProfileApi());
  }, [updateKey]);

  useEffect(() => {
    console.log(userLogin);
    frmProfile.resetForm({
      values: { ...userLogin, password: ""},
    });
  }, [userLogin]);

  const frmProfile = useFormik({
    initialValues: {
      email: "",
      phone: "",
      name: "",
      password: "",
      gender: true,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email không được bỏ trống !")
        .email("Email không đúng định dạng !"),
      password: Yup.string()
        // .required("Password không được bỏ trống !")
        .min(6, "pass từ 6 - 32 ký tự !")
        .max(32, "pass từ 6 - 32 ký tự !"),
        // .nullable(true),
      name: Yup.string()
        .matches(
          /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
          "Tên Không đúng định dạng !"
        )
        .required("Name không được bỏ trống !"),
      phone: Yup.string()
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
          "Phone phải từ 03 05 07 08 09 và có 10 số!"
        )
        .required("Phone không được bỏ trống !"),
    }),
    onSubmit: (values) => {
      mUpdateProfile.mutateAsync(values);
    },
  });
  return (
    <div className="container-fluid-profile">
      <div className="title">
        <h3>Profile</h3>
      </div>
      <div className="profile-mid d-flex">
        <img src={userLogin?.avatar} alt="" className="img" />
        <div className="information">
          <form className="form" onSubmit={frmProfile.handleSubmit}>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label
                    className="material-form-field-label mt-4"
                    htmlFor="field-text"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    value={frmProfile.values.email}
                    onChange={frmProfile.handleChange}
                    onBlur={frmProfile.handleBlur}
                    disabled
                  />
                  {frmProfile.errors.email && frmProfile.touched.email ? (
                    <span className="text-danger mt-3">
                      {frmProfile.errors.email}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label
                    className="material-form-field-label mt-4"
                    htmlFor="field-text"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    className="form-control"
                    value={frmProfile.values.phone}
                    onChange={frmProfile.handleChange}
                    onBlur={frmProfile.handleBlur}
                  />
                  {frmProfile.errors.phone && frmProfile.touched.phone ? (
                    <span className="text-danger mt-3">
                      {frmProfile.errors.phone}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label
                    className="material-form-field-label mt-4"
                    htmlFor="field-text"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    value={frmProfile.values.name}
                    onChange={frmProfile.handleChange}
                    onBlur={frmProfile.handleBlur}
                  />
                  {frmProfile.errors.name && frmProfile.touched.name ? (
                    <span className="text-danger mt-3">
                      {frmProfile.errors.name}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label
                    className="material-form-field-label mt-4"
                    htmlFor="field-text"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="text"
                    className="form-control"
                    value={frmProfile.values.password}
                    onChange={frmProfile.handleChange}
                    onBlur={frmProfile.handleBlur}
                  />
                  {frmProfile.errors.password && frmProfile.touched.password ? (
                    <span className="text-danger mt-3">
                      {frmProfile.errors.password}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="form-group d-flex flex-column justify-content-end align-items-end">
                <div id="gender" className="gender">
                  <span>Gender</span>
                  <div className="radio gender_inp">
                    <input
                      id="male"
                      type="radio"
                      name="gender"
                      value={true}
                      checked={frmProfile.values.gender}
                      onChange={(e) => {
                        frmProfile.setFieldValue("gender", true);
                      }}
                    />
                    <label className="radio-label" htmlFor="male">
                      Male
                    </label>
                    <input
                      id="female"
                      type="radio"
                      name="gender"
                      value={false}
                      checked={!frmProfile.values.gender}
                      onChange={(e) => {
                        frmProfile.setFieldValue("gender", false);
                      }}
                    />
                    <label className="radio-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>

                <button
                  id="submit"
                  className="btn-submit"
                  type="submit"
                  disabled={mUpdateProfile.isLoading}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="table">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link mx-1 active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              style={{
                width: 277,
                height: 62,
                border: " 1px solid #DEDDDC",
                color: "#dd2aed",
              }}
            >
              Order history
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              style={{
                width: 277,
                height: 62,
                border: " 1px solid #DEDDDC",
                color: "black",
              }}
            >
              Favourite
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            {userLogin?.ordersHistory?.map((orderItem, index) => {
              return (
                <div key={index}>
                  <p
                    style={{
                      textAlign: "left",
                      color: "#CD0DC3",
                      marginBottom: 0,
                    }}
                  >
                    {orderItem.date}
                  </p>
                  <table className="table" style={{ borderTop: "1px solid" }}>
                    <thead
                      className="thead"
                      style={{ backgroundColor: "#D9D9D9" }}
                    >
                      <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody className="tbody">
                      {orderItem.orderDetail?.map((item, index) => {
                        return (
                          <tr key={index} style={{ borderBottom: "1px solid" }}>
                            <td>{orderItem.id}</td>
                            <td>
                              <img
                                src={item.image}
                                width={50}
                                height={50}
                                alt="..."
                                style={{ objectFit: "cover" }}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>
                              {(item.price * item.quantity).toLocaleString()} $
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
          {/* <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            ...
          </div> */}
        </div>
      </div>
    </div>
  );
}
