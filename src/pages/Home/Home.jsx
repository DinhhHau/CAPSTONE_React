import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { getProductApi } from "../../redux/reducers/productReducer";
import { useEffect } from "react";

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
        <div className="col-3 mt-2" key={index}>
          <div className="card">
            <img src={item.image} alt={item.name} />
            <div className="card-body">
              <p className="text-top">{item.name}</p>
              <p className="text-bot">{item.shortDescription}</p>
            </div>
            <div className="d-flex">
              {/* <NavLink className="btn-buy w-50" to={`/detail/${item.id}/${item.name}`}>
                <i className="fa-solid fa-cart-shopping icon" />
              </NavLink> */}
              <button
                className="btn-buy w-50"
                onClick={() => {
                  navigate(`/detail/${item.id}/${item.name}`);
                }}
              >
                <i className="fa-solid fa-cart-shopping icon" />
              </button>
              <button className="btn-price w-50">{item.price}$</button>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderCarousel = () => {
    return arrProduct.map((item, index) => {
      return (
        <div className={`carousel-item ${index === 0 && `active`}`} key={index}>
          {/* <div className={`carousel-item ${index === 0 ? `active` : ''}`} key={index}> */}
          <div className="container d-flex align-items-center">
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
    <div className="conatiner-fluid">
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
      <div className="cart container-fluid mt-5">
        <div className="content text-white">
          <h1>Product Feature</h1>
        </div>
        <div className="row ">{renderProduct()}</div>
      </div>
    </div>
  );
}
