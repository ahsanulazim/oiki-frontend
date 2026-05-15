"use client";

import DashNav from "@/components/dashboard/DashNav";
import { MyContext } from "@/context/MyProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { LuBox, LuLayoutDashboard, LuSettings2 } from "react-icons/lu";

const layout = ({ children }) => {
  const { newUser, loading } = useContext(MyContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !newUser) {
      router.push("/login");
    }
  }, [loading, newUser, router]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <DashNav />
        {/* Page content here */}
        <main className="p-4 bg-base-300 min-h-[calc(100dvh-64px)]">
          {children}
        </main>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                href="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard"
              >
                {/* Home icon */}
                <LuLayoutDashboard className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/products"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Products"
              >
                {/* Home icon */}
                <LuBox className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Products</span>
              </Link>
            </li>

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <LuSettings2 className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default layout;
