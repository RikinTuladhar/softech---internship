"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { getMaterialType } from "@/src/services/apiService/setup/MaterialType/MaterialType";
import { getMaterialCategoryByType } from "@/src/services/apiService/setup/MaterialCategory/MaterialCategory";
import { CreateSubCategory } from "@/src/services/apiService/setup/MaterialSubCategory/materialSubCategoryServices";
import { Category, MaterialType, SubCategory } from "@/types/types";
import { FieldValues, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const GetMaterialType = async () => {
  const { data } = await getMaterialType();
  return data;
};

const GetMaterialCategoryByType = async (id: number) => {
  const { data } = await getMaterialCategoryByType(id);
  return data;
};

function CreateSubCategoryComp({
  clickedIdData,
}: {
  clickedIdData?: SubCategory;
}) {
  const { id } = useParams();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      materialTypeId: 0,
      materialCategoryId: 0,
      name: "",
      id: 0,
    },
  });
  const watchFields = watch();
  const router = useRouter();
  console.log(clickedIdData, "response");
  useEffect(() => {
    if (clickedIdData) {
      setValue("id", clickedIdData?.id);
      setValue("materialTypeId", clickedIdData?.materialTypeId);
      setValue("materialCategoryId", clickedIdData?.materialCategoryId);
      setValue("name", clickedIdData?.name);
    }
  }, [clickedIdData, setValue]);

  const {
    data: materialType,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["materialType"],
    queryFn: GetMaterialType,
  });

  const materialTypeOptions = materialType?.map(
    (item: MaterialType, index: number) => {
      return (
        <option
          key={index}
          value={item.id}
          selected={item.id === clickedIdData?.materialTypeId}
        >
          {item.name}
        </option>
      );
    }
  );

  // Category
  const {
    data: category,
    isError: CategoryError,
    isLoading: CategoryLoading,
  } = useQuery({
    queryKey: ["categoryByType", watchFields?.materialTypeId],
    queryFn: () => GetMaterialCategoryByType(watchFields?.materialTypeId),
    enabled: !!watchFields?.materialTypeId,
  });

  const categoryOptions = category?.map((item: Category, index: number) => {
    return (
      <option value={item.id} key={index}>
        {item.name}
      </option>
    );
  });
  const handleBack = (e: FormEvent) => {
    const args = id ? ".." : ".";
    e.preventDefault();
    router.push(args);
  };

  //submit
  const onSubmit = async (data: FieldValues) => {
    try {
      const { status } = await CreateSubCategory(data);
      if (status === 200) {
        router.push("/office/category/subCategory");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-8">
      <div>
        <h1 className="text-lg font-bold mx-3">Sub Category Setup</h1>
      </div>
      <form
        action=""
        className="px-4 py-3 "
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className=" grid md:grid-cols-3 gap-3">
          <div className="flex flex-col gap-3 ">
            <label className="labelText">
              Material Type <span className="text-red-600">*</span>
            </label>
            <select
              className="inputStyle"
              {...register("materialTypeId", {
                required: "Material Type is required",
                valueAsNumber: true,
              })}
            >
              <option value={0} disabled selected>
                -- Select Material Type --
              </option>
              {materialTypeOptions}
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <label className="labelText">
              Category <span className="text-red-600">*</span>
            </label>
            <select
              className="inputStyle"
              {...register("materialCategoryId", {
                required: "Category is required",
                valueAsNumber: true,
              })}
            >
              <option value={0} className="" disabled selected>
                -- Select Category --
              </option>
              {categoryOptions}
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="labelText">
              Sub Category Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="inputStyle"
              placeholder="Sub Category Name"
              {...register("name", {
                required: "Sub Category name is requied",
              })}
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

export default CreateSubCategoryComp;
