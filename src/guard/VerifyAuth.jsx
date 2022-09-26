import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toastService from "../util/toast.service";
import { ACCESS_TOKEN, getStore } from "../util/tools";

const VerifyAuth = ({ children }) => {
  const isSignined = getStore(ACCESS_TOKEN);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignined) {
      toastService.showToast("warning", "Invalid token", "Please login !");
      navigate("/login");
    }
  }, [isSignined]);

  return <>{children}</>;
};

export default VerifyAuth;
