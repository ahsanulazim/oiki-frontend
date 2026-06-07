export const createProduct = async (productData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/createProduct`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    },
  );
  return res.json();
};

export const getAllProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/getAllProducts`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res.json();
};

export const getNewArrivals = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/getNewArrivals`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/deleteProduct/?id=${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error("Deleting Failed");
  }

  return res.json();
};

// lib/api/filters.js
export async function fetchFilters(category) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/getCategoryFilters/?category=${category}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // ✅ Next.js এ fresh data নিশ্চিত করতে
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch filters");
  }

  return res.json();
}

//get products by filters
export const getProductsByFilters = async (
  category,
  page,
  limit,
  filters = {},
) => {
  const query = new URLSearchParams({
    category,
    page,
    limit,
  });

  // filters object থেকে truthy values গুলো query-তে add করো
  if (filters.minPrice) query.set("minPrice", filters.minPrice);
  if (filters.maxPrice) query.set("maxPrice", filters.maxPrice);
  if (filters.sizes) query.set("sizes", filters.sizes);
  if (filters.colors) query.set("colors", filters.colors);
  if (filters.stock) query.set("stock", filters.stock);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/getProductsByFilters/?${query.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch filters");
  }

  return res.json();
};
