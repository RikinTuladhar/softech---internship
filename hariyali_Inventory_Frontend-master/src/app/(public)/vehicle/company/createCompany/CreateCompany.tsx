"use client";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { createVehicleCompany } from "@/src/services/apiService/vehicle/vehicleService";
import { useRouter } from "next/navigation";
import { Company } from "@/types/types";

export default function CreateCompany({
  clickedDataId,
}: {
  clickedDataId?: Company;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    setValue,
  } = useForm<FieldValues>({});

  useEffect(() => {
    if (clickedDataId) {
      setValue("id", clickedDataId?.id);
      setValue("name", clickedDataId?.name);
    }
  }, [clickedDataId, setValue]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await createVehicleCompany(data);
      if (response?.status === 200) {
        router.push("/vehicle/company");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const local = (
    <div className={" mx-3 mt-5"}>
      <h1 className={"text-2xl font-bold"}>Create Company</h1>

      <form
        className={"mt-5 flex flex-col gap-3"}
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className={"grid grid-cols-3 "}>
          <div className={"flex flex-col gap-2"}>
            <label className={"labelText"}>
              Company Name <span className={"text-red-600"}>*</span>{" "}
            </label>
            <input
              className={"inputStyle"}
              {...register("name", { required: "Name is required" })}
              placeholder={"Company Name"}
            />
            {errors?.name && (
              <p className={"text-red-600"}>{`${errors?.name?.message}`}</p>
            )}
          </div>
        </div>
        <div className={"flex gap-3 items-center"}>
          <button
            className={"cancelButton"}
            type={"button"}
            onClick={() => router.push(".")}
          >
            Cancel
          </button>
          <button className={"submitButton"} type={"submit"}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
  return <div>{local}</div>;
}
