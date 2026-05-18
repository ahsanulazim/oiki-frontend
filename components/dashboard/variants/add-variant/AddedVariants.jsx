"use client";
import { getAttributes } from "@/api/varientApi";
import { useQuery } from "@tanstack/react-query";
import { LuEye, LuTrash2 } from "react-icons/lu";

const AddedVariants = ({ slug }) => {
  const { data: attributes, isLoading } = useQuery({
    queryKey: ["attributes", slug],
    queryFn: getAttributes,
  });

  console.log(attributes);

  return (
    <div className="col-span-3">
      <h2 className="text-lg font-bold">All Variants</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Value</th>
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
            ) : attributes?.data <= 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  No attributes found.
                </td>
              </tr>
            ) : (
              attributes?.data.map((attribute) => (
                <tr key={attribute.name}>
                  <td>{attribute.name}</td>
                  <td>{attribute.variantSlug}</td>
                  <td>
                    {attribute.slug === "color" ? (
                      <div
                        className="size-10"
                        style={{ backgroundColor: attribute.attribute }}
                      ></div>
                    ) : (
                      <>{attribute.attribute}</>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-3">
                      <button className="btn btn-circle btn-success">
                        <LuEye />
                      </button>
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

export default AddedVariants;
