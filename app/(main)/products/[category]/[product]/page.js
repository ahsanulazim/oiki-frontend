import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import ShopNav from "@/components/product/ShopNav";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }) => {
  const { product } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/getProductBySlug/?slug=${product}`,
    );

    if (!res.ok) return { title: "Product Not Found | Oiki Lifestyle" };
    const productData = await res.json();
    if (!productData) return { title: "Product Not Found | Oiki Lifestyle" };

    const cleanDescription = productData?.productDescription
      ? productData.productDescription
          .replace(/<[^>]*>?/gm, "")
          .replace(/\s+/g, " ")
          .trim()
      : "";
    const metaDescription =
      cleanDescription.slice(0, 160) ||
      `Buy ${productData?.productName || "Product"} at the best price online on Oiki Lifestyle.`;

    const imageUrl =
      productData?.productImages?.[0] ||
      productData?.variantDetails?.[0]?.imageGallery?.[0] ||
      "/assets/oiki-logo.png";

    return {
      title: `${productData?.productName} | Oiki Lifestyle`,
      description: metaDescription,
      openGraph: {
        title: `${productData?.productName} | Oiki Lifestyle`,
        description: metaDescription,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 800,
            alt: productData?.productName || "Product Image",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${productData?.productName} | Oiki Lifestyle`,
        description: metaDescription,
        images: [imageUrl],
      },
    };
  } catch (error) {
    return { title: "Product | Oiki Lifestyle" };
  }
};

const page = async ({ params }) => {
  const { product } = await params;

  let productData = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/getProductBySlug/?slug=${product}`,
      {
        method: "GET",
      },
    );

    if (res.ok) {
      productData = await res.json();
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  if (!productData) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oiki.store";
  const productUrl = `${siteUrl}/products/${productData.category}/${productData.slug}`;
  const categoryUrl = `${siteUrl}/products/${productData.category}`;

  const cleanCategoryName = productData?.category
    ? productData.category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Collection";

  const cleanDescription = productData?.productDescription
    ? productData.productDescription
        .replace(/<[^>]*>?/gm, "")
        .replace(/\s+/g, " ")
        .trim()
    : "";

  const hasDiscount = productData.discount && Number(productData.discount) > 0;
  const originalPrice = Number(productData.price) || 0;
  const discountPct = Number(productData.discount) || 0;
  const finalPrice = hasDiscount
    ? Math.round(originalPrice - (originalPrice * discountPct) / 100)
    : originalPrice;

  const allImages = [
    ...(productData.productImages || []),
    ...(productData.variantDetails?.flatMap((v) => v.imageGallery || []) || []),
  ].filter(Boolean);

  // 1. Schema.org Product JSON-LD (Rich Results for SERPs)
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productData.productName,
    image:
      allImages.length > 0 ? allImages : [`${siteUrl}/assets/oiki-logo.png`],
    description:
      cleanDescription ||
      `Buy ${productData.productName} online at Oiki Lifestyle.`,
    sku: productData.sku || String(productData._id),
    brand: {
      "@type": "Brand",
      name: "Oiki Lifestyle",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "BDT",
      price: finalPrice,
      priceValidUntil: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000,
      ).toISOString().split("T")[0],
      itemCondition: "https://schema.org/NewCondition",
      availability:
        productData.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Oiki Lifestyle",
      },
    },
  };

  // 2. Schema.org BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cleanCategoryName,
        item: categoryUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: productData.productName,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ShopNav category={productData?.category} product={productData} />
      <ProductInfo product={productData} />
      <ProductTabs product={productData} />
    </>
  );
};

export default page;
