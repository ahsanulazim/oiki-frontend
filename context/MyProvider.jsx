"use client";
import { getAllCategories } from "@/api/categoryApi";
import { getAllLocations } from "@/api/locationApi";
import { getAllProducts } from "@/api/productApi";
import { getAllShippingRates } from "@/api/shippingApi";
import { auth } from "@/firebase/firebase.config";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [newUser, setNewUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setNewUser(JSON.parse(storedUser));
    }

    // Firebase observer একবারই attach হবে
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email;
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/users/getUser?email=${email}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            },
          );
          const data = await res.json();
          setNewUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setNewUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  //products fetching
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  //cart logic
  const [cartItems, setCartItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // 1. Load cart items from localStorage on initial render safely
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Cart storage parsing error:", error);
      }
    }
    setIsHydrated(true);
  }, []);

  // 2. After initial hydration, save cart items to localStorage whenever they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isHydrated]);

  // 3. Add function to update cart items
  const addToCart = (product, variant, size, quantity) => {
    const cartItemId = `${product._id}-${variant.color}-${size}`;

    // Check if product variant already exists in cart
    const existingCartItem = cartItems.find((item) => item.id === cartItemId);

    const activeSizeDetail = variant?.sizes?.find((s) => s.size === size);
    const stock = activeSizeDetail ? activeSizeDetail.stock : 0;

    if (existingCartItem) {
      // If exists, update the quantity
      const newQuantiy = existingCartItem.quantity + quantity;

      if (newQuantiy > stock) {
        toast.error("Product is out of stock");
        return false;
      }
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantiy } : item,
        ),
      );
    } else {
      if (quantity > stock) {
        toast.error("Product is out of stock");
        return false;
      }
      // If not exists, add new item to cart
      const newCartItem = {
        id: cartItemId,
        productId: product._id,
        productName: product.productName,
        color: variant.color,
        size: size,
        quantity: quantity,
        price: activeSizeDetail?.discount
          ? activeSizeDetail.discount
          : activeSizeDetail?.price
            ? activeSizeDetail.price
            : product.discount
              ? product.discount
              : product.price,
        image: variant?.imageGallery?.[0],
        stock: stock,
      };
      setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
    }
    return true;
  };

  const removeFromCart = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== id),
    );
  };

  const updateCartItemQuantity = (id, quantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item,
      ),
    );
  };

  const calculateTotalPrice = () => {
    if (cartItems.length === 0) {
      return 0;
    }
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const calculateTotalItem = () => {
    if (cartItems.length === 0) {
      return 0;
    }
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  //fetch location data
  const { data: locations, isLoading: locationsLoading } = useQuery({
    queryKey: ["locations"],
    queryFn: getAllLocations,
  });

  //fetch shipping data
  const { data: shippingRates, isLoading: shippingRatesLoading } = useQuery({
    queryKey: ["shippingRates"],
    queryFn: getAllShippingRates,
  });

  const [deliveryAdd, setDeliveryAdd] = useState(null);

  //get delivery charge
  const [shippingPrice, setShippingPrice] = useState(null);

  useEffect(() => {
    if (deliveryAdd) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/shippingRates/getShippingRateByDistrict?district=${deliveryAdd}`,
      )
        .then((res) => res.json())
        .then((data) => setShippingPrice(data));
    }
  }, [deliveryAdd]);

  //categories

  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const data = {
    newUser,
    setNewUser,
    loading,
    products,
    productsLoading,
    cartItems,
    isHydrated,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    calculateTotalPrice,
    calculateTotalItem,
    locations,
    locationsLoading,
    shippingRates,
    shippingRatesLoading,
    deliveryAdd,
    setDeliveryAdd,
    shippingPrice,
    categories,
    categoriesLoading,
    categoriesError,
  };

  return <MyContext value={data}>{children}</MyContext>;
};

export default MyProvider;
