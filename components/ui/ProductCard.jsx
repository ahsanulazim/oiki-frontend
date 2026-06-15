import Link from "next/link";
import TakaSymbol from "./TakaSymbol";

const ProductCard = ({ product }) => {
  // Sob variant er moddhe prothom j variant e kono in-stock size ache, seta nebo
  const firstVariantWithStock = product?.variantDetails?.find((v) =>
    v.sizes?.some((s) => s.stock > 0),
  );
  // Kono variant e stock na thakle isOutOfStock = true
  const isOutOfStock = !firstVariantWithStock;
  // Fallback: kono variant e stock na thakle prothom variant e thako
  const firstVariant = firstVariantWithStock || product?.variantDetails?.[0];
  // First in-stock size, na thakle sizes[0]
  const displaySize =
    firstVariant?.sizes?.find((s) => s.stock > 0) || firstVariant?.sizes?.[0];

  return (
    <div className="card bg-base-100 shadow-sm overflow-clip">
      <Link href={`/products/${product.category}/${product.slug}`}>
        <figure className="relative">
          {!isOutOfStock && (
            <div className="badge badge-success max-md:badge-sm absolute top-3 left-3">
              New
            </div>
          )}
          <img
            src={firstVariant?.swatchImage || product.productImages?.[0]}
            alt={product.productName}
            className="aspect-square object-cover"
          />
        </figure>
      </Link>
      <div className="card-body p-3">
        <Link href={`/products/${product.category}/${product.slug}`}>
          <h2 className="card-title text-xs xs:text-sm font-normal line-clamp-2">
            {product.productName}
          </h2>
        </Link>
        {displaySize?.discount ? (
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-sm xs:text-lg text-main">
              <TakaSymbol />
              {displaySize.discount}
            </span>
            <span className="line-through text-xs opacity-50">
              <TakaSymbol />
              {displaySize.price}
            </span>
          </div>
        ) : (
          <p className="font-bold text-sm xs:text-lg">
            <TakaSymbol />
            {displaySize?.price}
          </p>
        )}
        <div className="card-actions justify-end">
          <Link
            href={`/products/${product.category}/${product.slug}`}
            className={`btn btn-sm w-full ${
              isOutOfStock ? "btn-disabled" : "btn-main"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : "Buy Now"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
