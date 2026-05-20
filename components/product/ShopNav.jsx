import Link from "next/link";
import { LuHouse } from "react-icons/lu";

const ShopNav = ({ category, product }) => {
  return (
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
              <Link href={`/products/${category}`}>Kurti</Link>
            </li>
            <li>{product?.productName}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ShopNav;
