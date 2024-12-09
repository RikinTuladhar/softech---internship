"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
import "nepali-datepicker-reactjs/dist/index.css";
import { useRouter } from "next/navigation";
import { createFiscalYear } from "@/src/services/apiService/setup/fiscalyear/fiscalyear";
import { FiscalYear } from "@/types/types";
import ErrorMessage from "@/src/components/reusable/ErrorMessage";
import { start } from "repl";

function CreateFiscalYear({
  clickedIdData,
}: {
  clickedIdData?: FiscalYear | null;
}) {
  const aa = new BikramSambat(new Date()).toBS();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  const router = useRouter();
  useEffect(() => {
    if (clickedIdData != null) {
      setValue("fiscalYearName", clickedIdData?.fiscalYearName);
      setValue("id", clickedIdData?.id);
      setValue("status", clickedIdData?.status);
      setValue("startYear", clickedIdData?.startYear);
      setValue("endYear", clickedIdData?.endYear);
      setStartDate(clickedIdData?.startDate);
      setEndDate(clickedIdData?.endDate);
    }
  }, [clickedIdData, setValue]);

  const onSubmit = async (data: FieldValues) => {
    try {
      data = {
        ...data,
        startDate,
        endDate,
      };
      const response = await createFiscalYear(data);
      if (response?.status === 200) {
        router.push("/office/fiscal");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-16">
      <div>
        <h1 className="text-lg font-bold mx-3">Fiscal Year</h1>
      </div>
      <form
        className="px-4 py-3"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col">
            <label className="labelText">
              Fiscal Year <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register("fiscalYearName", {
                required: "Fiscal Year is required",
              })}
              className="inputStyle"
              placeholder="Fiscal Year"
            />
            {errors?.fiscalYearName && (
              <ErrorMessage message={errors.fiscalYearName.message} />
            )}
          </div>
          <div className="flex flex-col">
            <label className="labelText">
              Start Year <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register("startYear", { required: "Start Year is required" })}
              className="inputStyle"
              placeholder="Start Year"
            />
            {errors?.startYear && (
              <ErrorMessage message={errors.startYear.message} />
            )}
          </div>
          <div className="flex flex-col">
            <label className="labelText">
              End Year <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register("endYear", { required: "End Year is required" })}
              className="inputStyle"
              placeholder="End Year"
            />
            {errors?.endYear && (
              <ErrorMessage message={errors.endYear.message} />
            )}
          </div>
          <div className="flex flex-col">
            <label className="labelText">
              Start Date <span className="text-red-600">*</span>
            </label>
            <NepaliDatePicker
              inputClassName="inputStyle w-full"
              value={startDate}
              onChange={(e) => setStartDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className=""
            />
            {startDate === aa && (
              <ErrorMessage message={"Pleae select Start Date"} />
            )}
          </div>
          <div className="flex flex-col">
            <label className="labelText">
              End Date <span className="text-red-600">*</span>
            </label>
            <NepaliDatePicker
              inputClassName="inputStyle w-full"
              value={endDate}
              onChange={(e) => setEndDate(e)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className=""
            />
            {endDate === aa && (
              <ErrorMessage message={"Pleae select End Date"} />
            )}
          </div>
          <div className="flex items-center mt-4 gap-3">
            <label className="labelText">Status</label>
            <input
              type="checkbox"
              className="h-6 w-6"
              {...register("status")}
            />
          </div>
        </div>
        <div className="flex my-6 gap-8">
          <button className="cancelButton" onClick={() => router.push(".")}>
            Cancel
          </button>
          <button
            className="submitButton"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateFiscalYear;
