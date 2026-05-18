"use client";
import { addAttribute } from "@/api/varientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuPlus } from "react-icons/lu";

const AddAVariant = ({ variant }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addAttribute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attributes"] });
      reset();
      toast.success("Variant added successfully!");
    },
    onError: () => {
      toast.error("Failed to add variant. Please try again.");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({ data, slug: variant.data.slug });
  };

  return (
    <div className="">
      <h2 className="text-lg font-bold">Add New Variant</h2>
      <form
        className="fieldset bg-base-100 p-5 rounded-box mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="name" className="label">
          Name
        </label>
        <input
          type="text"
          placeholder="Red"
          className="input w-full"
          {...register("name", { required: "Variation Name is Required" })}
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        <label htmlFor="variantSlug" className="label">
          Slug
        </label>
        <input
          type="text"
          placeholder="red"
          className="input w-full"
          {...register("variantSlug", {
            required: "Variation slug is Required",
          })}
        />
        {errors.variantSlug && (
          <p className="text-red-600">{errors.variantSlug.message}</p>
        )}
        <label htmlFor="attribute" className="label">
          {variant.data.type === "button" ? "Add Button" : "Add Swatch"}
        </label>

        {variant.data.type === "button" ? (
          <input
            type="text"
            placeholder="S"
            className="input w-full"
            {...register("attribute", {
              required: "Variant attribute is Required",
            })}
          />
        ) : (
          <input
            type="color"
            className="size-10"
            {...register("attribute", {
              required: "Variant attribute is Required",
            })}
          />
        )}

        <button
          type="submit"
          className={`mt-5 btn ${mutation.isLoading ? "" : "btn-main"}`}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <LuPlus />
          )}
          Add Variant
        </button>
      </form>
    </div>
  );
};

export default AddAVariant;
