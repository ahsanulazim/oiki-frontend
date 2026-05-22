"use client";

import { useContext } from "react";
import TakaSymbol from "../ui/TakaSymbol";
import { MyContext } from "@/context/MyProvider";
import Link from "next/link";

const Overview = ({ isCheckout }) => {
  const { calculateTotalPrice } = useContext(MyContext);

  return (
    <div className="border border-base-300 rounded-box p-5">
      <h2 className="font-bold text-xl">Order Summery</h2>
      <div className="divider"></div>
      <div className="flex flex-col mb-5">
        <div>
          <h3 className="flex justify-between">
            <span>Subtotal: </span>
            <span className="font-bold">
              <TakaSymbol /> {calculateTotalPrice()}
            </span>
          </h3>
        </div>
        <div className="divider"></div>
        <div>
          <h3 className="flex justify-between">
            <span>Shipping: </span>
            <span className="font-bold">
              <TakaSymbol /> {calculateTotalPrice()}
            </span>
          </h3>
        </div>
        <div className="divider"></div>
        <div>
          <h3 className="flex justify-between">
            <span>Total: </span>
            <span className="font-bold text-xl text-main">
              <TakaSymbol /> {calculateTotalPrice()}
            </span>
          </h3>
        </div>
      </div>
      {isCheckout && (
        <>
          <label className="label mb-5">
            <input type="checkbox" defaultChecked className="checkbox" />
            <span className="text-wrap">
              {" "}
              I have read and agree to the{" "}
              <Link href="#" className="link link-hover text-main">
                {" "}
                Terms and Conditions,{" "}
              </Link>
              <Link href="#" className="link link-hover text-main">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="#" className="link link-hover text-main">
                Refund and Return Policy
              </Link>
            </span>
          </label>
        </>
      )}
      <Link href={isCheckout ? "#" : "/cart/checkout"}>
        <button className="btn btn-main w-full">
          {isCheckout ? "Confirm Order" : "Checkout"}
        </button>
      </Link>
    </div>
  );
};

export default Overview;
