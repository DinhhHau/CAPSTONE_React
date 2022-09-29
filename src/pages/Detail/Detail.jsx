import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ProductCart from "../../components/ProductCart/ProductCart";
import {
  addCart,
  changeQuantityBuy,
  getDetailApi,
} from "../../redux/reducers/productReducer";
import toastService from "../../util/toast.service";

export default function Detail() {
  const { productDetail, quantityBuy, arrCart } = useSelector(
    (state) => state.productReducer
  );
  console.log("productDetail", productDetail);
  const disptach = useDispatch();
  const param = useParams();

  const getAllProductDetailApi = () => {
    let { id } = param;
    const action = getDetailApi(id);
    disptach(action);
  };

  useEffect(() => {
    getAllProductDetailApi();
  }, [param.id]);

  return (
    <div className="detail">
      <div className="container-fluid">
        <div className="main-detail">
          <img
            className="img"
            id="prod-img"
            src={productDetail.image}
            alt="..."
          />
          <div className="product-info">
            <h3 id="prod-name" className="produc-name">
              {productDetail.name}
            </h3>
            <span id="prod-desc" className="description">
              {productDetail.description}
            </span>
            <p className="fs-1 text-success mt-5">Available Size</p>
            <div id="prod-size" className="size">
              {productDetail.size?.map((size, index) => {
                return (
                  <button
                    key={index}
                    className="btn btn-secondary fs-3 text-white"
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            <div id="prod-price" className="price">
              Price: {productDetail.price}$
            </div>
            <div className="amount">
              <button
                id="down"
                className="plus btn btn-secondary"
                // disabled={quantity === 1}
                onClick={() => {
                  disptach(changeQuantityBuy(false));
                }}
              >
                -
              </button>
              <p id="number">{productDetail.quantityBuy}</p>
              <button
                id="up"
                className="minus btn btn-secondary"
                onClick={() => {
                  disptach(changeQuantityBuy(true));
                }}
              >
                +
              </button>
            </div>
            <button
              className="add-cart mt-3"
              onClick={() => {
                toastService.showToast(
                  "success",
                  "Successfully",
                  "Add to cart successfully!"
                );
                disptach(addCart(productDetail));
              }}
            >
              <a href="#">Add to cart</a>
            </button>
          </div>
        </div>
        <div className="relateproduct cart ">
          <h4>- Related Product -</h4>
          <div className="row">
            {productDetail.relatedProducts?.map((item, index) => {
              return (
                <div className="col-4" key={index}>
                  <ProductCart product={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
