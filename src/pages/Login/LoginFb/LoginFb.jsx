import axios from "axios";
import React from "react";
import FacebookLogin from "react-facebook-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { history } from "../../../index";
import { getProfileApi } from "../../../redux/reducers/userReducer";
import toastService from "../../../util/toast.service";
import { ACCESS_TOKEN, setStore } from "../../../util/tools";

export default function LoginFb() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseFacebook = (response) => {
    axios({
      url: "https://shop.cyberlearn.vn/api/Users/facebooklogin",
      method: "POST",
      data: {
        facebookToken: response.accessToken,
      },
    }).then((res) => {
      // Move to home after logging in successfully
      history.push("/home");
      // Lưu vào localstorage
      //   localStorage.setItem("accessToken", res.data.content.accessToken);
      setStore(ACCESS_TOKEN, res.data.content.accessToken);
      // Dispatch action getProfile after logging in successfully
      dispatch(getProfileApi());
    });
  };
  return (
    <div className="facebook text-white">
      <FacebookLogin
        appId="1225213111592360"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        onClick={() => {
          navigate(`/profile`);
          toastService.showToast(
            "success",
            "Successfully",
            "Logged in successfully !"
          );
        }}
        icon="lab la-facebook"
        textButton="Continue with Facebook"
      />
    </div>
  );
}

// "start": "export HTTPS=true&&PORT=3000 react-scripts start",            // mac
// "start": "set HTTPS=true&&react-scripts start"                          // win
// "start": "set HTTPS=true&& set PORT=3000  react-scripts start"          // mac or win
