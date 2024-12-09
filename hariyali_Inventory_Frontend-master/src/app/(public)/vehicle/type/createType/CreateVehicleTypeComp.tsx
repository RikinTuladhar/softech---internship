"use client";
import { FieldValues, useForm } from "react-hook-form";
import { CreateVehicleType } from "@/src/services/apiService/vehicle/vehicleService";

import { Company } from "@/types/types";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateVehicleTypeComp({
  clickedDataId,
}: {
  clickedDataId?: Company;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  const router = useRouter();
  useEffect(() => {
    if (clickedDataId) {
      setValue("id", clickedDataId?.id);
      setValue("name", clickedDataId?.name);
    }
  }, [clickedDataId, setValue]);
  const onSubmit = async (data: FieldValues) => {
    try {
      const { status } = await CreateVehicleType(data);
      if (status === 200) {
        router.push(`/vehicle/type`);
      }
    } catch (error) {}
  };
  const local = (
    <div className={" mx-3 mt-5"}>
      <h1 className={"text-2xl font-bold"}>Create Vehicle Type</h1>

      <form
        className={"mt-5 flex flex-col gap-3"}
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className={"grid grid-cols-3 "}>
          <div className={"flex flex-col gap-2"}>
            <label className={"labelText"}>
              Type Name <span className={"text-red-600"}>*</span>{" "}
            </label>
            <input
              className={"inputStyle"}
              {...register("name", { required: "Name is required" })}
              placeholder={"Vehicle Type Name"}
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
