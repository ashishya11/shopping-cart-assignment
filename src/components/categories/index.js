import React, { Fragment, useEffect, useState } from "react";

import Button from "../common/button";
import FetchData from "../common/fetch-data";
import Image from "../common/image";

import "./index.scss";

const Banner = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    FetchData("http://localhost:5000/categories/")
      .then((res) => {
        const categoryList = res
          .sort((a, b) => a.order - b.order)
          .filter((value) => {
            return value.order !== -1;
          });
        setCategories(categoryList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCategory = (e) => {debugger};

  return (
    <Fragment>
      {categories &&
        categories.length > 0 &&
        categories.map((category, i) => (
          <div
            key={category.id}
            className="category_container"
            style={{ flexDirection: i % 2 === 0 ? "row" : "row-reverse" }}
          >
            <div className="category-img">
              <Image
                src_2x={category.imageUrl}
                src={category.imageUrl}
                alt={category.name}
                imgClassName={"category"}
              />
            </div>
            <div className="category_description">
              <h4 className="title-xl">{category.name}</h4>
              <p className="title">{category.description}</p>
              <Button
                variant="primary"
                onClick={handleCategory}
                id={category.id}
              >{`Explore ${category.name}`}</Button>
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default Banner;