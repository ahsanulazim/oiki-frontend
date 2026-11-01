import Link from "next/link";
import {
  LuBookOpen,
  LuExternalLink,
  LuFolder,
  LuHouse,
  LuPackage,
  LuShieldCheck,
  LuShoppingBag,
} from "react-icons/lu";

export const metadata = {
  title: "Sitemap | Oiki Lifestyle",
  description:
    "Explore all pages, product categories, collections, and customer support links on Oiki Lifestyle.",
};

export const revalidate = 1800; // Auto-regenerate page every 30 minutes

async function getSitemapData() {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  let categories = [];
  let products = [];

  try {
    const [catRes, prodRes] = await Promise.all([
      fetch(`${apiUrl}/category/getAllCategories`, {
        next: { revalidate: 1800 },
      }),
      fetch(`${apiUrl}/products/getAllProducts`, {
        next: { revalidate: 1800 },
      }),
    ]);

    if (catRes.ok) {
      const catData = await catRes.json();
      if (Array.isArray(catData)) {
        categories = catData;
      }
    }

    if (prodRes.ok) {
      const prodData = await prodRes.json();
      if (Array.isArray(prodData)) {
        products = prodData;
      }
    }
  } catch (error) {
    console.error("Error fetching sitemap data:", error);
  }

  // Fallback categories if backend is not responding
  if (categories.length === 0) {
    categories = [
      { name: "Kurti", slug: "kurti" },
      { name: "Three Piece", slug: "three-piece" },
      { name: "Two Piece", slug: "two-piece" },
      { name: "Saree", slug: "saree" },
    ];
  }

  return { categories, products };
}

export default async function SitemapPage() {
  const { categories, products } = await getSitemapData();

  // Group products by category for clean UI
  const productsByCategory = categories.map((cat) => {
    const catProducts = products.filter(
      (p) =>
        p.category?.toLowerCase() === cat.slug?.toLowerCase() ||
        p.category?.toLowerCase() === cat.name?.toLowerCase(),
    );
    return {
      category: cat,
      products: catProducts,
    };
  });

  return (
    <section className="px-5 py-8 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm mb-4">
        <ul>
          <li>
            <Link href="/" className="flex items-center gap-1 hover:text-main">
              <LuHouse className="size-4" /> Home
            </Link>
          </li>
          <li className="font-semibold text-main">Sitemap</li>
        </ul>
      </div>

      {/* Header */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-6 md:p-8 mb-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-main">
              Oiki Lifestyle &mdash; Website Directory
            </h1>
            <p className="text-sm text-base-content/70 mt-1 max-w-2xl">
              Quickly find any page, handcrafted collection, or policy on our
              store. All links are automatically updated whenever new products or
              categories are added.
            </p>
          </div>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline border-main text-main hover:bg-main hover:text-white btn-sm self-start md:self-center gap-1.5"
          >
            <LuExternalLink className="size-3.5" />
            <span>Search Engine XML Sitemap</span>
          </a>
        </div>
      </div>

      {/* 3 Core Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Main Store Pages */}
        <div className="bg-base-100 border border-base-300 rounded-xl p-5 hover:border-main/50 transition-colors">
          <div className="flex items-center gap-2.5 text-main font-semibold mb-4 text-base border-b border-base-200 pb-3">
            <LuShoppingBag className="size-5" />
            <h2>Store Pages</h2>
          </div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="hover:text-main transition-colors flex items-center justify-between">
                <span>Home Page</span>
                <span className="text-xs text-base-content/50">/</span>
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-main transition-colors flex items-center justify-between">
                <span>Shop All Collection</span>
                <span className="text-xs text-base-content/50">/products</span>
              </Link>
            </li>
            <li>
              <Link href="/track-order" className="hover:text-main transition-colors flex items-center justify-between">
                <span>Track Your Order</span>
                <span className="text-xs text-base-content/50">/track-order</span>
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-main transition-colors flex items-center justify-between">
                <span>Shopping Cart</span>
                <span className="text-xs text-base-content/50">/cart</span>
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-main transition-colors flex items-center justify-between">
                <span>My Wishlist</span>
                <span className="text-xs text-base-content/50">/wishlist</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories Directory */}
        <div className="bg-base-100 border border-base-300 rounded-xl p-5 hover:border-main/50 transition-colors">
          <div className="flex items-center gap-2.5 text-main font-semibold mb-4 text-base border-b border-base-200 pb-3">
            <LuFolder className="size-5" />
            <h2>Product Categories ({categories.length})</h2>
          </div>
          <ul className="space-y-2.5 text-sm">
            {categories.map((cat) => (
              <li key={cat.slug || cat.name}>
                <Link
                  href={`/products/${cat.slug}`}
                  className="hover:text-main transition-colors flex items-center justify-between group"
                >
                  <span className="font-medium group-hover:underline">
                    {cat.name}
                  </span>
                  <span className="badge badge-sm badge-ghost">
                    /products/{cat.slug}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company & Policies */}
        <div className="bg-base-100 border border-base-300 rounded-xl p-5 hover:border-main/50 transition-colors">
          <div className="flex items-center gap-2.5 text-main font-semibold mb-4 text-base border-b border-base-200 pb-3">
            <LuShieldCheck className="size-5" />
            <h2>Help &amp; Policies</h2>
          </div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/about" className="hover:text-main transition-colors flex items-center justify-between">
                <span>About Oiki &amp; Contact</span>
                <span className="text-xs text-base-content/50">/about</span>
              </Link>
            </li>
            <li>
              <Link href="/shipping-policy" className="hover:text-main transition-colors flex items-center justify-between">
                <span>Shipping &amp; Delivery</span>
                <span className="text-xs text-base-content/50">/shipping-policy</span>
              </Link>
            </li>
            <li>
              <Link href="/return-policy" className="hover:text-main transition-colors flex items-center justify-between">
                <span>Return &amp; Exchange</span>
                <span className="text-xs text-base-content/50">/return-policy</span>
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-main transition-colors flex items-center justify-between">
                <span>Privacy &amp; Terms</span>
                <span className="text-xs text-base-content/50">/privacy-policy</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Dynamic Products Directory by Category */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-2 text-main font-bold text-xl mb-6">
          <LuPackage className="size-6" />
          <h2>All Handcrafted Products Directory ({products.length} Products)</h2>
        </div>

        {products.length === 0 ? (
          <p className="text-sm text-base-content/60">
            No products found. Newly added products from the dashboard will
            automatically appear here.
          </p>
        ) : (
          <div className="space-y-8">
            {productsByCategory.map(({ category, products: catProducts }) => (
              <div key={category.slug || category.name} className="border-b border-base-200 pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-base text-main flex items-center gap-2">
                    <LuBookOpen className="size-4" />
                    <span>{category.name}</span>
                    <span className="badge badge-sm badge-outline">
                      {catProducts.length} items
                    </span>
                  </h3>
                  <Link
                    href={`/products/${category.slug}`}
                    className="text-xs text-main hover:underline font-medium"
                  >
                    View All {category.name} &rarr;
                  </Link>
                </div>

                {catProducts.length === 0 ? (
                  <p className="text-xs text-base-content/50 italic">
                    No products currently listed in this category.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {catProducts.map((p) => (
                      <Link
                        key={p._id || p.slug}
                        href={`/products/${p.category}/${p.slug}`}
                        className="p-2.5 rounded-lg border border-base-200 hover:border-main/40 hover:bg-base-200/50 transition-all text-xs flex flex-col justify-between group"
                      >
                        <span className="font-medium group-hover:text-main line-clamp-1">
                          {p.productName}
                        </span>
                        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-base-200/60 text-base-content/60">
                          <span>৳{p.price}</span>
                          <span className="text-[10px] uppercase font-mono">
                            {p.stock > 0 ? "In Stock" : "Sold Out"}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

