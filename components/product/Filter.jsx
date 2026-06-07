"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CategoryNav from "./CategoryNav";
import TakaSymbol from "../ui/TakaSymbol";
import { useQuery } from "@tanstack/react-query";
import { fetchFilters } from "@/api/productApi";
import AllProducts from "./AllProducts";
import { useRouter, useSearchParams } from "next/navigation";

const Range = dynamic(() => import("react-range").then((mod) => mod.Range), {
  ssr: false,
});

const Filter = ({ category }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const [price, setPrice] = useState([0, 1]);

  useEffect(() => {
    if (filters?.maxPrice) {
      setPrice([0, filters.maxPrice]);
    }
  }, [filters]);

  // ✅ Helper: update query string instantly
  const updateQuery = (key, value) => {
    const query = new URLSearchParams(searchParams.toString());
    if (value) {
      query.set(key, value);
    } else {
      query.delete(key);
    }
    router.push(`/products/${category}?${query.toString()}`);
  };

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
              <div className="drawer-side h-auto max-lg:z-40">
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
                        min={0}
                        max={filters?.maxPrice}
                        values={price}
                        onChange={(values) => {
                          setPrice(values);
                          updateQuery("minPrice", values[0]);
                          updateQuery("maxPrice", values[1]);
                        }}
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
                          onChange={() => updateQuery("stock", "in")}
                        />
                        In Stock
                      </label>
                      <label className="label text-base-content">
                        <input
                          type="radio"
                          name="stock"
                          className="radio radio-sm"
                          onChange={() => updateQuery("stock", "out")}
                        />
                        Out of Stock
                      </label>
                    </div>
                  </div>
                  <div className="mt-10">
                    <h4 className="text-lg font-bold">Size</h4>
                    <div className="divider mt-0"></div>
                    <div className="fieldset">
                      {filters?.sizes?.map((size) => (
                        <label className="label text-base-content" key={size}>
                          <input
                            type="checkbox"
                            name="size"
                            className="checkbox checkbox-sm"
                            onChange={(e) => {
                              const current =
                                searchParams.get("sizes")?.split(",") || [];
                              const updated = e.target.checked
                                ? [...current, size]
                                : current.filter((s) => s !== size);
                              updateQuery("sizes", updated.join(","));
                            }}
                          />
                          {size}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="mt-10">
                    <h4 className="text-lg font-bold">Color</h4>
                    <div className="divider mt-0"></div>
                    <div className="fieldset">
                      {filters?.colors?.map((color, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            const current =
                              searchParams.get("colors")?.split(",") || [];
                            const updated = current.includes(color.color)
                              ? current.filter((col) => col !== color.color)
                              : [...current, color.color];
                            updateQuery("colors", updated.join(","));
                          }}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: color.hex }}
                          ></div>
                          <span>{color.color}</span>
                        </button>
                      ))}
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
