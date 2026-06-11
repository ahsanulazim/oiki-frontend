"use client";

import { useRef } from "react";
import LogoutModal from "./LogoutModal";

const UserDropdown = () => {
  const logoutRef = useRef();

  return (
    <>
      <LogoutModal ref={logoutRef} />
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex="-1"
          className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <a>Settings</a>
          </li>
          <li>
            <button
              onClick={() => logoutRef.current.showModal()}
              className="text-error hover:bg-error hover:text-error-content"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserDropdown;
