"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ProductImages = ({ product }) => {
  const settings = {
    customPaging: function (i) {
      const img = product?.productImages[i];

      return (
        <a>
          <img src={img} />
        </a>
      );
    },
    dots: true,
    dotsClass:
      "slick-dots slick-thumb static! *:size-20! *:rounded-box! *:overflow-hidden! [&_.slick-active]:border-main! [&_.slick-active]:border-2! [&_.slick-active]:rounded-box! [&_.slick-active]:overflow-hidden!",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="slider-container max-lg:max-w-dvw">
      <Slider {...settings}>
        {product?.productImages?.map((image, i) => (
          <div key={i}>
            <img src={image} className="rounded-box w-full" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductImages;
