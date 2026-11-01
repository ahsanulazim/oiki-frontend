import Filter from "@/components/product/Filter";
import ShopNav from "@/components/product/ShopNav";
import Spinner from "@/components/skeleton/Spinner";
import { Suspense } from "react";

export const metadata = {
  title: "Shop All Products | Oiki Lifestyle",
  description:
    "Explore our collection of ethically made handcrafted clothing, sarees, kurtis and more.",
};

const page = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oiki.store";

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
        name: "Shop All Products",
        item: `${siteUrl}/products`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ShopNav category="all" />
      <Suspense fallback={<Spinner />}>
        <Filter category="all" />
      </Suspense>
    </>
  );
};

export default page;
