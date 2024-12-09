"use client";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CreateUnit } from "@/src/services/apiService/setup/unit/unitServices";
import { UnitType } from "@/types/types";

export default function CreateUnits({
  clickedIdData,
}: {
  clickedIdData?: UnitType;
}) {
  const router = useRouter();
  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
  } = useForm();
  const watchFields = watch();
  useEffect(() => {
    if (clickedIdData) {
      setValue("id", clickedIdData?.id);
      setValue("name", clickedIdData?.name);
      setValue("symbol", clickedIdData?.symbol);
      setValue("isDeleted", clickedIdData?.isDeleted);
    }
  }, [clickedIdData, setValue]);
  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await CreateUnit(data);
      if (response?.status === 200) {
        router.push(`/office/category/unit`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-10">
      <div>
        <h1 className="font-bold text-xl mt-16">Units</h1>
      </div>
      <form action="" onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="" className="text-lg font-medium py-2">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="inputStyle"
              placeholder="Eg. 'Kilogram'"
              {...register("name", { required: "Unit name is required" })}
            />
            {/* {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )} */}
          </div>

          <div>
            <label htmlFor="" className="text-lg font-medium py-2">
              Symbol <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="inputStyle"
              placeholder="Eg. 'Kg'"
              {...register("symbol", { required: "Unit symbol is required" })}
            />
            {/* {errors.symbol && (
              <p className="text-red-600">{errors.symbol.message}</p>
            )} */}
          </div>
        </div>
        <div className="flex gap-5 my-3">
          <button
            className="cancelButton"
            onClick={(e) => {
              e.preventDefault();
              router.push(".");
            }}
          >
            Cancel
          </button>
          <button className="submitButton" type="submit">
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
