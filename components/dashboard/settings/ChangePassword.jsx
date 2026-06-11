import { useForm } from "@tanstack/react-form-nextjs";
import SettingsCard from "./SettingsCard";
import { passwordValidator } from "@/validators/passwordValidator";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [isHidden, setIsHidden] = useState({
    currentPass: true,
    newPass: true,
    confirmPass: true,
  });

  const handleTogglePassword = (fieldName) => {
    setIsHidden((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const { Subscribe, handleSubmit, reset, Field } = useForm({
    defaultValues: {
      currentPass: "",
      newPass: "",
      confirmPass: "",
    },
    validators: {
      onChange: passwordValidator,
      onSubmit: passwordValidator,
    },
    onSubmit: async ({ value }) => {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        user.email,
        value.currentPass,
      );
      try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, value.newPass);
        toast.success("Password changed successfully");
        reset();
      } catch (error) {
        toast.error("Current Password is incorrect");
      }
    },
  });

  return (
    <SettingsCard title="Change Password">
      <form
        className="fieldset"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <Field name="currentPass">
          {(field) => {
            const { errors } = field.state.meta;
            return (
              <>
                <label htmlFor={field.name} className="label">
                  Current Password
                </label>
                <label htmlFor={field.name} className="input w-full">
                  <input
                    type={isHidden.currentPass ? "password" : "text"}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="******"
                  />
                  <button type="button" className="cursor-pointer">
                    {isHidden.currentPass ? (
                      <LuEye
                        onClick={() => handleTogglePassword("currentPass")}
                      />
                    ) : (
                      <LuEyeOff
                        onClick={() => handleTogglePassword("currentPass")}
                      />
                    )}
                  </button>
                </label>
                {errors.length > 0 && (
                  <p className="text-red-500">{errors[0]?.message}</p>
                )}
              </>
            );
          }}
        </Field>
        <Field name="newPass">
          {(field) => {
            const { errors } = field.state.meta;
            return (
              <>
                <label htmlFor={field.name} className="label">
                  New Password
                </label>
                <label htmlFor={field.name} className="input w-full">
                  <input
                    type={isHidden.newPass ? "password" : "text"}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="******"
                  />
                  <button type="button" className="cursor-pointer">
                    {isHidden.newPass ? (
                      <LuEye onClick={() => handleTogglePassword("newPass")} />
                    ) : (
                      <LuEyeOff
                        onClick={() => handleTogglePassword("newPass")}
                      />
                    )}
                  </button>
                </label>
                {errors.length > 0 && (
                  <p className="text-red-500">{errors[0]?.message}</p>
                )}
              </>
            );
          }}
        </Field>
        <Field name="confirmPass">
          {(field) => {
            const { errors } = field.state.meta;
            return (
              <>
                <label htmlFor={field.name} className="label">
                  Confirm Password
                </label>
                <label htmlFor={field.name} className="input w-full">
                  <input
                    type={isHidden.confirmPass ? "password" : "text"}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="******"
                  />
                  <button type="button" className="cursor-pointer">
                    {isHidden.confirmPass ? (
                      <LuEye
                        onClick={() => handleTogglePassword("confirmPass")}
                      />
                    ) : (
                      <LuEyeOff
                        onClick={() => handleTogglePassword("confirmPass")}
                      />
                    )}
                  </button>
                </label>
                {errors.length > 0 && (
                  <p className="text-red-500">{errors[0]?.message}</p>
                )}
              </>
            );
          }}
        </Field>
        <div>
          <Subscribe
            children={({ canSubmit, isSubmitting, isDirty }) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting || !isDirty}
                className="btn btn-success"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span> Saving
                  </>
                ) : (
                  "Save"
                )}
              </button>
            )}
          />
        </div>
      </form>
    </SettingsCard>
  );
};

export default ChangePassword;
