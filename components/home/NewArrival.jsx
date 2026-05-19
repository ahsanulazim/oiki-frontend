"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ui/ProductCard";
import { getAllProducts } from "@/api/productApi";

const NewArrival = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return (
    <section className="px-5 mb-5">
      <div className="max-w-360 mx-auto">
        <h2 className="text-xl sm:text-3xl font-bold text-main">
          New Arrivals
        </h2>
        <div className="mt-5 grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-6 gap-5">
          {isLoading ? (
            <div className="col-span-full text-center">Loading...</div>
          ) : (
            products
              ?.slice(0, 6)
              .map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))
          )}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
