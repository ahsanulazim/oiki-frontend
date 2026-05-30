import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import OrderDataAccordion from "@/components/dashboard/orders/OrderDataAccordion";
import OrderDataCard from "@/components/dashboard/orders/OrderDataCard";
import moment from "moment";
import Link from "next/link";
import {
  LuArrowLeft,
  LuMail,
  LuPhone,
  LuShoppingBasket,
  LuTruck,
  LuUser,
  LuX,
} from "react-icons/lu";

const page = async ({ params }) => {
  const { order } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/getOrderDetails?orderId=${order}`,
  );
  const orderData = await res.json();

  if (!orderData.success) {
    return <div>Order not found</div>;
  }

  console.log(orderData);

  return (
    <>
      <Breadcrumbs title="Orders" subtitle="Order Details" />
      <section className="mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/orders">
              <button className="btn btn-square">
                <LuArrowLeft />
              </button>
            </Link>
            <div>
              <h2 className="font-bold text-2xl">Order Details</h2>
              <p className="opacity-50 text-xs">
                Order created at{" "}
                {moment(orderData.order?.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>
          </div>
          <button className="btn btn-error">
            <LuX /> Cancel Order
          </button>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-4">
            <OrderDataAccordion title={"Order Items"}>
              <div className="collapse-content text-sm">
                Click the "Sign Up" button in the top right corner and follow
                the registration process.
              </div>
            </OrderDataAccordion>
          </div>
          <div className="col-span-1 flex flex-col gap-5">
            <OrderDataCard>
              <h3 className="p-4 pb-2 font-semibold">Customer</h3>
              <ul className="flex flex-col gap-1 p-4 pt-0 opacity-70 text-sm">
                <li className="flex items-center gap-2">
                  <div>
                    <LuUser />
                  </div>
                  <div>
                    {orderData.order?.customer.firstName}{" "}
                    {orderData.order?.customer.lastName}
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <div>
                    <LuShoppingBasket />
                  </div>
                  <div>
                    {orderData.order?.products.length}{" "}
                    {orderData.order?.products.length === 1 ? "Item" : "Items"}
                  </div>
                </li>
              </ul>
            </OrderDataCard>
            <OrderDataCard>
              <h3 className="p-4 pb-2 font-semibold">Contact Information</h3>
              <ul className="flex flex-col gap-1 p-4 pt-0 opacity-70 text-sm">
                <li className="flex items-center gap-2">
                  <div>
                    <LuMail />
                  </div>
                  <div>
                    {orderData.order?.customer.email || "No Email Provided"}
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <div>
                    <LuPhone />
                  </div>
                  <div>
                    {orderData.order?.customer.phone ||
                      "No Phone Number Provided"}
                  </div>
                </li>
              </ul>
            </OrderDataCard>
            <OrderDataCard>
              <h3 className="p-4 pb-2 font-semibold">Shipping Address</h3>
              <ul className="flex flex-col gap-1 p-4 pt-0 opacity-70 text-sm">
                <li className="flex items-center gap-2">
                  <div>
                    <LuTruck />
                  </div>
                  <div>Dio Lupa</div>
                </li>
              </ul>
            </OrderDataCard>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
