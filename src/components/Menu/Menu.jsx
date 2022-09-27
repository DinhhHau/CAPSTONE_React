import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <div className="nav-item">
                <NavLink
                  to={`/`}
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </NavLink>
              </div>
              <div className="nav-item">
                <a className="nav-link" href="#">
                  Men
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link" href="#">
                  Woman
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link" href="#">
                  Kid
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link" href="#">
                  Sport
                </a>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
