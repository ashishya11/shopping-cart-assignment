import React, { useState, useEffect } from "react";

import "./index.scss";

import Arrow from "../common/arrow";
import Image from "../common/image";
import FetchData from "../common/fetch-data";

const Carousel = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [activeCarouselData, setActiveCarouselData] = useState({});

  useEffect(() => {
    FetchData("http://localhost:5000/banners/")
      .then((res) => {
        setCarouselData(res);
        setActiveCarouselData(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const previousSlide = () => {
    const lastIndex = carouselData.length - 1;
    const indexValue = carouselData.findIndex(
      (singleData) => singleData.id === activeCarouselData.id
    );
    const shouldResetIndex = indexValue === 0;
    const index = shouldResetIndex ? lastIndex : indexValue - 1;
    setActiveCarouselData(carouselData[index]);
  };

  const nextSlide = () => {
    const lastIndex = carouselData.length - 1;
    const indexValue = carouselData.findIndex(
      (singleData) => singleData.id === activeCarouselData.id
    );
    const shouldResetIndex = indexValue === lastIndex;
    const index = shouldResetIndex ? 0 : indexValue + 1;
    setActiveCarouselData(carouselData[index]);
  };

  const Slide = (data) => {
    if (Object.keys(data).length) {
      const bannerImageProps = {
        src_2x: data.bannerImageUrl,
        src: data.bannerImageUrl,
        alt: data.bannerImageAlt,
        imgClassName: "banner",
      };
      return <Image {...bannerImageProps} />;
    } else {
      return null;
    }
  };

  return (
    <div className="carousel">
      <Arrow direction="left" clickFunction={previousSlide} glyph="prev" />
      <Slide {...activeCarouselData} />
      <Arrow direction="right" clickFunction={nextSlide} glyph="next" />
    </div>
  );
};

export default Carousel;