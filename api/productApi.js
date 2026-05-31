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

//get products by category
export const getProductsByCategory = async (category, page, limit) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/getProductsByCategory/?category=${category}&page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res.json();
};
