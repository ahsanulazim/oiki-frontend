"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { LuCloudUpload } from "react-icons/lu";
import ReactQuill from "react-quill-new";

const ProductForm = ({ ref }) => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const queryClient = useQueryClient();

  //quill formats
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Heading options
      ["bold", "italic", "underline", "strike"], // Text styles
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ align: [] }], // Alignment
      ["blockquote", "code-block"], // Block styles
      ["link", "image"], // Links & Images
      ["clean"], // Remove formatting
    ],
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-3 gap-5"
    >
      <div className="col-span-2">
        <div className="fieldset bg-base-100 p-5 rounded-box">
          <h2 className="font-bold text-xl">Basic Information</h2>
          <label htmlFor="productName" className="label">
            Product Name<span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="Women's Fashionable Kurti"
            {...register("productName", { required: "Title is required" })}
          />
          {errors.productName && (
            <p className="text-red-600">{errors.productName.message}</p>
          )}

          <label className="label">
            Slug<span className="text-red-600">*</span>
          </label>
          <label className="input w-full">
            <span className="label">https://oiki.store/products/</span>
            <input
              type="text"
              placeholder="womens-fashionable-kurti"
              {...register("slug", { required: "Product Slug is Required" })}
            />
          </label>

          {errors.slug && <p className="text-red-600">{errors.slug.message}</p>}

          <label htmlFor="productDescription" className="label">
            Product Description<span className="text-red-600">*</span>
          </label>
          <Controller
            name="productDescription"
            rules={{ required: "Product Description is required" }}
            control={control}
            render={({ field }) => (
              <ReactQuill
                className="border border-gray-300 rounded-md"
                {...field}
                modules={modules}
                formats={formats}
              />
            )}
          />
          {errors.productDescription && (
            <p className="text-red-600">{errors.productDescription.message}</p>
          )}
        </div>
        <div className="fieldset bg-base-100 p-5 rounded-box mt-5">
          <h2 className="font-bold text-xl">Pricing</h2>
          <div className="flex gap-5 items-center">
            <div className="flex-1">
              <label htmlFor="price" className="label">
                Price<span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                className="input w-full"
                placeholder="1000"
                {...register("price", { required: "Price is required" })}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="discount" className="label">
                Discount<span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                className="input w-full"
                placeholder="1000"
                {...register("discount", { required: false })}
              />
            </div>
          </div>
          {errors.price && (
            <p className="text-red-600">{errors.price.message}</p>
          )}
        </div>
        <div className="fieldset bg-base-100 p-5 rounded-box mt-5">
          <h2 className="font-bold text-xl">Inventory</h2>
          <label htmlFor="sku" className="label">
            SKU
          </label>
          <input
            type="text"
            className="input w-full"
            placeholder="OIKIXYZ"
            {...register("sku", { required: false })}
          />

          <label className="label">Stock</label>
          <input
            type="number"
            placeholder="10"
            className="input w-full"
            {...register("stock", { required: false })}
          />
        </div>
      </div>
      <div>
        <div className="fieldset bg-base-100 p-5 rounded-box">
          <h2 className="font-bold text-xl">Product Images</h2>
          <label className="label">Upload Images</label>
          <label className="border border-dashed border-main bg-main/5 rounded-box p-5">
            <div className="flex flex-col items-center">
              <LuCloudUpload className="text-main size-25" />
              <h3 className="text-base text-center max-w-55">
                Drag and Drop or click here to Upload Images
              </h3>
            </div>
            <input className="hidden" type="file" />
          </label>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
