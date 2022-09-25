import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="footer_top">
            <div className="row">
              <div className="col col_1">
                <div className="text">
                  <h1>GET HELP</h1>
                  <p>Home</p>
                  <p>Nike</p>
                  <p>Adidas</p>
                  <p>Contact</p>
                </div>
              </div>
              <div className="col col_2">
                <div className="text">
                  <h1>SUPPORT</h1>
                  <p>About</p>
                  <p>Contact</p>
                  <p>Help</p>
                  <p>Phone</p>
                </div>
              </div>
              <div className="col col_3">
                <div className="text">
                  <h1>REGISTER</h1>
                  <p>Register</p>
                  <p>Login</p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer_bot">
            <div></div>
            <p>
              © 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn Khải.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
