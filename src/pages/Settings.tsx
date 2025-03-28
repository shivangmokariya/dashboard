import Breadcrumb from "../components/Breadcrumb";
import userThree from "../images/user/user-03.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useEffect } from "react";
import FileUpload from "../components/FileUpload";

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name cannot exceed 50 characters"),

  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+?\d{10,15}$/, "Invalid phone number format"),

  emailAddress: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),

  username: yup
    .string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username cannot exceed 20 characters"),

  bio: yup
    .string()
    .max(200, "Bio cannot exceed 200 characters"),
});

const Settings = () => {
  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    const savedData = localStorage.getItem("formDetails");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      reset(parsedData);
    }
  }, [reset]);

  const onSubmit = (data: any) => {
    console.log("Form Saved:", data);
    localStorage.setItem("formDetails", JSON.stringify(data));
    toast.success("Data saved successfully!");
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Personal Information</h3>
              </div>

              <div className="p-7">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                    {/* Full Name */}
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
                        Full Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        id="fullName"
                        placeholder="Devid Jhon"
                        {...register("fullName")}
                      />
                      {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
                        Phone Number
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
                        type="text"
                        id="phoneNumber"
                        placeholder="+990 3343 7865"
                        {...register("phoneNumber")}
                      />
                      {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="emailAddress">
                      Email Address
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
                      type="email"
                      id="emailAddress"
                      placeholder="devidjond45@gmail.com"
                      {...register("emailAddress")}
                    />
                    {errors.emailAddress && <p className="text-red-500">{errors.emailAddress.message}</p>}
                  </div>

                  {/* Username */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
                      type="text"
                      id="username"
                      placeholder="devidjhon24"
                      {...register("username")}
                    />
                    {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                  </div>

                  {/* Bio */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="bio">
                      BIO
                    </label>
                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
                      id="bio"
                      rows={4}
                      placeholder="Write your bio here"
                      {...register("bio")}
                    />
                    {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black dark:border-strokedark dark:text-white"
                      type="button"
                      onClick={() => reset()}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Profile Picture Section */}
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Your Photo</h3>
              </div>
              <div className="p-7">
                <form>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <img src={userThree} alt="User" />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black dark:border-strokedark dark:text-white"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
                <FileUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
