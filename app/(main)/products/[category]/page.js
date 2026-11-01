import Filter from "@/components/product/Filter";
import ShopNav from "@/components/product/ShopNav";
import Spinner from "@/components/skeleton/Spinner";
import { Suspense } from "react";

export const generateMetadata = async ({ params }) => {
  const { category } = await params;
  const cleanCategoryName = category
    ? category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Collection";

  return {
    title: `${cleanCategoryName} Collection | Oiki Lifestyle`,
    description: `Shop the latest handcrafted ${cleanCategoryName} collection online at Oiki Lifestyle. Explore elegant designs and affordable fashion.`,
    openGraph: {
      title: `${cleanCategoryName} Collection | Oiki Lifestyle`,
      description: `Explore our handcrafted ${cleanCategoryName} collection.`,
    },
  };
};

const page = async ({ params }) => {
  const { category } = await params;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oiki.store";
  const categoryUrl = `${siteUrl}/products/${category}`;

  const cleanCategoryName = category
    ? category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Collection";

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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ShopNav category={category} />
      <Suspense fallback={<Spinner />}>
        <Filter category={category} />
      </Suspense>
    </>
  );
};

export default page;
