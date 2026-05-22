import Link from "next/link";
import TakaSymbol from "./TakaSymbol";

const ProductCard = ({ product }) => {
  return (
    <div className="card shadow-sm overflow-clip">
      <Link href={`/products/${product.category}/${product.slug}`}>
        <figure className="relative">
          <div className="badge badge-success max-md:badge-sm absolute top-3 left-3">
            New
          </div>
          <img
            src={
              product.productImages[0] || product.variantDetails[0].swatchImage
            }
            alt={product.productName}
            className="aspect-square object-cover"
          />
        </figure>
      </Link>
      <div className="card-body p-3">
        <Link href={`/products/${product.category}/${product.slug}`}>
          <h2 className="card-title text-xs xs:text-sm font-normal">
            {product.productName}
          </h2>
        </Link>
        <p className="font-bold text-sm xs:text-lg">
          <TakaSymbol />
          {product.price}
        </p>
        <div className="card-actions justify-end">
          <Link
            href={`/products/${product.category}/${product.slug}`}
            className="btn btn-main btn-sm w-full"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
