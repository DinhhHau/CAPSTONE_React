import { Input } from "antd";
import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
//lodash
import _ from "lodash";
import { Select } from "antd";
// import Select from "@mui/material/Select";
import { useEffect } from "react";
import { http } from "../../util/tools";
import ProductCart from "../../components/ProductCart/ProductCart";
//

export default function Search(props) {
  //
  let keywordRef = useRef("");
  let timeoutRef = useRef({});
  let [arrProduct, setArrProduct] = useState([]);
  //select
  const { Option } = Select;
  const getProductBySort = (value) => {
    let arrProductSort = _.sortBy(arrProduct, [(item) => item.price]);
    if (value === "descending") {
      arrProductSort = arrProductSort.reverse();
    }
    setArrProduct(arrProductSort);
  };
  //searchParam
  const [searchParam, setSearchParam] = useSearchParams();
  //
  const getProductByKeyWord = async () => {
    try {
      let keyword = searchParam.get("keyword");
      // let result = await http.get(`/product?keyword=${keyword}`);
      // console.log(result.data.content);
      // setArrProduct(result.data.content);
      if (keyword.trim() !== "" && keyword != null) {
        let result = await http.get(`/product?keyword=${keyword}`);
        console.log(result.data.content);
        setArrProduct(result.data.content);
        // clearTimeout(timeoutRef.current);
      } else {
        setArrProduct([]);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getProductByKeyWord();
  }, [keywordRef.current]);

  const handleChange = (e) => {
    keywordRef.current = e.target.value;
    // setSearchParam({ keyword: keywordRef.current });
    timeoutRef.current = setTimeout(() => {
      setSearchParam({ keyword: keywordRef.current });
    }, 1000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const renderSearchProduct = () => {
    return arrProduct.map((item, index) => {
      return (
        <div className="col-4 d-grid" key={index}>
          <ProductCart product={item} />
        </div>
      );
    });
  };

  return (
    <section className="search">
      <div className="search-input">
        <div className="container-fluid mx-3">
          <label className="m">Search</label>
          <form
            className=" form d-flex justify-content-start align-items-center "
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              placeholder="Product name..."
              onChange={handleChange}
            />
            <button className="search-btn">Search</button>
          </form>
        </div>
      </div>
      <h1 className="title">Search result</h1>
      <div className="sort-input me-1">
        {/* <Box sx={{ minWidth: 165 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortby}
              label="Sort by "
              onChange={handleChangemui}
              defaultValue=""
            >
              <MenuItem value="ascending">Price: Ascending</MenuItem>
              <MenuItem value="descending>">Price: descending</MenuItem>
            </Select>
          </FormControl>
        </Box> */}
        <div className="sort-input">
          <label>Sort by: </label>
          <Select
            defaultValue=""
            onChange={(e) => {
              getProductBySort(e);
            }}
          >
            <Option value="ascending">Price: Ascending</Option>
            <Option value="descending">Price: Descending</Option>
          </Select>
        </div>
      </div>
      <div className="cart">
        <div className="container-fluid d-flex justify-content-end">
          <div className="row">{renderSearchProduct()}</div>
        </div>
      </div>
    </section>
  );
}
