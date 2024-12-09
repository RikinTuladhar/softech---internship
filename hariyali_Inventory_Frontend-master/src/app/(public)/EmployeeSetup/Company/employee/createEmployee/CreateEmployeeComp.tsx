"use client";
import React, { useState } from "react";
import RequiredField from "@/src/components/reusable/RequiredField";
import { FieldValues, useForm } from "react-hook-form";
import ErrorMessage from "@/src/components/reusable/ErrorMessage";
import Loader from "@/src/components/reusable/Loader";
import {
  CreateCompanyEmployee,
  GetCompanyDepartment,
  GetCompanyPostByDepartmentId,
} from "@/src/services/apiService/setup/Office/OfficeServices";
import ButtonLoader from "@/src/components/reusable/ButtonLoader";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CompanyDepartmentType, CompanyPostType } from "@/types/types";
import Error from "@/src/components/reusable/Error";
import toast from "react-hot-toast";
function CreateEmployeeComp() {
  const router = useRouter();
  const [createUser, setCreateUser] = useState(false);
  const fallBackLink = "/EmployeeSetup/Company/employee";
  const {
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({});

  const {
    data: companyDepartment,
    isError: isErrorCompanyDepartment,
    isLoading: isLoadingCompanyDepartment,
  } = useQuery({
    queryKey: ["companyDepartment"],
    queryFn: GetCompanyDepartment,
  });

  const {
    data: postList,
    isError: isErrorCompanyPost,
    isLoading: isLoadingPost,
  } = useQuery({
    queryKey: ["postByDepartmentId", watch("departmentId")],
    queryFn: () => GetCompanyPostByDepartmentId(watch("departmentId")),
    enabled: !!watch("departmentId"),
  });

  if (isErrorCompanyDepartment || isErrorCompanyPost) return <Error />;

  //dropdown
  const departmentOptions = companyDepartment?.map(
    (item: CompanyDepartmentType, index: number) => {
      return (
        <option key={index} value={item.departmentId}>
          {" "}
          {item.departmentName}{" "}
        </option>
      );
    }
  );

  const postOptions = postList?.map((item: CompanyPostType, index: number) => {
    return (
      <option value={item.postId} key={index}>
        {item.postName}
      </option>
    );
  });

  const handleCreateUser = () => {
    setCreateUser((prev) => !prev);
    setValue("password", "");
  };
  const onSubmit = async (data: FieldValues) => {
    try {
      const { status, message } = await CreateCompanyEmployee(data);
      if (status === 200) {
        toast.success(message);
        router.push(fallBackLink);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const mainForm = (
    <div className="px-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold my-10">Create Empolyee</h1>
        <button
          onClick={() => handleCreateUser()}
          type="button"
          className={`${createUser ? "bg-red-600 text-white hover:bg-red-700" : "bg-green-600 text-white hover:bg-green-700"} h-12 px-3 rounded `}
        >
          {" "}
          {createUser ? "Don't create user" : "Create User"}
        </button>
      </div>
      <form
        action=""
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col gap-5"
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-lg">
              Department <RequiredField />{" "}
            </label>
            <select
              className="inputStyle"
              {...register("departmentId", {
                required: "Department is required ",
                valueAsNumber: true,
              })}
            >
              <option value={""} selected disabled>
                -- Select Department --
              </option>
              {departmentOptions}
            </select>
            {errors?.departmentId && (
              <ErrorMessage message={errors?.departmentId?.message} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-lg">
              Post <RequiredField />{" "}
            </label>
            <select
              className="inputStyle"
              {...register("postId", {
                required: "Post is required",
                valueAsNumber: true,
              })}
            >
              <option value={""} disabled selected>
                -- Select Post --
              </option>
              {postOptions}
            </select>
            {errors?.postId && (
              <ErrorMessage message={errors?.postId?.message} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-lg">
              Employee Name <RequiredField />{" "}
            </label>
            <input
              type="text"
              className="inputStyle"
              {...register("employeeName", {
                required: "Employee Name is required",
              })}
              placeholder="Employee Name"
            />
            {errors?.employeeName && (
              <ErrorMessage message={errors?.employeeName?.message} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-lg">
              Employee Contact <RequiredField />{" "}
            </label>
            <input
              type="text"
              className="inputStyle"
              {...register("employeeContactNumber", {
                required: "Employee Contact Number is required",
                pattern: {
                  value: /^9\d{9}$/,
                  message:
                    "Phone number must start with 9 and be 10 digits long",
                },
              })}
              placeholder="Contact Number"
            />
            {errors?.employeeContactNumber && (
              <ErrorMessage message={errors?.employeeContactNumber?.message} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-lg">
              Employee Email <RequiredField />{" "}
            </label>
            <input
              type="email"
              className="inputStyle"
              {...register("employeeEmail", {
                required: "Employee email is required",
              })}
              placeholder="Employee Email"
            />
            {errors?.employeeEmail && (
              <ErrorMessage message={errors?.employeeEmail?.message} />
            )}
          </div>
          {createUser && (
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-lg">
                Password <RequiredField />{" "}
              </label>
              <input
                type="text"
                className="inputStyle"
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="password"
              />
              {errors?.password && (
                <ErrorMessage message={errors?.password?.message} />
              )}
            </div>
          )}
        </div>
        <div className="flex gap-5 ">
          <button
            className="cancelButton"
            type="button"
            onClick={() => router.push(fallBackLink)}
          >
            Back
          </button>
          <button
            className="submitButton"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <ButtonLoader /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      {isLoadingCompanyDepartment || isLoadingPost ? <Loader /> : mainForm}
    </div>
  );
}

export default CreateEmployeeComp;
