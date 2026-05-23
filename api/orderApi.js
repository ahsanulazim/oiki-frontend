export const createOrder = async (data) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/createOrder`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  const result = await res.json();
  return result;
};

export const getAllOrderData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/getAllOrderData`,
  );
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message);
  }
  return data;
};
