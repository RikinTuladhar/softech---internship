"use client";
import { FieldValues, useForm } from "react-hook-form";
import {
  GetVehicleCategory,
  getVehicleCompany,
  GetVehicleType,
  GetVehicleUse,
  CreateVehicle,
} from "@/src/services/apiService/vehicle/vehicleService";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Company, Vehicle } from "@/types/types";
import Loader from "@/src/components/reusable/Loader";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
import "nepali-datepicker-reactjs/dist/index.css";
import React, { useState, useEffect } from "react";
const GetVehicleCompany = async () => {
  const { data } = await getVehicleCompany();
  return data;
};
const getVehicleCategory = async () => {
  const { data } = await GetVehicleCategory();
  return data;
};
const getVehicleUse = async () => {
  const { data } = await GetVehicleUse();
  return data;
};
const getVehicleType = async () => {
  const { data } = await GetVehicleType();
  return data;
};

const aa = new BikramSambat(new Date()).toBS();

export default function CreateVehicleComp({
  clickedDataId,
}: {
  clickedDataId?: Vehicle;
}) {
  const [purchaseDate, setPurchaseDate] = useState(aa);
  const [givenDate, setGivenDate] = useState("");
  const [renewDate, setRenewDate] = useState("");
  console.log(clickedDataId, "response");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({});

  const {
    data: VehicleCompany,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["VehicleCompany"],
    queryFn: GetVehicleCompany,
  });
  const VehicleCompanyOptions = VehicleCompany?.map(
    (item: Company, index: number) => {
      return (
        <option value={item.id} key={index}>
          {item.name}
        </option>
      );
    },
  );
  const { data: VehicleType } = useQuery({
    queryKey: ["vehicleType"],
    queryFn: getVehicleType,
  });
  const VehicleTypeOptions = VehicleType?.map(
    (item: Company, index: number) => {
      return (
        <option value={item.id} key={index}>
          {item.name}
        </option>
      );
    },
  );
  const { data: VehicleUse } = useQuery({
    queryKey: ["vehicleUse"],
    queryFn: getVehicleUse,
  });
  const VehicleUseOptions = VehicleUse?.map((item: Company, index: number) => {
    return (
      <option value={item.id} key={index}>
        {item.name}
      </option>
    );
  });
  const { data: VehicleCategory } = useQuery({
    queryKey: ["vehicleCategory"],
    queryFn: getVehicleCategory,
  });
  const VehicleCategoryOptions = VehicleCategory?.map(
    (item: Company, index: number) => {
      return (
        <option value={item.id} key={index}>
          {item.name}
        </option>
      );
    },
  );

  useEffect(() => {
    if (clickedDataId) {
      setValue("id", clickedDataId?.id);
      setValue("companyId", clickedDataId?.companyId);
      setValue("useId", clickedDataId?.useId);
      setValue("categoryId", clickedDataId?.categoryId);
      setValue("typeId", clickedDataId?.typeId);
      setValue("vehicleNumber", clickedDataId?.vehicleNumber);
      setValue("regNo", clickedDataId?.regNo);
      setValue("engineNumber", clickedDataId?.engineNumber);
      setValue("chiyaciNumber", clickedDataId?.chiyaciNumber);
      setValue("model", clickedDataId?.model);
      setPurchaseDate(clickedDataId?.purchaseDate);
      setGivenDate(clickedDataId?.receiveDate);
      setRenewDate(clickedDataId?.BlueBookRenew);
    }
  }, [clickedDataId, setValue]);

  const onSubmit = async (data: FieldValues) => {
    data = {
      ...data,
      purchaseDate: purchaseDate,
      receivedDate: givenDate,
      BlueBookRenew: renewDate,
    };
    console.log(data);
    try {
      const { status } = await CreateVehicle(data);
      if (status === 200) {
        router.push("/vehicle/vehicle");
      }
    } catch (error) {}
  };
  const form = (
    <div className={"mt-5 mx-3"}>
      <h1 className={"text-xl font-bold my-3 "}>Create Vehicle</h1>

      <form className={""} onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className={"grid grid-cols-3 gap-3"}>
          <div className={"flex flex-col gap-3"}>
            <label className={"labelText"}>
              {" "}
              Vehicle Company <span className={"text-red-600"}>*</span>
            </label>
            <select
              className={"inputStyle"}
              {...register("companyId", {
                required: "Company is required",
                valueAsNumber: true,
              })}
            >
              <option selected={true} disabled={true} value={""}>
                -- Select Company --
              </option>
              {VehicleCompanyOptions}
            </select>
            {errors?.companyId && (
              <p
                className={"text-red-600"}
              >{`${errors?.companyId?.message}`}</p>
            )}
          </div>

          <div className={"flex flex-col gap-3"}>
            <label className={"labelText"}>
              Vehicle Type <span className={"text-red-600"}>*</span>
            </label>
            <select
              className={"inputStyle"}
              {...register("typeId", {
                required: "Type is required",
                valueAsNumber: true,
              })}
            >
              <option selected={true} disabled={true} value={""}>
                -- Select Type --
              </option>
              {VehicleTypeOptions}
            </select>
            {errors?.typeId && (
              <p className={"text-red-600"}>{`${errors?.typeId?.message}`}</p>
            )}
          </div>

          <div className={"flex flex-col gap-3"}>
            <label className={"labelText"}>
              Vehicle Use <span className={"text-red-600"}>*</span>
            </label>
            <select
              className={"inputStyle"}
              {...register("useId", {
                required: "Use ID is required",
                valueAsNumber: true,
              })}
            >
              <option selected={true} disabled={true} value={""}>
                -- Select Use --
              </option>
              {VehicleUseOptions}
            </select>
            {errors?.useId && (
              <p className={"text-red-600"}>{`${errors?.useId?.message}`}</p>
            )}
          </div>
          <div className={"flex flex-col gap-3"}>
            <label className={"labelText"}>
              Vehicle Category <span className={"text-red-600"}>*</span>
            </label>
            <select
              className={"inputStyle"}
              {...register("categoryId", {
                required: "Category is required",
                valueAsNumber: true,
              })}
            >
              <option selected={true} disabled={true} value={""}>
                -- Select Category --
              </option>
              {VehicleCategoryOptions}
            </select>
            {errors?.categoryId && (
              <p className={"text-red-600"}>{`${errors.categoryId.message}`}</p>
            )}
          </div>
          <div className={"flex flex-col gap-3"}>
            <label className={"labelText"}>
              Vehicle No. <span className={"text-red-600"}>*</span>
            </label>
            <input
              className={"inputStyle"}
              {...register("vehicleNumber", {
                required: "Vehicle Number is required",
              })}
              placeholder={"Vehicle No."}
            />
            {errors?.vehicleNumber && (
              <p
                className={"text-red-600"}
              >{`${errors?.vehicleNumber.message}`}</p>
            )}
          </div>
          <div className={"flex flex-col gap-3"}>
            <label className={"labelText"}>
              Register No. <span className={"text-red-600"}>*</span>
            </label>
            <input
              className={"inputStyle"}
              {...register("regNo", { required: "Register No. is required" })}
              placeholder={"Register No."}
            />
            {errors?.regNo && (
              <p className={"text-red-600"}>{`${errors?.regNo.message}`}</p>
            )}
          </div>

          <div className={"flex flex-col gap-3"}>
            <label className={"labelText"}>Engine No. </label>
            <input
              className={"inputStyle"}
              {...register("engineNumber")}
              placeholder={"Engine no."}
            />
          </div>
          <div className={"flex flex-col gap-3"}>
            <label className={"labelText"}>Chiyaci No. </label>
            <input
              className={"inputStyle"}
              {...register("chiyaciNumber")}
              placeholder={"Chiyaci no."}
            />
          </div>
          <div className={"flex flex-col gap-3"}>
            <label className={"labelText"}>
              Model No. <span className={"text-red-600"}>*</span>{" "}
            </label>
            <input
              className={"inputStyle"}
              {...register("model", { required: "Model No. is required" })}
              placeholder={"Model no."}
            />
            {errors?.model && (
              <p className={"text-red-600"}>{`${errors?.model.message}`}</p>
            )}
          </div>
          <div className={"flex flex-col gap-3"}>
            <label className={"labelText"}>
              Purchase Date <span className={"text-red-600"}>*</span>
            </label>
            <NepaliDatePicker
              inputClassName="inputStyle w-full"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className=""
            />
          </div>
          <div className={"flex flex-col gap-3"}>
            <label className={"labelText"}> Given Date </label>
            <NepaliDatePicker
              inputClassName="inputStyle w-full"
              value={givenDate}
              onChange={(e) => setGivenDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className=""
            />
          </div>
          <div className={"flex flex-col gap-3"}>
            <label className={"labelText"}> BlueBook Renew Date </label>
            <NepaliDatePicker
              inputClassName="inputStyle w-full"
              value={renewDate}
              onChange={(e) => setRenewDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className=""
            />
          </div>
        </div>
        <div className={"flex mt-4 gap-3"}>
          <button
            className={"cancelButton"}
            onClick={() => router.push(".")}
            type={"button"}
          >
            Cancel
          </button>
          <button
            className={"submitButton"}
            type={"submit"}
            disabled={isSubmitting}
          >
            {"Save"}
          </button>
        </div>
      </form>
    </div>
  );
  return <>{isLoading ? <Loader /> : form}</>;
}
