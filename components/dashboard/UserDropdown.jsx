"use client";

import { useRef } from "react";
import LogoutModal from "./LogoutModal";
import { LuLogOut, LuSettings } from "react-icons/lu";
import { MyContext } from "@/context/MyProvider";
import Link from "next/link";
import { useContext } from "react";

const UserDropdown = () => {
  const logoutRef = useRef();

  const { newUser, loading } = useContext(MyContext);

  return (
    <>
      <LogoutModal ref={logoutRef} />
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar avatar-placeholder"
        >
          <div className="w-10 rounded-full bg-primary-content text-primary">
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <span className="text-lg">
                {newUser?.user?.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>
        <ul
          tabIndex="-1"
          className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <Link href="/dashboard/settings">
              <LuSettings /> Settings
            </Link>
          </li>
          <li>
            <button
              onClick={() => logoutRef.current.showModal()}
              className="text-error hover:bg-error hover:text-error-content"
            >
              <LuLogOut /> Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserDropdown;
