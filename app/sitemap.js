export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oiki.store";
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  // 1. Static Pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/return-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/shipping-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/track-order`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // 2. Dynamic Categories (from backend or fallback)
  let categoryPages = [];
  try {
    const catRes = await fetch(`${apiUrl}/category/getAllCategories`, {
      next: { revalidate: 3600 },
    });
    if (catRes.ok) {
      const categories = await catRes.json();
      if (Array.isArray(categories) && categories.length > 0) {
        categoryPages = categories
          .filter((c) => c.slug)
          .map((c) => ({
            url: `${baseUrl}/products/${c.slug}`,
            lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
          }));
      }
    }
  } catch (error) {
    console.error("Error fetching sitemap categories:", error);
  }

  // Fallback categories if server is not reachable
  if (categoryPages.length === 0) {
    const fallbackCats = ["kurti", "three-piece", "two-piece", "saree"];
    categoryPages = fallbackCats.map((cat) => ({
      url: `${baseUrl}/products/${cat}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  }

  // 3. Dynamic Products
  let productPages = [];
  try {
    const prodRes = await fetch(`${apiUrl}/products/getAllProducts`, {
      next: { revalidate: 3600 },
    });

    if (prodRes.ok) {
      const products = await prodRes.json();
      if (Array.isArray(products)) {
        productPages = products
          .filter((p) => p.slug && p.category)
          .map((p) => ({
            url: `${baseUrl}/products/${p.category}/${p.slug}`,
            lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
          }));
      }
    }
  } catch (error) {
    console.error("Error generating dynamic sitemap products:", error);
  }

  return [...staticPages, ...categoryPages, ...productPages];
}
