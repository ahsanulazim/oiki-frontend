"use client";

import { useContext } from "react";
import TakaSymbol from "../ui/TakaSymbol";
import { MyContext } from "@/context/MyProvider";

const Overview = () => {
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
            <span>Total: </span>
            <span className="font-bold">
              <TakaSymbol /> {calculateTotalPrice()}
            </span>
          </h3>
        </div>
      </div>
      <button className="btn btn-main w-full">Checkout</button>
    </div>
  );
};

export default Overview;
