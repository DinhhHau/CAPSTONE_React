import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { http } from "../../util/tools";

const initialState = {
  arrProduct: [],
  productDetail: {
    quantityBuy: 1,
  },
  arrCart: [],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getProductAction: (state, action) => {
      const arrProduct = action.payload;
      state.arrProduct = arrProduct;
    },
    getProductDetailAction: (state, action) => {
      const productDetail = action.payload;
      state.productDetail = { ...productDetail, quantityBuy: 1 };
    },
    changeQuantityBuy: (state, action) => {
      const quantityBuy = state.productDetail.quantityBuy;
      if (action.payload) {
        state.productDetail.quantityBuy = quantityBuy + 1;
      } else {
        if (quantityBuy > 1) {
          state.productDetail.quantityBuy = quantityBuy - 1;
        }
      }
    },
    addCart: (state, action) => {
      const newProduct = action.payload;
      let index = state.arrCart.findIndex((sp) => sp.id === newProduct.id);
      if (index < 0) {
        state.arrCart.push(newProduct);
      } else {
        state.arrCart[index].quantityBuy =
          state.arrCart[index].quantityBuy + newProduct.quantityBuy;
      }
    },
  },
});

export const {
  getProductAction,
  getProductDetailAction,
  changeQuantityBuy,
  addCart,
} = productReducer.actions;

export default productReducer.reducer;

// -------------------------- call api ----------------------------//
export const getProductApi = () => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
      });
      // const result = await http.get("/product");
      dispatch(getProductAction(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getDetailApi = (id) => {
  return async (disptach) => {
    try {
      const result = await http.get(`/Product/getbyid?id=${id}`);
      disptach(getProductDetailAction(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};
