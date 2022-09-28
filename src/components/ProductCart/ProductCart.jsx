import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCart(props) {
  const { product } = props;
  const navigate = useNavigate();
  return (
    <div className="card">
      <div className="favorite-item">
        <i class="fa-solid fa-heart"></i>
      </div>
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <p className="text-top">{product.name}</p>
        <p className="text-bot">{product.shortDescription}</p>
        <div className="text-price">${product.price}</div>
      </div>
      <div className="text-center">
        <i
          className="icon fa-solid fa-cart-shopping icon"
          onClick={() => {
            navigate(`/detail/${product.id}/${product.name}`);
          }}
        />
      </div>
    </div>
  );
}
