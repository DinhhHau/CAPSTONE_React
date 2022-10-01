import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCart(props) {
  const { product } = props;
  const navigate = useNavigate();
  return (
    <figure className="card">
      <div className="favorite-item">
        <i className="fa-solid fa-heart" />
      </div>
      <img src={product.image} alt={product.name} />
      <figcaption className="card-body">
        {/* <p className="text-top">{product.name}</p>
        <p className="text-bot">{product.shortDescription}</p>
        <div className="text-price">${product.price}</div> */}
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <div className="price">
          <span>${product.price}</span>
        </div>
      </figcaption>
      {/* <div className="text-center">
        <i
          className="icon fa-solid fa-cart-shopping icon"
          onClick={() => {
            navigate(`/detail/${product.id}/${product.name}`);
          }}
        />
      </div> */}
      <a
        onClick={() => {
          navigate(`/detail/${product.id}/${product.name}`);
        }}
      >
        <i className="fa-solid fa-cart-shopping svg"></i>
      </a>
    </figure>
  );
}
