import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { history } from "../../index";
import toastService from "../../util/toast.service";
import {
  ACCESS_TOKEN,
  getStore,
  getStoreJson,
  http,
  setCookie,
  setStore,
  setStoreJson,
  USER_LOGIN,
} from "../../util/tools";
const initialState = {
  user: {
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phone: "",
    selector: "",
  },
  userLogin: getStoreJson(USER_LOGIN), // có thể null or obj
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getUserAction: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
    getProfileAction: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});

export const { getUserAction, getProfileAction } = userReducer.actions;

export default userReducer.reducer;

// register
export const registeApi = (user) => {
  return async (dispatch) => {
    try {
      user = { ...user, gender: user.selector === "male" ? true : false };
      const result = await http.post(`/Users/signup`, user);
      dispatch(getUserAction(result.data.message));
      //   window.location.reload();
      history.push("/login");
      // alert(result.data.message);
      toastService.showToast("success", "Successfully", result.data.message);
    } catch (err) {
      // alert(err.response?.data.message);
      toastService.showToast("error", "Failed", err.response?.data.message);
    }
  };
};
// login
export const loginApi = (userLogin) => {
  // email,pass
  return async (dispatch) => {
    try {
      const result = await http.post(`/Users/signin`, userLogin);
      // lưu vào localstorage or cookie
      console.log(result);
      setCookie(ACCESS_TOKEN, result.data.content.accessToken, 20);
      setStore(ACCESS_TOKEN, result.data.content.accessToken);
      // chuyển hướng trang
      history.push("/profile");
      //
      toastService.showToast(
        "success",
        "Successfully",
        "Logged in successfully !"
      );
      // sau khi đăng nhập thành công thì dispatch action getProfile
      dispatch(getProfileApi());
    } catch (err) {
      console.log(err);
      toastService.showToast(
        "error",
        "Login Failed ",
        "Please register for an Account !"
      );
      history.push("/login");
    }
  };
};
// profile
export const getProfileApi = (accessToken = getStore(ACCESS_TOKEN)) => {
  return async (dispatch) => {
    try {
      const result = await http.post(`/Users/getProfile`);
      // Lấy được thông tin profile => đưa lên redux
      dispatch(getProfileAction(result.data.content));
      // lưu và storage
      setStoreJson(USER_LOGIN, result.data.content);
    } catch (err) {
      console.log(err);
    }
  };
};
// // update Profile
// export const updateProfileApi = (userUpdate) => {
//   return async (dispatch) => {
//     try {
//       const result = await http.post(`/Users/updateProfile`, userUpdate);
//       // Lấy được thông tin profile => đưa lên redux
//       dispatch(getProfileAction(result.data.content));
//       // lưu và storage
//       setStoreJson(USER_LOGIN, result.data.content);
//       //
//       alert(` Cập nhật ${result.data.content}`);
//       // window.location.reload();
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };
