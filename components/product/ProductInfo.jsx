import { LuCoins, LuShirt, LuTruck } from "react-icons/lu";
import ProductImages from "./ProductImages";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaStar,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

const ProductInfo = ({ product }) => {
  console.log(product);

  return (
    <section className="mt-3 px-5">
      <div className="max-w-360 mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8 xl:gap-10">
          <div className="lg:col-span-5 col-span-1">
            <ProductImages product={product} />
          </div>
          <div className="lg:col-span-7">
            <div className="badge badge-success badge-soft mb-3">
              <FaStar /> Best Seller
            </div>
            <h1 className="font-bold text-4xl">{product.productName}</h1>

            <p className="font-bold text-2xl text-main">${product.price}</p>
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className=" flex items-center gap-2 text-yellow-500">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                4.9 (300+ Reviews)
              </div>
              <div className="divider divider-horizontal"></div>
              <p>
                🔥<span className="font-bold">500+</span> Sold This Week!{" "}
              </p>
            </div>
            <div className="bg-base-300 p-5 rounded-box my-5">
              <div className="text-sm flex items-center gap-6">
                <p>
                  SKU: <span className="font-bold">{product.sku || "N/A"}</span>
                </p>
                <p>
                  Sold By:{" "}
                  <span className="font-bold text-main">Oiki Lifestyle</span>
                </p>
              </div>
              <div className="my-3">
                <h3 className="font-bold text-sm">Size:</h3>
                <div className="flex items-center gap-3 mt-2">
                  {product.size?.map((sizes) => (
                    <button
                      key={sizes.value}
                      className="btn btn-square btn-outline rounded-box border-main"
                    >
                      {sizes.label}
                    </button>
                  ))}
                </div>
              </div>
              <h3 className="text-sm">
                Stock: <span className="font-bold">{product.stock}</span>
              </h3>
              <div className="my-3 flex items-center gap-3">
                <p className="text-lg font-bold">Quantity:</p>
                <input
                  type="number"
                  className="input"
                  min="1"
                  max={product.stock}
                  defaultValue={1}
                />
              </div>
              <div className="flex items-center gap-3">
                <button className="btn btn-neutral flex-1">Add to Cart</button>
                <button className="btn btn-main flex-1">Buy Now</button>
              </div>
            </div>
            <div className="flex max-md:flex-col items-center xl:gap-4">
              <div className="flex items-center gap-5 justify-between">
                <div className="flex flex-col items-center">
                  <div className="size-10 bg-main/10 text-main rounded-full flex items-center justify-center">
                    <LuShirt />
                  </div>
                  <h3 className="font-bold max-lg:text-lg max-xl:text-sm whitespace-nowrap">
                    100% Cotton
                  </h3>
                  <p className="opacity-50 lg:text-xs xl:text-sm whitespace-nowrap">
                    No Mixes no Blends
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="size-10 bg-main/10 text-main rounded-full flex items-center justify-center">
                    <LuCoins />
                  </div>
                  <h3 className="font-bold max-lg:text-lg max-xl:text-sm whitespace-nowrap">
                    3 Day Guarrantee
                  </h3>
                  <p className="opacity-50 lg:text-xs xl:text-sm whitespace-nowrap">
                    Love it or full refund
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="size-10 bg-main/10 text-main rounded-full flex items-center justify-center">
                    <LuTruck />
                  </div>
                  <h3 className="font-bold max-lg:text-lg max-xl:text-sm whitespace-nowrap">
                    Free Shipping
                  </h3>
                  <p className="opacity-50 lg:text-xs xl:text-sm whitespace-nowrap">
                    On orders over $50
                  </p>
                </div>
              </div>
              <div className="divider divider-horizontal"></div>
              <div>
                <h3 className="font-bold max-md:text-center">Share:</h3>
                <div className="flex items-center gap-3 mt-2">
                  <button className="btn btn-square rounded-box lg:btn-sm">
                    <FaFacebook className="xl:size-4" />
                  </button>
                  <button className="btn btn-square rounded-box lg:btn-sm">
                    <FaFacebookMessenger className="xl:size-4" />
                  </button>
                  <button className="btn btn-square rounded-box lg:btn-sm">
                    <FaXTwitter className="xl:size-4" />
                  </button>
                  <button className="btn btn-square rounded-box lg:btn-sm">
                    <FaWhatsapp className="xl:size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
