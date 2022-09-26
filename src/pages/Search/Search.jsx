import { Input } from "antd";
import React from "react";

export default function Search() {
  return (
    <section className="search">
      <div className="search-input">
        <div className="container">
          <label>Search</label>
          <form
            className="d-flex justify-content-start"
            // onSubmit={handleSubmit}
          >
            <Input
              type="text"
              placeholder="Product name..."
              //   onChange={handleChange}
            />
            <button className="search-btn">Search</button>
          </form>
        </div>
      </div>

      <h1 className="title">Search result</h1>

      <div className="search-result">
        <div className="container">
          <div className="sort-input">
            <label>Sort by: </label>
            {/* select */}
          </div>
          <div className="result">
            <div className="row"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
