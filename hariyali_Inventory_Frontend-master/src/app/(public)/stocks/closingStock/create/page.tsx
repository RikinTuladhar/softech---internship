"use client";

import React from "react";
import { FieldValues, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

export default function createClosingStock() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    data = {
      ...data,
    };

    console.log(watch("status"));
    console.log(data);
  };

  return (
    <div className="mt-8">
      <div>
        <h1 className="text-lg font-bold mx-3"></h1>
      </div>
      <form
        className="px-4 py-3 "
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col">
            <label className="labelText mb-4 ">
              Type of goods <span className="text-red-600">*</span>
            </label>

            <select className="inputStyle" {...register("items")}>
              <option value="choose">Choose</option>
              <option value="without">Expendable goods</option>
              <option value="with">Like being spent</option>
              <option value="repair">Various</option>
              <option value="repair">Repair</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="labelText mb-4 ">
              Category of goods <span className="text-red-600">*</span>
            </label>

            <select className="inputStyle" {...register("items")}>
              <option value="choose">Choose</option>
              <option value="without">Computer</option>
              <option value="with">Electronics</option>
              <option value="repair">Machinery</option>
              <option value="repair">Laptops</option>
              <option value="repair">Computer Accessories</option>
              <option value="repair">Private Vechile</option>
              <option value="repair">Furniture</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="labelText mb-4 ">
              Sub-Category of Goods <span className="text-red-600">*</span>
            </label>

            <select className="inputStyle" {...register("items")}>
              <option value="choose">Choose</option>
              <option value="without">Computer</option>
              <option value="with">Electronics</option>
              <option value="repair">Machinery</option>
              <option value="repair">Laptops</option>
              <option value="repair">Computer Accessories</option>
              <option value="repair">Private Vechile</option>
              <option value="repair">Furniture</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="labelText mb-4 ">
              Name of goods <span className="text-red-600">*</span>
            </label>

            <select className="inputStyle" {...register("items")}>
              <option value="choose">Choose</option>
              <option value="without">Computer</option>
              <option value="with">Electronics</option>
              <option value="repair">Machinery</option>
              <option value="repair">Laptops</option>
              <option value="repair">Computer Accessories</option>
              <option value="repair">Private Vechile</option>
              <option value="repair">Furniture</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="labelText mb-4 ">
              Quantity <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="inputStyle"
              {...register("quantity")}
            />
          </div>
        </div>

        <div className=" flex my-6 gap-8 ">
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
