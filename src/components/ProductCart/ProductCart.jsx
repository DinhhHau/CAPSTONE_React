import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCart(props) {
  const { product } = props;
  const navigate = useNavigate();
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <p className="text-top">{product.name}</p>
        <p className="text-bot">{product.shortDescription}</p>
      </div>
      <div className="d-flex">
        {/* <NavLink className="btn-buy w-50" to={`/detail/${item.id}/${item.name}`}>
                <i className="fa-solid fa-cart-shopping icon" />
              </NavLink> */}
        <button
          className="btn-buy w-50"
          onClick={() => {
            navigate(`/detail/${product.id}/${product.name}`);
          }}
        >
          <i className="fa-solid fa-cart-shopping icon" />
        </button>
        <button className="btn-price w-50">{product.price}$</button>
      </div>
    </div>
  );
}
