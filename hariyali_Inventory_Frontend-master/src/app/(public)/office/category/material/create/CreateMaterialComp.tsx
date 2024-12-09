"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { getMaterialType } from "@/src/services/apiService/setup/MaterialType/MaterialType";
import { MaterialType,Category } from "@/types/types";
import { createMaterialCategory } from "@/src/services/apiService/setup/MaterialCategory/MaterialCategory";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const GetMaterialType = async () => {
  try {
    const { data } = await getMaterialType();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default function CreateMaterialComp({
  clickedIdData,
}: {
  clickedIdData?: Category;
}) {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue
  } = useForm();
  const router = useRouter();
  const [materialType, setMaterialType] = useState<MaterialType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await getMaterialType();
      if (status === 200) {
        setMaterialType(data);
      }
    };
    fetchData();
  }, []);
  useEffect(()=>{
    if( clickedIdData){
        setValue('id',clickedIdData?.id);
        setValue('materialTypeId',clickedIdData?.materialTypeId)
        setValue('name',clickedIdData?.name)
    }
  },[clickedIdData,setValue])
  const onSubmit = async (data: FieldValues) => {
    data = {
      ...data,
    };
    try {
      const response = await createMaterialCategory(data);
      if (response?.status === 200) {
        router.push("/office/category/material");
      }
    } catch (error) {}
  };
  const handleBack = (e: FormEvent) => {
    const args = id ? ".." : ".";
    e.preventDefault();
    router.push(args);
  };
  return (
    <div className="mt-8">
      <div>
        <h1 className="text-lg font-bold mx-3">Category Setup</h1>
      </div>
      <form
        className="px-4 py-3 "
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label className="labelText mb-4 ">
              Material Type <span className="text-red-600">*</span>
            </label>

            {/* <input {...register("MaterialTypes")} /> */}
            <select
              className="inputStyle"
              {...register("materialTypeId", {
                required: "Material Type is required",
                valueAsNumber: true,
              })}
            >
              <option value="" selected disabled>
                -- Select --
              </option>
              {materialType?.map((item, index) => {
                return <option value={item.id} key={index} selected={item.id === clickedIdData?.materialTypeId} >{item.name}</option>;
              })}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="labelText  mb-4">
              Category Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Category  name is required ",
              })}
              className="inputStyle"
              placeholder="Category Name"
            />
          </div>
        </div>

        <div className=" flex my-6 gap-8 ">
          <button className="cancelButton" onClick={(e) => handleBack(e)}>
            Cancel
          </button>
          <button
            className="submitButton"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
