import { getProductsByFilters } from "@/api/productApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../ui/ProductCard";
import ProductCardSkeleton from "../ui/skeleton/ProductCardSkeleton";

const AllProducts = ({ category }) => {
  //fetch products
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  // ✅ Filters from query string
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sizes = searchParams.get("sizes"); // comma separated
  const colors = searchParams.get("colors"); // comma separated
  const stock = searchParams.get("stock"); // "in" / "out"

  const filters = {
    minPrice,
    maxPrice,
    sizes,
    colors,
    stock,
  };

  const {
    data: products,
    isLoading: productsLoading,
    isError,
  } = useQuery({
    queryKey: ["products", page, category, filters],
    queryFn: () => getProductsByFilters(category, page, 10, filters),
    keepPreviousData: true,
  });

  console.log(products);

  const goToPage = (pageNum) => {
    router.push(`/products/${category}/?page=${pageNum}`);
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 md:gap-5 mt-5">
      {productsLoading ? (
        Array.from({ length: 10 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))
      ) : isError ? (
        <div>Something went wrong</div>
      ) : products.products?.length === 0 ? (
        <div>No products found</div>
      ) : (
        products.products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export default AllProducts;
