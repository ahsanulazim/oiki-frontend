import { LuEllipsis, LuStar } from "react-icons/lu";

const ProductData = () => {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Category</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                </div>
              </div>
            </td>
            <td>OK123</td>
            <td>$10000</td>
            <td>Kurti</td>
            <td>
              <button className="btn btn-circle btn-ghost btn-warning">
                <LuStar />
              </button>
            </td>
            <td>
              <button className="btn btn-ghost btn-circle">
                <LuEllipsis />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductData;
