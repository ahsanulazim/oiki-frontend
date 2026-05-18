export const getVariants = async () => {
  // Implementation for fetching variants
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/variants/getAllVariants`,
  );
  const data = await response.json();
  return data;
};
export const getAttributes = async ({ queryKey }) => {
  const slug = queryKey[1];
  // Implementation for fetching variants
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/variants/getAllAttributes?slug=${slug}`,
  );
  const data = await response.json();
  return data;
};

export const addAttribute = async (attributeData) => {
  // Implementation for adding a new variant

  const { slug } = attributeData;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/variants/AddAVariant/?slug=${slug}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attributeData),
    },
  );
  const data = await response.json();
  return data;
};

export const addVariant = async (variantData) => {
  // Implementation for adding a new variant
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/variants/createVariant`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variantData),
    },
  );
  const data = await response.json();
  return data;
};

export const updateVariant = async (id, variantData) => {
  // Implementation for updating a variant
};

export const deleteVariant = async (id) => {
  // Implementation for deleting a variant
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/variants/deleteVariant/${id}`,
    {
      method: "DELETE",
    },
  );
  const data = await response.json();
  return data;
};
