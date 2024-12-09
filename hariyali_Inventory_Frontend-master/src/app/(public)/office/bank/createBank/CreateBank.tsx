"use client";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { createBank } from "@/src/services/apiService/setup/Bank/BankServices";

export default function CreateBank() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    defaultValues: {
      bankArray: [{ bankName: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bankArray",
  });

  const AddButton = (e: FormEvent) => {
    e.preventDefault();
    append({ bankName: "" });
  };

  const RemoveHandler = (e: FormEvent, index: number) => {
    e.preventDefault();
    remove(index);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await createBank(data?.bankArray);
      if (response?.status === 200) {
        router.push("/office/bank");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(data, "response");
  };

  return (
    <div className="mt-10">
      <h1 className="text-xl font-bold">Bank Setup</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="">
          <button
            className="bg-green-600 font-bold text-white px-6 py-2 rounded-md shadow-md"
            onClick={(e) => AddButton(e)}
          >
            Add Bank
          </button>
        </div>
        <div className="">
          {fields?.map((field, index) => {
            return (
              <div key={field.id} className="flex  items-center gap-6 ">
                <div className="">
                  <label htmlFor="bankName" className="labelText">
                    Bank Name
                  </label>
                  <input
                    id="bankName"
                    type="text"
                    className="inputStyle"
                    placeholder="Bank Name"
                    {...register(`bankArray.${index}.bankName`, {
                      required: "Bank Name is required",
                    })}
                  />
                </div>
                {fields?.length > 1 && (
                  <div className="mt-7 ">
                    <button
                      className="bg-red-600 text-white px-6 py-2 shadow-md "
                      onClick={(e) => RemoveHandler(e, index)}
                    >
                      {" "}
                      Remove
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex gap-6 my-4">
          <button
            className="cancelButton"
            onClick={(e) => {
              e.preventDefault();
              router.push(".");
            }}
          >
            Cancel
          </button>
          <button
            className="submitButton"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
