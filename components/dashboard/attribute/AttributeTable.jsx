"use client";
import { getAllAttribute } from "@/api/attributeApi";
import { useQuery } from "@tanstack/react-query";
import { LuEye, LuTrash2 } from "react-icons/lu";
import AttributeDeleteModal from "./AttributeDeleteModal";
import { useRef, useState } from "react";
import Link from "next/link";

const AttributeTable = () => {
  const [attributeId, setAttributeId] = useState();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["attributes"],
    queryFn: getAllAttribute,
  });

  const attributeDeleteRef = useRef();

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {isLoading ? (
            <tr>
              <td colSpan="4" className="text-center">
                <span className="loading loading-spinner"></span>
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan="4" className="text-center">
                Something went wrong
              </td>
            </tr>
          ) : data.length <= 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No Data Found
              </td>
            </tr>
          ) : (
            data.map((attribute) => (
              <tr key={attribute.name}>
                <td>{attribute.name}</td>
                <td>{attribute.slug}</td>
                <td>
                  <span className="badge badge-info badge-soft border-info">
                    {attribute.attributeType}
                  </span>
                </td>
                <td>
                  <div className="flex gap-3">
                    <Link
                      href={`/dashboard/attributes/${attribute.slug}`}
                      className="btn btn-success btn-circle btn-soft"
                    >
                      <LuEye />
                    </Link>
                    <button
                      className="btn btn-error btn-circle btn-soft"
                      onClick={() => {
                        attributeDeleteRef.current.showModal();
                        setAttributeId(attribute._id);
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
      <AttributeDeleteModal ref={attributeDeleteRef} id={attributeId} />
    </div>
  );
};

export default AttributeTable;
