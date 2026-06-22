"use client";

import { getAllOrderData } from "@/api/orderApi";
import TakaSymbol from "@/components/ui/TakaSymbol";
import { useQuery } from "@tanstack/react-query";
import moment from "moment/moment";
import { LuEye, LuSearch, LuTrash2, LuTruck } from "react-icons/lu";
import OrderDeleteModal from "./OrderDeleteModal";
import { useRef, useState } from "react";
import Link from "next/link";

const TABS = [
  { key: "all", label: "All" },
  { key: "unpaid", label: "Unpaid" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
];

const OrderData = () => {
  const orderRef = useRef(null);
  const [activeTab, setActiveTab] = useState("all");
  const [orderId, setOrderId] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrderData,
  });

  // Tab filtering logic
  const filteredOrders = data?.orders?.filter((order) => {
    if (activeTab === "all") return true;
    // Unpaid: payment status akno paid hoyni (cod = pending payment)
    if (activeTab === "unpaid")
      return order.paymentStatus !== "paid" || order.paymentMethod === "cod";
    // Pending: fulfillment akno pending
    if (activeTab === "pending") return order.status === "pending";
    // Completed: fulfillment delivered
    if (activeTab === "completed") return order.status === "delivered";
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div role="tablist" className="tabs tabs-box">
          {TABS.map((tab) => (
            <a
              key={tab.key}
              role="tab"
              onClick={() => setActiveTab(tab.key)}
              className={`tab ${activeTab === tab.key ? "tab-active" : ""}`}
            >
              {tab.label}
            </a>
          ))}
        </div>
        <label className="input rounded-full">
          <input type="search" required placeholder="Search" />
          <LuSearch className="h-[1em] opacity-50" />
        </label>
      </div>
      <div className="my-5">
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-base-200">
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Date</th>
                <th>Customer</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Total</th>
                <th>Item</th>
                <th>Fulfillment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {isLoading ? (
                <tr>
                  <td className="text-center" colSpan={9}>
                    <span className="loading loading-spinner"></span>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td className="text-center" colSpan={9}>
                    <span className="text-error">Error</span>
                  </td>
                </tr>
              ) : filteredOrders?.length === 0 ? (
                <tr>
                  <td className="text-center" colSpan={9}>
                    <span>No Order</span>
                  </td>
                </tr>
              ) : (
                filteredOrders?.map((order) => (
                  <tr key={order._id}>
                    <th>
                      {" "}
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>{moment(order.createdAt).format("MMMM Do, YY")}</td>
                    <td>
                      {order.customer.firstName} {order.customer.lastName}
                    </td>
                    <td>{order.paymentMethod === "cod" ? "COD" : "Zinipay"}</td>
                    <td>
                      <div
                        className={`badge ${
                          order.paymentMethod === "cod"
                            ? "badge-warning"
                            : "badge-success"
                        } badge-soft `}
                      >
                        <div
                          className={`status ${
                            order.paymentMethod === "cod"
                              ? "status-warning"
                              : "status-success"
                          }`}
                        ></div>{" "}
                        {order.paymentMethod === "cod" ? "Pending" : "Paid"}
                      </div>
                    </td>
                    <td>
                      <TakaSymbol />
                      {order.totalPrice}
                    </td>
                    <td>
                      {order.products.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                      )}
                    </td>
                    <td>
                      <div
                        className={`badge ${
                          order.status === "pending"
                            ? "badge-warning"
                            : order.status === "processing"
                              ? "badge-info"
                              : order.status === "delivered"
                                ? "badge-success"
                                : "badge-error"
                        } badge-soft ${
                          order.status === "pending"
                            ? "border-warning"
                            : order.status === "processing"
                              ? "border-info"
                              : order.status === "delivered"
                                ? "border-success"
                                : "border-error"
                        }`}
                      >
                        <div
                          className={`status ${
                            order.status === "pending"
                              ? "status-warning"
                              : order.status === "processing"
                                ? "status-info"
                                : order.status === "delivered"
                                  ? "status-success"
                                  : "status-error"
                          }`}
                        ></div>{" "}
                        {order.status === "pending"
                          ? "Pending"
                          : order.status === "processing"
                            ? "Processing"
                            : order.status === "delivered"
                              ? "Delivered"
                              : order.status === "hold"
                                ? "Hold"
                                : "Cancelled"}
                      </div>
                    </td>
                    <td>
                      <div className="flex">
                        <Link
                          href={`/dashboard/orders/${order._id}`}
                          className="btn btn-circle btn-ghost btn-info"
                        >
                          <LuEye />
                        </Link>
                        <div
                          className="tooltip tooltip-left"
                          data-tip="Send to Courier"
                        >
                          <button className="btn btn-ghost btn-circle btn-success">
                            <LuTruck />
                          </button>
                        </div>
                        <button
                          className="btn btn-circle btn-ghost btn-error"
                          onClick={() => {
                            orderRef.current.showModal();
                            setOrderId(order._id);
                          }}
                        >
                          <LuTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <OrderDeleteModal id={orderId} ref={orderRef} />
        </div>
      </div>
    </div>
  );
};

export default OrderData;
