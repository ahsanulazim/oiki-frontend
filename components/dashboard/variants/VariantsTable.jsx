"use client";

import { LuEye, LuTrash2 } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { getVariants } from "@/api/varientApi";
import Link from "next/link";

const VariantsTable = () => {
  const { data: variants, isLoading } = useQuery({
    queryKey: ["variants"],
    queryFn: getVariants,
  });

  return (
    <div className="col-span-3">
      <h2 className="text-lg font-bold">All Variants</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {isLoading ? (
              <tr>
                <td colSpan="3" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              variants?.data.map((variant) => (
                <tr key={variant.name}>
                  <td>{variant.name}</td>
                  <td>{variant.type}</td>
                  <td>
                    <div className="flex gap-3">
                      <Link
                        href={`/dashboard/variants/${variant.slug}`}
                        className="btn btn-circle btn-success"
                      >
                        <LuEye />
                      </Link>
                      <button className="btn btn-circle btn-error">
                        <LuTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VariantsTable;
