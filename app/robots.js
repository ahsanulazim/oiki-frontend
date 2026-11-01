export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oiki.store";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/cart/checkout/",
          "/login",
          "/registration",
          "/verify-email",
          "/forget-password",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

