import { useForm } from "react-hook-form";
import districts from "@/json/districts.json";
import Select from "react-select";

const ShippingForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      thana: "",
      district: "",
      comment: "",
    },
  });

  const districtOptions = districts.map((district) => ({
    value: district.name.en,
    label: district.name.en,
  }));

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
      <div className="flex justify-baseline items-center gap-5">
        <div className="fieldset flex-1">
          <label htmlFor="firstName" className="label">
            First Name
          </label>
          <input
            type="text"
            className="input w-full"
            {...register("firstName", { required: "First Name is Required" })}
          />
          {errors.firstName && (
            <p className="text-red-600">{errors.firstName.message}</p>
          )}
        </div>
        <div className="fieldset flex-1">
          <label htmlFor="lastName" className="label">
            Last Name
          </label>
          <input
            type="text"
            className="input w-full"
            {...register("lastName", { required: "Last Name is Required" })}
          />
          {errors.lastName && (
            <p className="text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>
      <label htmlFor="address" className="label">
        Address
      </label>
      <input
        type="text"
        className="input w-full"
        {...register("address", { required: "Address is Required" })}
      />
      {errors.address && (
        <p className="text-red-600">{errors.address.message}</p>
      )}
      <div className="flex justify-baseline items-center gap-5">
        <div className="fieldset flex-1">
          <label htmlFor="thana" className="label">
            Upazilla/Thana
          </label>
          <input
            type="text"
            className="input w-full"
            {...register("thana", { required: "Upazilla/Thana is Required" })}
          />
          {errors.thana && (
            <p className="text-red-600">{errors.thana.message}</p>
          )}
        </div>
        <div className="fieldset flex-1">
          <label htmlFor="district" className="label">
            District
          </label>
          <Select
            defaultValue={districtOptions[17]}
            options={districtOptions}
            label="District"
            name="district"
            control={control}
          />
          {errors.district && (
            <p className="text-red-600">{errors.district.message}</p>
          )}
        </div>
      </div>
      <div className="flex justify-baseline items-center gap-5">
        <div className="fieldset flex-1">
          <label htmlFor="phone" className="label">
            Phone
          </label>
          <input
            type="tel"
            className="input w-full"
            {...register("phone", { required: "Phone Number is Required" })}
          />
          {errors.phone && (
            <p className="text-red-600">{errors.phone.message}</p>
          )}
        </div>
        <div className="fieldset flex-1">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            className="input w-full"
            {...register("email", { required: "Email is Required" })}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>
      <label htmlFor="comment" className="label">
        Comment
      </label>
      <textarea
        className="textarea w-full"
        rows={5}
        {...register("comment", { required: false })}
      ></textarea>
    </form>
  );
};

export default ShippingForm;
