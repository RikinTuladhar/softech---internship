"use client";
import React, { useEffect } from "react";
import RequiredField from "@/src/components/reusable/RequiredField";
import ErrorMessage from "@/src/components/reusable/ErrorMessage";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import ButtonLoader from "@/src/components/reusable/ButtonLoader";
import { CompanyDepartmentType, CompanyPostType } from "@/types/types";
import {
  GetCompanyDepartment,
  CreateCompanyPost,
} from "@/src/services/apiService/setup/Office/OfficeServices";

import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

function CreatePostComp({
  clickedIdData,
}: {
  clickedIdData?: CompanyPostType;
}) {
  const router = useRouter();
  const fallBackLink = "/EmployeeSetup/Company/post";
  const {
    data: companyDepartment,
    isError: companyDepartmentError,
    isLoading: companyDepartmentLoading,
  } = useQuery({
    queryKey: ["companyDepartment"],
    queryFn: GetCompanyDepartment,
  });
  if (companyDepartmentError) return <Error />;
  const {
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({});

  useEffect(() => {
    if (clickedIdData) {
      setValue("postId", clickedIdData.postId);
      setValue("postName", clickedIdData.postName);
      setValue("departmentId", clickedIdData?.departmentId);
    }
  }, [setValue, clickedIdData]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await CreateCompanyPost(data);
      if (response?.status === 200) {
        toast.success(response?.message);
        router.push(fallBackLink);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  //dropdown options

  const departmentOptions = companyDepartment?.map(
    (item: CompanyDepartmentType, index: number) => {
      return (
        <option key={index} value={item.departmentId}>
          {item.departmentName}
        </option>
      );
    }
  );

  const mainForm = (
    <div className="px-10">
      <div>
        <h1 className="text-2xl font-bold my-10">Create Post</h1>
      </div>
      <form
        action=""
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col gap-5"
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-xl">
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
            <label htmlFor="" className="text-xl">
              Post <RequiredField />{" "}
            </label>
            <input
              type="text"
              className="inputStyle"
              placeholder="Post Name"
              {...register("postName", { required: "Post name is required" })}
            />
            {errors?.postName && (
              <ErrorMessage message={errors?.postName?.message} />
            )}
          </div>
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

  return <div>{companyDepartmentLoading ? <Loader /> : mainForm}</div>;
}

export default CreatePostComp;
