import { createCategory } from "@/api/categoryApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { toast } from "react-toastify";

const CategoryModal = ({ ref }) => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      thumbnail: "",
    },
  });

  const convertBase24 = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue("thumbnail", reader.result, { shouldValidate: true });
      trigger("thumbnail");
    };
    reader.readAsDataURL(file);
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["categories"],
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully");
      reset();
      ref.current.close();
    },
    onError: () => {
      toast.error("Failed to create category");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add New Category</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
          <label className="label">Category Name</label>
          <input
            {...register("name", {
              required: "Category Name is required",
            })}
            type="text"
            className="input w-full"
            placeholder="Three Piece"
          />
          {errors.name && <p className=" text-error">{errors.name.message}</p>}

          <label className="label">Slug</label>
          <input
            {...register("slug", {
              required: "Slug is required",
              pattern: {
                value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                message: "Invalid slug format",
              },
            })}
            type="text"
            className="input w-full"
            placeholder="three-piece"
          />
          {errors.slug && <p className=" text-error">{errors.slug.message}</p>}

          <label className="label">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            className="file-input w-full"
            onChange={convertBase24}
          />

          <div className="mt-5 flex justify-end gap-5">
            <button
              type="button"
              onClick={() => {
                ref.current.close();
                reset();
              }}
              className="btn flex-1 btn-error"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={isPending || !isDirty}
              className="btn flex-1 btn-success"
            >
              {isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <LuPlus /> Create
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CategoryModal;
