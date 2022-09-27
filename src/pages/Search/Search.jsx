import { Input } from "antd";
import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
//
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
  const [sortby, setSortby] = React.useState("");
  const handleChangemui = (event) => {
    setSortby(event.target.value);
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
        <div className="col-3  mt-2" key={index}>
          <ProductCart product={item} />
        </div>
      );
    });
  };

  return (
    <section className="search">
      <div className="search-input">
        <div className="container-fluid">
          <label className="m">Search</label>
          <form
            className=" form d-flex justify-content-start "
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
        <Box sx={{ minWidth: 165 }}>
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
        </Box>
      </div>
      <div className="search-result">
        <div className="container-fluid d-flex justify-content-end">
          <div className="result">
            <div className="row">{renderSearchProduct()}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
