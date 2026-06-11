"use client";
import { LuSave, LuSquarePen, LuX } from "react-icons/lu";
import SettingsCard from "./SettingsCard";
import { useForm } from "@tanstack/react-form-nextjs";
import { MyContext } from "@/context/MyProvider";
import { useContext, useState } from "react";

const ProfileForm = () => {
  const { newUser } = useContext(MyContext);

  const [isEdit, setIsEdit] = useState({
    name: false,
    email: false,
  });

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      name: newUser?.user?.name,
      email: newUser?.user?.email,
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <SettingsCard title="Profile Management">
      <form
        className="flex gap-5 items-start"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <div className="avatar">
          <div className="w-32 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="fieldset flex-1">
          <label htmlFor="name" className="label">
            Name
          </label>
          <div className="flex gap-2">
            {!isEdit.name && (
              <>
                <p className="text-base font-semibold">{newUser?.user?.name}</p>
                <button
                  type="button"
                  className="btn btn-square btn-xs btn-info"
                  onClick={() => setIsEdit({ ...isEdit, name: !isEdit.name })}
                >
                  <LuSquarePen />
                </button>
              </>
            )}
          </div>
          <Field name="name">
            {(field) => {
              const { errors } = field.state.meta;
              return (
                isEdit.name && (
                  <div className="flex gap-2">
                    <label htmlFor={field.name} className="input w-full">
                      <input
                        type="text"
                        className="grow"
                        defaultValue={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Md Abdur Rahman"
                      />
                    </label>
                    <button
                      disabled={field.state.meta.isDefaultValue}
                      className="btn btn-square btn-success self-end"
                    >
                      <LuSave />
                    </button>
                    <button
                      type="button"
                      className="btn btn-error btn-square btn-outline"
                      onClick={() =>
                        setIsEdit({ ...isEdit, name: !isEdit.name })
                      }
                    >
                      <LuX />
                    </button>
                  </div>
                )
              );
            }}
          </Field>
          <div className="divider my-0"></div>
          <label htmlFor="email" className="label">
            Email
          </label>
          {!isEdit.email && (
            <div className="flex gap-2">
              <p className="text-base font-semibold">{newUser?.user?.email}</p>
              <button
                className="btn btn-square btn-xs btn-info"
                onClick={() => setIsEdit({ ...isEdit, email: !isEdit.email })}
              >
                <LuSquarePen />
              </button>
            </div>
          )}
          <Field name="email">
            {(field) => {
              const { errors } = field.state.meta;
              return (
                isEdit.email && (
                  <div className="flex gap-2">
                    <label htmlFor={field.name} className="input w-full">
                      <input
                        type="email"
                        className="grow"
                        defaultValue={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </label>
                    <button
                      disabled={field.state.meta.isDefaultValue}
                      className="btn btn-square btn-success self-end"
                    >
                      <LuSave />
                    </button>
                    <button
                      type="button"
                      className="btn btn-error btn-square btn-outline"
                      onClick={() =>
                        setIsEdit({ ...isEdit, email: !isEdit.email })
                      }
                    >
                      <LuX />
                    </button>
                  </div>
                )
              );
            }}
          </Field>
        </div>
      </form>
    </SettingsCard>
  );
};

export default ProfileForm;
