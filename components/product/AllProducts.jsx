import { getProductsByCategory } from "@/api/productApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../ui/ProductCard";
import ProductCardSkeleton from "../ui/skeleton/ProductCardSkeleton";

const AllProducts = ({ category }) => {
  //fetch products
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const {
    data: products,
    isLoading: productsLoading,
    isError,
  } = useQuery({
    queryKey: ["products", page, category],
    queryFn: () => getProductsByCategory(category, page, 10),
    keepPreviousData: true,
  });

  const goToPage = (pageNum) => {
    router.push(`/products/${category}/?page=${pageNum}`);
  };

  console.log(products);

  return (
    <div className="grid grid-cols-5 gap-5 mt-5">
      {productsLoading ? (
        Array.from({ length: 10 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))
      ) : isError ? (
        <div>Something went wrong</div>
      ) : products.products.length === 0 ? (
        <div>No products found</div>
      ) : (
        products.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export default AllProducts;
