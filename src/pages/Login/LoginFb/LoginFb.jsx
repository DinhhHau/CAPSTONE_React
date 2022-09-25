import React from "react";
import FacebookLogin from "react-facebook-login";

export default function LoginFb() {
  const responseFacebook = (response) => {
    console.log(response);
  };
  return (
    <div>
      <FacebookLogin
        appId="1225213111592360"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
}
