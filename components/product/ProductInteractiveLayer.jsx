"use client";

import { useState, useMemo, useContext } from "react";
import ProductImages from "./ProductImages";
import { FaStar } from "react-icons/fa6";
import TrustBadges from "./TrustBadges";
import { MyContext } from "@/context/MyProvider";
import { toast } from "react-toastify";

const ProductInteractiveLayer = ({ product }) => {
  // 1. Initial State Definition (Prothom variant row default hit korbe)
  const [selectedColor, setSelectedColor] = useState(
    product?.variantDetails?.[0]?.color || "",
  );

  // Active color variants er filtering optimization memoize kora holo
  const activeVariant = useMemo(() => {
    return product?.variantDetails?.find((v) => v.color === selectedColor);
  }, [product, selectedColor]);

  // Active color based context standard sizes setup schema tracking filter
  const [selectedSize, setSelectedSize] = useState(
    activeVariant?.sizes?.[0]?.size || "",
  );

  // Active size node tracking er madhhome deterministic individual item stock extract
  const activeSizeDetail = useMemo(() => {
    return activeVariant?.sizes?.find((s) => s.size === selectedSize);
  }, [activeVariant, selectedSize]);

  const [quantity, setQuantity] = useState(1);
  const currentStock = activeSizeDetail ? activeSizeDetail.stock : 0;

  // Quantity count controller with logical guards
  const handleQtyChange = (val) => {
    if (val < 1) setQuantity(1);
    else if (val > currentStock) setQuantity(currentStock);
    else setQuantity(val);
  };

  // add to cart
  const { addToCart } = useContext(MyContext);

  const handleAddToCart = () => {
    if (!activeVariant) {
      toast.error("Please select a color");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (quantity > currentStock) {
      toast.error("Out of stock");
      return;
    }
    const result = addToCart(product, activeVariant, selectedSize, quantity);
    if (result) {
      toast.success("Added to cart");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full mt-6">
      {/* LEFT BLOCK: Dynamic React Image Sliders Node */}
      <div className="lg:col-span-5 w-full">
        <ProductImages product={product} selectedColor={selectedColor} />
      </div>

      {/* RIGHT BLOCK: Dynamic Interactive Control Panel */}
      <div className="lg:col-span-7">
        <div className="badge badge-success badge-soft mb-3">
          <FaStar /> Best Seller
        </div>
        <h1 className="font-bold text-2xl lg:text-4xl">
          {product?.productName}
        </h1>
        {/* PRICE DISPLAY BLOCK (Dynamic Discount Check) */}
        <div className="">
          {product?.discount ? (
            <div className="flex items-baseline gap-3">
              <span className="font-bold text-2xl lg:text-3xl text-main">
                <span className="font-hind-siliguri">৳</span>
                {product?.discount}
              </span>
              <span className="line-through text-sm opacity-50">
                <span className="font-hind-siliguri">৳</span>
                {product?.price}
              </span>
            </div>
          ) : (
            <span className="font-bold text-2xl lg:text-3xl text-main">
              <span className="font-hind-siliguri">৳</span>
              {product?.price}
            </span>
          )}
        </div>

        <div className="bg-base-200 p-6 rounded-box shadow-xs h-fit my-5">
          {/* 1. COLOR VARIANT SELECTOR */}
          <div>
            <h3 className="font-bold text-sm flex items-center gap-1">
              Color:{" "}
              <span className="text-neutral-400 font-normal">
                {selectedColor}
              </span>
            </h3>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {product?.variantDetails?.map((variant) => (
                <button
                  key={variant.color}
                  onClick={() => {
                    setSelectedColor(variant.color);
                    setSelectedSize(variant?.sizes?.[0]?.size || "");
                    setQuantity(1);
                  }}
                  className="cursor-pointer"
                >
                  <div
                    className={`size-12 rounded-lg overflow-hidden border ${selectedColor === variant.color ? "border-main" : "border-base-300"}`}
                  >
                    <img
                      src={variant?.swatchImage}
                      alt={variant.color}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. SIZE SELECTOR WITH STOCK CHECKS */}
          <div className="my-4">
            <h3 className="font-bold text-sm">
              Size:{" "}
              <span className="text-neutral-400 font-normal">
                {selectedSize}
              </span>
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {activeVariant?.sizes?.map((item) => {
                const isOutOfStock = item.stock === 0;
                return (
                  <button
                    key={item.size}
                    disabled={isOutOfStock}
                    onClick={() => {
                      setSelectedSize(item.size);
                      setQuantity(1);
                    }}
                    className={`btn btn-sm btn-square rounded-box transition-all ${
                      isOutOfStock
                        ? ""
                        : selectedSize === item.size
                          ? "btn-main"
                          : "btn-outline"
                    }`}
                  >
                    {item.size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. STOCK & QUANTITY CONTROLS */}
          <div className="my-4 pt-2 border-t border-base-300">
            <p className="text-sm">
              Availability:{" "}
              {currentStock > 0 ? (
                <span className="badge badge-success badge-sm font-bold text-white">
                  {currentStock} Items In Stock
                </span>
              ) : (
                <span className="badge badge-error badge-sm font-bold text-white">
                  Out of Stock
                </span>
              )}
            </p>

            {currentStock > 0 && (
              <div className="my-4 flex items-center gap-3">
                <span className="text-sm font-bold">Quantity:</span>
                <div className="join border border-base-300 rounded-box bg-base-100">
                  <button
                    onClick={() => handleQtyChange(quantity - 1)}
                    className="btn btn-sm btn-ghost join-item"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 flex items-center font-semibold text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQtyChange(quantity + 1)}
                    className="btn btn-sm btn-ghost join-item"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ACTION TRIGGER BUNDLES */}
          <div className="flex gap-3 mt-5">
            <button
              disabled={currentStock === 0}
              onClick={handleAddToCart}
              className="btn btn-neutral flex-1"
            >
              Add to Cart
            </button>
            <button
              disabled={currentStock === 0}
              className="btn btn-main flex-1"
            >
              Buy Now
            </button>
          </div>
        </div>
        <TrustBadges />
      </div>
    </div>
  );
};

export default ProductInteractiveLayer;
