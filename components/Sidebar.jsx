"use client";
import { getAllCategories } from "@/api/categoryApi";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Alert from "./Alert";
import Dock from "./Dock";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Sidebar = ({ children }) => {
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-2");
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  return (
    <div className="drawer">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col relative">
        {/* Alert */}
        <Alert />
        {/* Navbar */}
        <Navbar />
        {/* Page content here */}
        <main className="bg-base-200">{children}</main>
        <Footer />
        <Dock />
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li className="menu-title font-semibold text-base text-main mb-2">
            Categories
          </li>
          {categoriesLoading ? (
            <li>
              <div className="flex items-center justify-center py-4">
                <span className="loading loading-spinner loading-sm"></span>
              </div>
            </li>
          ) : categoriesError ? (
            <li className="text-error text-sm px-4 py-2">
              Failed to load categories
            </li>
          ) : Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <li key={category._id || category.slug}>
                <Link
                  href={`/products/${category.slug}`}
                  onClick={closeDrawer}
                >
                  {category.name}
                </Link>
              </li>
            ))
          ) : (
            <li className="text-sm px-4 py-2 text-base-content/60">
              No categories found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
