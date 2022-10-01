import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <div className="category">
      <ul className="d-flex menu">
        <li className="mx-2 fs-5">
          <NavLink to={`/home`}>Home</NavLink>
        </li>
        <li className="mx-2 fs-5">
          <NavLink to="/nike">Nike</NavLink>
        </li>
        <li className="mx-2 fs-5">
          <NavLink to="/adidas">Adidas</NavLink>
        </li>
        <li className="mx-2 fs-5">
          <NavLink to="/converse">Converse and Vans</NavLink>
        </li>
      </ul>
    </div>
  );
}
