"use client";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ErrorMessage from "@/src/components/reusable/ErrorMessage";
import RequiredField from "@/src/components/reusable/RequiredField";
import ButtonLoader from "@/src/components/reusable/ButtonLoader";
import { useRouter } from "next/navigation";
import { CreateCompanyDepartment } from "@/src/services/apiService/setup/Office/OfficeServices";
import toast from "react-hot-toast";
import { CompanyDepartmentType } from "@/types/types";
import { useParams } from "next/navigation";
function CreateDepartmentComp({
  clickedIdData,
}: {
  clickedIdData?: CompanyDepartmentType;
}) {
  const router = useRouter();
  const { departmentId } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      departmentName: "",
      departmentId: 0,
    },
  });

  useEffect(() => {
    if (clickedIdData) {
      setValue("departmentId", clickedIdData?.departmentId);
      setValue("departmentName", clickedIdData?.departmentName);
    }
  }, [setValue, clickedIdData]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await CreateCompanyDepartment(data);
      if (response?.status === 200) {
        toast.success(response?.message);
        router.push("/EmployeeSetup/Company/department");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const mainForm = (
    <div className="flex flex-col gap-5 mt-10 px-10 ">
      <h1 className="text-3xl font-bold">
        {!departmentId ? "Create" : "Edit"} Department
      </h1>
      <form action=" " onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-xl">
              Department Name <RequiredField />{" "}
            </label>
            <input
              className="inputStyle"
              type="text"
              {...register("departmentName", {
                required: "Department Name is required ",
              })}
              placeholder="Department Name"
            />
            {errors?.departmentName && (
              <ErrorMessage message={errors.departmentName.message} />
            )}
          </div>
        </div>
        <div className="sm:col-start-1 mt-5 flex items-end justify-start gap-x-6">
          <button
            type="button"
            className={"cancelButton"}
            onClick={() => router.push("/EmployeeSetup/Company/department")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={"submitButton"}
            disabled={isSubmitting ? true : false}
          >
            {isSubmitting ? <ButtonLoader /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );

  return <div>{mainForm}</div>;
}

export default CreateDepartmentComp;
