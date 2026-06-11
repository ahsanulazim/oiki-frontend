"use client";

import { api } from "@/axios/axiosInstance";
import { auth } from "@/firebase/firebase.config";
import { useForm } from "@tanstack/react-form-nextjs";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuEye, LuEyeOff, LuTriangleAlert } from "react-icons/lu";
import { toast } from "react-toastify";

const AcDeleteModal = ({ ref }) => {
  const [isHidden, setIsHidden] = useState(false);

  const router = useRouter();

  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: {
      retypePass: "",
    },
    onSubmit: async ({ value }) => {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        user.email,
        value.retypePass,
      );
      try {
        await reauthenticateWithCredential(user, credential);
        await api.delete("/users/deleteUser", {
          params: {
            email: user.email,
          },
        });
        await deleteUser(user);
        toast.success("Account has been closed");
        reset();
        ref.current.close();
        router.push("/");
      } catch (error) {
        console.log(error.response.data.message);
        toast.error("Failed to close account");
      }
    },
  });

  return (
    <dialog ref={ref} className="modal">
      <form
        className="modal-box"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <div className="flex items-center gap-2 font-bold text-lg text-red-600">
          <LuTriangleAlert />
          <span>Close Account</span>
        </div>
        <p className="py-4">
          Are you sure you want to close your account permanently?
        </p>
        <div className="mb-3">
          <Field
            name="retypePass"
            validators={{
              onChange: ({ value }) =>
                !value ? "Password is required" : undefined,
              onSubmit: ({ value }) =>
                !value ? "Password is required" : undefined,
            }}
          >
            {(field) => {
              const { errors } = field.state.meta;
              const {
                name,
                handleChange,
                handleBlur,
                state: { value },
              } = field;
              return (
                <>
                  <label htmlFor={name} className="label">
                    <span>Write your password to confirm</span>
                  </label>
                  <label
                    htmlFor={name}
                    className={`input w-full focus-within:outline-none focus:outline-none ${errors[0]?.message && "border border-red-600"}`}
                  >
                    <input
                      type={isHidden ? "text" : "password"}
                      placeholder="******"
                      name={name}
                      value={value}
                      onBlur={handleBlur}
                      onChange={(e) => handleChange(e.target.value)}
                    />

                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => setIsHidden(!isHidden)}
                    >
                      {isHidden ? <LuEye /> : <LuEyeOff />}
                    </button>
                  </label>
                  {errors.length > 0 && (
                    <span className="text-red-600">{errors[0]?.message}</span>
                  )}
                </>
              );
            }}
          </Field>
        </div>

        <div className="flex items-center gap-5">
          <Subscribe>
            {({ canSubmit, isSubmitting, isDirty }) => (
              <button
                type="submit"
                className="btn btn-error flex-1"
                disabled={!canSubmit || isSubmitting || !isDirty}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Deactivating
                  </>
                ) : (
                  "Deactivate Account"
                )}
              </button>
            )}
          </Subscribe>
          <button
            type="button"
            onClick={() => ref.current.close()}
            className="btn flex-1"
          >
            Leave
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default AcDeleteModal;
