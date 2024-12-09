"use client";
import { FieldValues, useForm } from "react-hook-form";
import { Company } from "@/types/types";
import { useRouter } from "next/navigation";
import { CreateVehicleUse } from "@/src/services/apiService/vehicle/vehicleService";
import { useEffect } from "react";

export default function CreateVehicleUseComp({
  clickedDataId,
}: {
  clickedDataId?: Company;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({});
  useEffect(() => {
    if (clickedDataId) {
      setValue("id", clickedDataId?.id);
      setValue("name", clickedDataId?.name);
    }
  }, [clickedDataId, setValue]);
  const onSubmit = async (data: FieldValues) => {
    try {
      const { status } = await CreateVehicleUse(data);
      if (status === 200) {
        router.push("/vehicle/use");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={"mt-8 mx-3"}>
        <h1 className={"text-xl font-bold"}>Create Vehicle Use</h1>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div>
            <div className={"grid grid-cols-3"}>
              <div className={"flex flex-col gap-2"}>
                <label>
                  Vehicle Use <span className={"text-red-600"}>*</span>
                </label>
                <input
                  className={"inputStyle"}
                  {...register("name", { required: "Name is required" })}
                  placeholder={"name"}
                />
                {errors?.name && (
                  <p className={"text-red-600"}>{`${errors?.name?.message}`}</p>
                )}
              </div>
            </div>
            <div className={"flex mt-3 gap-2"}>
              <button
                className={"cancelButton"}
                onClick={() => router.push(".")}
                type={"button"}
              >
                Cancel
              </button>
              <button className={"submitButton"} type={"submit"}>
                {isSubmitting ? "Submitting ..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
