import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// set redux
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";
import "./assets/scss/styles.scss";
import VerifyAuth from "./guard/VerifyAuth";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import { persister, store } from "./redux/configStroe";
import { PersistGate } from "redux-persist/integration/react";
import Carts from "./pages/Carts/Carts";
import LoginFb from "./pages/Login/LoginFb/LoginFb";
import Search from "./pages/Search/Search";
import RegisterForm from "./pages/Register/RegisterForm";

// Cấu hình history (chuyển hướng không cần hook navigate )
export const history = createBrowserHistory({ window });

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <QueryClientProvider client={queryClient}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="" element={<App />}>
              <Route path="login" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>
              <Route path="registerfrm" element={<RegisterForm />}></Route>

              <Route index element={<Home />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/loginfb" element={<LoginFb />}></Route>
              <Route path="/search" element={<Search />}></Route>

              <Route path="detail">
                <Route path=":id/:name" element={<Detail />}></Route>
              </Route>
            </Route>
            <Route
              path=""
              element={
                <VerifyAuth>
                  <App />
                </VerifyAuth>
              }
            >
              <Route path="profile" element={<Profile />}></Route>
              <Route path="cart" element={<Carts />}></Route>
            </Route>
          </Routes>
        </HistoryRouter>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
