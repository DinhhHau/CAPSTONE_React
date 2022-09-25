import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { addCart, changeQuantityBuy, getDetailApi } from "../../redux/reducers/productReducer";

export default function Detail() {
  const { productDetail , quantityBuy, arrCart } = useSelector((state) => state.productReducer);
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
        <div className="main">
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
                  disptach(changeQuantityBuy(false))
                }}
              >
                -
              </button>
              <p id="number">{productDetail.quantityBuy}</p>
              <button
                id="up"
                className="minus btn btn-secondary"
                onClick={() => {
                  disptach(changeQuantityBuy(true))
                }}
              >
                +
              </button>
            </div>
            <button className="add-cart" onClick={()=>{
              disptach(addCart(productDetail))

            }}>
              <a href="#">Add to cart</a>
            </button>
          </div>
        </div>
        <div className="relateproduct cart container-fluid">
          <h4>- Related Product -</h4>
          <div className="row conatiner">
            {productDetail.relatedProducts?.map((item, index) => {
              return (
                <div className="col-3" key={index}>
                  <div className="card">
                    <img src={item.image} alt={item.name} />
                    <div className="card-body">
                      <p className="text-top">{item.name}</p>
                      <p className="text-bot">{item.shortDescription}</p>
                    </div>
                    <div className="d-flex">
                      <NavLink
                        className="btn-buy w-50"
                        to={`/detail/${item.id}/${item.name}`}
                      >
                        <i className="fa-solid fa-cart-shopping icon" />
                      </NavLink>
                      {/* <button
                      className="btn-buy w-50"
                      onClick={() => {
                        navigate(`/detail/${item.id}/${item.name}`);
                      }}
                    >
                      <i className="fa-solid fa-cart-shopping icon" />
                    </button> */}
                      <button className="btn-price w-50">{item.price}$</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
