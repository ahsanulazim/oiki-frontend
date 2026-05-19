import ProductInfo from "@/components/product/ProductInfo";
import ShopNav from "@/components/product/ShopNav";

const page = async ({ params }) => {
  const { product } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/getProductBySlug/${product}`,
    {
      method: "GET",
    },
  );

  const productData = await res.json();

  return (
    <>
      <ShopNav category={productData.category} product={productData} />
      <ProductInfo product={productData} />
    </>
  );
};

export default page;
