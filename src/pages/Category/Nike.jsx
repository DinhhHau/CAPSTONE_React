import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCart from "../../components/ProductCart/ProductCart";

export default function Nike() {
  const [dataCategory, setDataCategory] = useState([]);
  const getCategoryApi = async () => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Product/getProductByCategory?categoryId=NIKE",
        method: "GET",
      });
      // console.log(result.data.content);
      setDataCategory(result.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategoryApi();
  }, []);

  const renderProduct = () => {
    return dataCategory.map((item, index) => {
      return (
        <div className="col-4 mt-2" key={index}>
          <ProductCart product={item} />
        </div>
      );
    });
  };
  return (
    <>
      <div className="cart container-fluid mt-3">
        <div className="content text-white">
          <h1 className="mt-5 mb-3">Product Feature</h1>
        </div>
        <div className="row ">{renderProduct()}</div>
      </div>
    </>
  );
}
