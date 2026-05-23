"use client";

import { useContext } from "react";
import TakaSymbol from "../ui/TakaSymbol";
import { MyContext } from "@/context/MyProvider";
import Link from "next/link";

const Overview = ({ isCheckout, ref, isPending, paymentMethod }) => {
  const { calculateTotalPrice, deliveryAdd, shippingPrice } =
    useContext(MyContext);

  return (
    <div className="bg-base-100 rounded-box p-5">
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
        {deliveryAdd && (
          <>
            <div className="divider"></div>
            <div>
              <h3 className="flex justify-between">
                <span>Shipping: </span>
                <span className="font-bold">
                  <TakaSymbol /> {shippingPrice?.baseCharge}
                </span>
              </h3>
            </div>
          </>
        )}
        <div className="divider"></div>
        <div>
          <h3 className="flex justify-between">
            <span>Total: </span>
            <span className="font-bold text-xl text-main">
              <TakaSymbol />{" "}
              {calculateTotalPrice() + (Number(shippingPrice?.baseCharge) || 0)}
            </span>
          </h3>
        </div>
      </div>
      {isCheckout && (
        <>
          <label className="label mb-5">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-sm"
            />
            <span className="text-wrap text-sm">
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

      {isCheckout ? (
        <button
          onClick={() => ref.current.requestSubmit()}
          disabled={isPending}
          className={`btn ${isPending ? "" : "btn-main"} w-full`}
        >
          {isPending && <span className="loading loading-spinner"></span>}
          {paymentMethod === "cod" ? "Confirm Order" : "Pay Now"}
        </button>
      ) : (
        <Link href="/cart/checkout">
          <button className="btn btn-main w-full">Checkout</button>
        </Link>
      )}
    </div>
  );
};

export default Overview;
