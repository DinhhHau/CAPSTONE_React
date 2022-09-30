import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { getProductApi } from "../../redux/reducers/productReducer";
import { useEffect } from "react";
import ProductCart from "../../components/ProductCart/ProductCart";

export default function Home() {
  const { arrProduct } = useSelector((state) => state.productReducer);
  // console.log(arrProduct)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllProductApi = () => {
    const actionThunk = getProductApi();
    dispatch(actionThunk);
  };

  useEffect(() => {
    getAllProductApi();
  }, []);

  const renderProduct = () => {
    return arrProduct.map((item, index) => {
      return (
        <div className="col-4 mt-2" key={index}>
          <ProductCart product={item} />
        </div>
      );
    });
  };

  const renderCarousel = () => {
    return arrProduct.map((item, index) => {
      return (
        <div className={`carousel-item ${index === 0 && `active`}`} key={index}>
          {/* <div className={`carousel-item ${index === 0 ? `active` : ''}`} key={index}> */}
          <div className="container-fluid d-flex align-items-center">
            <div className="items-left">
              <img src={item.image} alt="" />
            </div>
            <div className="items-right">
              <h2>{item.name}</h2>
              <h4>{item.shortDescription}</h4>
              <button
                className="btn btn-warning"
                onClick={() => {
                  navigate(`/detail/${item.id}/${item.name}`);
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="carousel">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">{renderCarousel()}</div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/*  */}
      <div className="cart container-fluid mt-3">
        <div className="content text-white">
          <h1>Product Feature</h1>
        </div>
        <div className="row ">{renderProduct()}</div>
      </div>
    </div>
  );
}
