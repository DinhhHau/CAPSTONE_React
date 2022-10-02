import { Select } from "antd";
import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import ProductCart from "../../components/ProductCart/ProductCart";

export default function Nike() {
  const [dataCategory, setDataCategory] = useState([]);
  //select
  const { Option } = Select;
  const getProductBySort = (value) => {
    let arrProductSort = _.sortBy(dataCategory, [(item) => item.price]);
    if (value === "descending") {
      arrProductSort = arrProductSort.reverse();
    }
    setDataCategory(arrProductSort);
  };
  //
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
        <div className="col-4 d-grid" key={index}>
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
        <div className="sort-input">
          <label className="mx-2">Sort by: </label>
          <Select
            defaultValue=""
            onChange={(e) => {
              getProductBySort(e);
            }}
            style={{ width: 170 }}
          >
            <Option value="ascending">Price: Ascending</Option>
            <Option value="descending">Price: Descending</Option>
          </Select>
        </div>
        <div className="row ">{renderProduct()}</div>
      </div>
    </>
  );
}
