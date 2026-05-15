"use client";

import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import ProductForm from "@/components/dashboard/products/add-product/ProductForm";
import { useRef } from "react";
import { LuSave } from "react-icons/lu";

const page = () => {
  const formRef = useRef();

  return (
    <>
      <Breadcrumbs title="Products" subtitle="Add-Product" />
      <section className="mb-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">Add Product</h2>
          <button
            href="#"
            className="btn btn-main"
            type="submit"
            onClick={() => formRef.current.requestSubmit()}
          >
            <LuSave /> Save
          </button>
        </div>
      </section>
      <section>
        <div className="">
          <ProductForm ref={formRef} />
        </div>
      </section>
    </>
  );
};

export default page;
