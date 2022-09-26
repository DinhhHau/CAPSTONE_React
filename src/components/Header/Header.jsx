import React from "react";
import { DatePicker } from "antd";
import { Navigate, NavLink } from "react-router-dom";
import logo from "../../assets/img/image 3 .png";
import { useSelector } from "react-redux";
import { render } from "react-dom";
import _ from "lodash";

export default function Header() {
  const { userLogin } = useSelector((state) => state.userReducer);
  const { arrCart } = useSelector((state) => state.productReducer);
  const renderLoginNavItem = () => {
    if (userLogin == null) {
      return <NavLink to={`/login`}>Login</NavLink>;
    } else {
      return (
        <NavLink to={`/profile`}>
          <i className="las la-user " /> {userLogin.name}
        </NavLink>
      );
    }
  };
  // console.log(
  //   _.map(arrCart, (item) => ({
  //     name: item.name,
  //     quantityBuy: item.quantityBuy,
  //   }))
  // );
  const renderRegisterNavItem = () => {
    if (userLogin == null) {
      return <NavLink to={`/register`}>Register</NavLink>;
    } else {
      return <></>;
    }
  };
  return (
    <div
      className="container-fluid header d-flex justify-content-between align-items-baseline"
      style={{ background: "#000000", height: "5rem" }}
    >
      <NavLink
        to={`/`}
        className="header-logo"
        style={{ height: "3.2rem", lineHeight: "5rem" }}
      >
        <img src={logo} alt="logo" />
      </NavLink>
      <div className="header-content">
        <ul className="d-flex justify-content-around align-items-center">
          <li>
            <NavLink to={`/search`}>
              <i className="las la-search fs-3" />
            </NavLink>
          </li>
          <li>
            <NavLink to={`/cart`}>
              <span>
                <i className="las la-shopping-cart" />
              </span>
              <span>{arrCart?.length ? `(${arrCart.length})` : ""}</span>
            </NavLink>
          </li>
          <li>{renderLoginNavItem()}</li>
          <li>
            {/* <NavLink to={`/register`}>Register</NavLink> */}
            {renderRegisterNavItem()}
          </li>
        </ul>
      </div>
    </div>
  );
}
