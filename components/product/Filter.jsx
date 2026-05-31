"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import CategoryNav from "./CategoryNav";
import TakaSymbol from "../ui/TakaSymbol";
import { useQuery } from "@tanstack/react-query";
import { fetchFilters } from "@/api/productApi";
import AllProducts from "./AllProducts";

const Range = dynamic(() => import("react-range").then((mod) => mod.Range), {
  ssr: false,
});

const Filter = ({ category }) => {
  const {
    data: filters,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["filters", category],
    queryFn: () => fetchFilters(category),
  });

  if (isLoading) {
    console.log("filter loading");
  } else if (error) {
    console.error("filter Error");
  } else {
    console.log(filters);
  }

  const [price, setPrice] = useState([1, 100000]);

  return (
    <section className="px-5">
      <div className="max-w-360 mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="col-span-1">
            <div className="drawer lg:drawer-open lg:auto-cols-auto">
              <input
                id="my-drawer-3"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content col-start-1 flex flex-col items-center justify-center"></div>
              <div className="drawer-side z-40">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <div className="bg-base-100 w-80 min-h-full lg:min-h-auto lg:w-full p-4 shadow-sm lg:rounded-box">
                  {/* Sidebar content here */}
                  <div>
                    <h4 className="text-lg font-bold">Price</h4>
                    <div className="divider mt-0"></div>
                    <div>
                      <Range
                        step={1}
                        min={1}
                        max={100000}
                        values={price}
                        onChange={(values) => setPrice(values)}
                        renderTrack={({ props, children }) => (
                          <div
                            {...props}
                            className="h-[6px] bg-neutral rounded-full w-full"
                          >
                            {children}
                          </div>
                        )}
                        renderThumb={({ props }) => (
                          <div
                            {...props}
                            key={props.key}
                            className="size-5 rounded-full bg-main"
                          />
                        )}
                      />
                      <div className="flex items-center justify-between mt-5 gap-10">
                        <span>
                          <TakaSymbol />
                          {price[0]}
                        </span>
                        <span>
                          <TakaSymbol />
                          {price[1]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10">
                    <h4 className="text-lg font-bold">Availability</h4>
                    <div className="divider mt-0"></div>
                    <div className="fieldset">
                      <label className="label text-base-content">
                        <input
                          type="radio"
                          name="stock"
                          className="radio radio-sm"
                        />
                        In Stock
                      </label>
                      <label className="label text-base-content">
                        <input
                          type="radio"
                          name="stock"
                          className="radio radio-sm"
                        />
                        Out of Stock
                      </label>
                    </div>
                  </div>
                  <div className="mt-10">
                    <h4 className="text-lg font-bold">Size</h4>
                    <div className="divider mt-0"></div>
                    <div className="fieldset">
                      <label className="label text-base-content">
                        <input
                          type="checkbox"
                          name="size"
                          className="checkbox checkbox-sm"
                        />
                        XS
                      </label>
                      <label className="label text-base-content">
                        <input
                          type="checkbox"
                          name="size"
                          className="checkbox checkbox-sm"
                        />
                        SM
                      </label>
                      <label className="label text-base-content">
                        <input
                          type="checkbox"
                          name="size"
                          className="checkbox checkbox-sm"
                        />
                        M
                      </label>
                      <label className="label text-base-content">
                        <input
                          type="checkbox"
                          name="size"
                          className="checkbox checkbox-sm"
                        />
                        LG
                      </label>
                      <label className="label text-base-content">
                        <input
                          type="checkbox"
                          name="size"
                          className="checkbox checkbox-sm"
                        />
                        XL
                      </label>
                      <label className="label text-base-content">
                        <input
                          type="checkbox"
                          name="size"
                          className="checkbox checkbox-sm"
                        />
                        XXL
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <CategoryNav category={category} />
            <AllProducts category={category} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filter;
