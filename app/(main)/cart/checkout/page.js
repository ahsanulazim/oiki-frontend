"use client";

import Link from "next/link";
import { LuHouse } from "react-icons/lu";
import { useContext, useEffect } from "react";
import { MyContext } from "@/context/MyProvider";
import { useRouter } from "next/navigation";
import ShippingForm from "@/components/cart/checkout/ShippingForm";
import Overview from "@/components/cart/Overview";

const page = () => {
  const router = useRouter();
  const { cartItems } = useContext(MyContext);

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems, router]);

  return (
    <>
      <section className="px-5">
        <div className="max-w-360 mx-auto">
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link href="/">
                  <LuHouse />
                </Link>
              </li>
              <li>
                <Link href="/cart">Cart</Link>
              </li>
              <li>Checkout</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="px-5 mb-5">
        <div className="max-w-360 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <div className="border border-base-300 p-5 rounded-box">
              <h2 className="text-xl font-bold">Shipping & Billing</h2>
              <div className="divider"></div>
              <div>
                <ShippingForm />
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <Overview isCheckout={true} />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
