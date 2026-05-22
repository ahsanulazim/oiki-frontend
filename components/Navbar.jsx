import Image from "next/image";
import Link from "next/link";
import {
  LuHeart,
  LuMenu,
  LuSearch,
  LuShoppingBag,
  LuUser,
} from "react-icons/lu";
import Search from "./Search";
import { FaMoon } from "react-icons/fa6";
import Cart from "./Cart";

const Navbar = () => {
  return (
    <header className="bg-base-100 border-b border-b-base-300 sticky top-0 z-30">
      <div className="navbar max-w-360 mx-auto gap-20">
        <div className="navbar-start lg:w-auto">
          <label
            htmlFor="my-drawer-2"
            aria-label="open sidebar"
            className="cursor-pointer lg:hidden"
          >
            <LuMenu className="inline-block h-6 w-6 stroke-current text-error" />
          </label>
          <Link href="/" className="hidden lg:block">
            <Image
              src="/assets/oiki-logo.svg"
              alt="oiki logo"
              width={65}
              height={30}
              className=""
            />
          </Link>
        </div>
        <div className="navbar-center flex-1">
          <Search />
          <Link href="/" className="block lg:hidden">
            <Image
              src="/assets/oiki-logo.svg"
              alt="oiki logo"
              width={100}
              height={100}
              className="min-w-12"
            />
          </Link>
        </div>
        <div className="navbar-end lg:w-auto">
          <button className="btn btn-outline border-main rounded-full mr-4 max-lg:hidden hover:[&>svg]:text-white hover:bg-main hover:text-white">
            <FaMoon className="h-5 w-5 animate-pulse text-main" />
            EID 2K26
          </button>
          <Link href="/login">
            <button className="hidden lg:inline-flex btn btn-main rounded-full">
              <LuUser className="size-[1.2rem]" />
              Account
            </button>
          </Link>
          <button className="btn btn-ghost btn-circle lg:hidden">
            <LuSearch className="h-5 w-5" />
          </button>
          <button className="btn btn-ghost btn-circle max-lg:hidden">
            <LuHeart className="h-5 w-5" />
          </button>
          <Cart />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
