"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { LuPlus, LuSlidersHorizontal, LuTrash2 } from "react-icons/lu";
import { getAllAttribute } from "@/api/attributeApi";
import { useRef } from "react";
import AttributeCard from "./AttributeCard";

export default function AttributeTableTwo() {
  const queryClient = useQueryClient();
  const AddAttributeModalRef = useRef(null);

  const {
    data: attributes = [],
    isLoading: isLoadingAttributes,
    isError: isErrorAttributes,
  } = useQuery({
    queryKey: ["attributes"],
    queryFn: getAllAttribute,
  });

  const deleteAttributeMutation = useMutation({
    mutationFn: () => console.log("delete"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attributes"] });
      toast.warn("Catalog attribute definition has been removed.");
    },
  });

  return (
    <div className="space-y-6" id="admin-attributes-tab">
      {/* List rendering */}
      {isLoadingAttributes ? (
        <div className="flex justify-center p-12">
          <span className="loading loading-spinner text-indigo-600"></span>
        </div>
      ) : attributes.length === 0 ? (
        <div className="p-8 text-center border bg-white rounded-2xl shadow-2xs">
          <LuSlidersHorizontal className="w-10 h-10 text-slate-350 mx-auto" />
          <p className="text-xs text-slate-500 mt-2">
            No product variation attributes found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {attributes.map((attr) => (
            <AttributeCard key={attr.slug} attribute={attr} />
          ))}
        </div>
      )}
    </div>
  );
}
