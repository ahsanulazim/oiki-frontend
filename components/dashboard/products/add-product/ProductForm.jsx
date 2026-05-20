"use client";

import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { LuCloudUpload, LuX } from "react-icons/lu";
import ReactQuill from "react-quill-new";
import Variations from "./Variations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/api/productApi";
import { toast } from "react-toastify";
import Editor from "./Editor";

const ProductForm = ({ ref }) => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully");
      reset();
      setImages([]);
      setCoverIndex(0);
    },
    onError: () => {
      toast.error("Failed to create product");
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    //mutation.mutate(data);
  };

  const [images, setImages] = useState([]);
  const [coverIndex, setCoverIndex] = useState(0); // default first image cover

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (index === coverIndex) setCoverIndex(0); // reset cover if removed
  };

  useEffect(() => {
    setValue("productImages", images);
  }, [images, setValue]);

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
          <Editor control={control} errors={errors} />
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
                Discount
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
        <Variations
          register={register}
          control={control}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
        />
      </div>
      <div>
        <div className="fieldset bg-base-100 p-5 rounded-box">
          <h2 className="font-bold text-xl">Product Images</h2>
          <label className="label">Upload Images</label>
          <label
            className="border border-dashed border-main bg-main/5 rounded-box p-5 cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <LuCloudUpload className="text-main size-25" />
              <h3 className="text-base text-center max-w-55">
                Drag and Drop or click here to Upload Images
              </h3>
            </div>
            <input
              className="hidden"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          {/* Preview thumbnails */}
          {images.length > 0 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {images.map((src, i) => (
                <div key={i} className="relative">
                  <img
                    src={src}
                    alt={`preview-${i}`}
                    className="w-24 h-24 object-cover rounded-box border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                  >
                    <LuX size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {images.length === 0 && (
            <p className="text-red-600 text-sm mt-2">
              Upload at least one product image
            </p>
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
        <div className="fieldset bg-base-100 p-5 rounded-box mt-5">
          <h2 className="font-bold text-xl">Categories</h2>
          <label htmlFor="category" className="label">
            Select Category
          </label>
          <select
            defaultValue=""
            className="select w-full"
            {...register("category", { required: "Category is required" })}
          >
            <option value="" disabled={true}>
              Select a Category
            </option>
            <option value="kurti">Kurti</option>
            <option value="three-piece">Three-piece</option>
            <option value="two-piece">Two-piece</option>
          </select>
          {errors.category && (
            <p className="text-red-600">{errors.category.message}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
