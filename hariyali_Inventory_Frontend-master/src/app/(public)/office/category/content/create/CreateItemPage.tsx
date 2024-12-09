"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { CreateItem } from "@/src/services/apiService/setup/Item/ItemServices";
import {
  Category,
  MaterialType,
  SubCategory,
  UnitType,
  Item,
} from "@/types/types";
import { getMaterialType } from "@/src/services/apiService/setup/MaterialType/MaterialType";
import { getMaterialCategoryByType } from "@/src/services/apiService/setup/MaterialCategory/MaterialCategory";
import { GetSubCategoryByCategoryId } from "@/src/services/apiService/setup/MaterialSubCategory/materialSubCategoryServices";
import { getUnit } from "@/src/services/apiService/setup/unit/unitServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const GetUnit = async () => {
  const { data } = await getUnit();
  return data;
};
const MaterialCategoryByType = async (id: number) => {
  try {
    const { data } = await getMaterialCategoryByType(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const MaterialSubCategoryByCategory = async (id: number) => {
  try {
    const { data } = await GetSubCategoryByCategoryId(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const GetMaterialType = async () => {
  const { data } = await getMaterialType();
  return data;
};

const CreateItemComp = ({ clickedIdData }: { clickedIdData?: Item }) => {
    const {id}:{id:string} = useParams()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({});
  const watchFields = watch();
  const router = useRouter();

  const { data: materialType } = useQuery({
    queryKey: ["materialType"],
    queryFn: GetMaterialType,
  });

  const materialTypeOptions = materialType?.map(
    (item: MaterialType, index: number) => {
      return <option value={item.id}>{item.name}</option>;
    }
  );

  useEffect(() => {
    if(clickedIdData){
        setValue("id",clickedIdData?.id);
        setValue("materialTypeId",clickedIdData?.materialTypeId);
        setValue("materialCategoryId",clickedIdData?.materialCategoryId);
        setValue("materialSubCategoryId",clickedIdData?.materialSubCategoryId);
        setValue("name",clickedIdData?.name);
        setValue("unitId",clickedIdData?.unitId);
        setValue("specification",clickedIdData?.specification);
    }
  }, [clickedIdData, setValue]);

  //unit
  const {
    data: unitList,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["unit"],
    queryFn: GetUnit,
  });
  const unitOptions = unitList?.map((item: UnitType, index: number) => {
    return (
      <option key={index} value={item.id}>
        {item.symbol}
      </option>
    );
  });

  //category
  const { data: CategoryByTypeList } = useQuery({
    queryKey: ["categoryByTypeId", watchFields?.materialTypeId],
    queryFn: () => MaterialCategoryByType(watchFields?.materialTypeId),
    enabled: !!watchFields?.materialTypeId,
  });
  const categoryOptions = CategoryByTypeList?.map(
    (item: Category, index: number) => {
      return (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      );
    }
  );

  //sub category
  const { data: SubCategoryByCategoryId } = useQuery({
    queryKey: ["subCategoryByCategoryId", watchFields?.materialCategoryId],
    queryFn: () =>
      MaterialSubCategoryByCategory(watchFields?.materialCategoryId),
    enabled: !!watchFields?.materialCategoryId,
  });
  const subCategoryOptions = SubCategoryByCategoryId?.map(
    (item: SubCategory, index: number) => {
      return (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      );
    }
  );

  const onSubmit = async (data: FieldValues) => {
    data = {
      ...data,
    };

    try {
      const { status } = await CreateItem(data);
      if (status === 200) {
        router.push("/office/category/content");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col shadow-md px-8 ">
      <main className=" py-10 ">
        <div className=" ">
          <h1 className="text-xl font-bold">Item Setup</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-6 ">
              <div className="grid flexgrid-cols-2 md:grid-cols-3 gap-3">
                {/* Bank Name */}
                <div className="">
                  <label  className=" text-sm text-gray-900">
                    Type of material
                  </label>
                  <select
                    {...register("materialTypeId", { valueAsNumber: true })}
                    className="inputStyle"
                  >
                    <option value="" selected disabled>
                      -- Select Material Type --
                    </option>
                    {materialTypeOptions}
                  </select>
                </div>
                <div>
                  <label  className=" text-sm text-gray-900">
                    Material Category
                  </label>
                  <select
                    {...register("materialCategoryId", { valueAsNumber: true })}
                    className="inputStyle"
                  >
                    <option value="" selected disabled>
                      -- Select Category --
                    </option>
                    {categoryOptions}
                  </select>
                </div>
                <div>
                  <label  className=" text-sm text-gray-900">
                    Material Sub Category
                  </label>
                  <select
                    {...register("materialSubCategoryId", {
                      valueAsNumber: true,
                    })}
                    className="inputStyle"
                  >
                    <option value="" selected disabled>
                      -- Select Sub-Category --
                    </option>
                    {subCategoryOptions}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label>Item Name</label>
                  <input
                    className="inputStyle"
                    placeholder="Item Name"
                    {...register("name")}
                  />
                </div>
                <div>
                  <label  className=" text-sm text-gray-900">
                    Item Unit
                  </label>
                  <select
                    id=""
                    {...register("unitId", { valueAsNumber: true })}
                    className="inputStyle"
                  >
                    <option value="" selected disabled>
                      -- Select Unit --
                    </option>
                    {unitOptions}
                  </select>
                </div>
                <div>
                  <label  className=" text-sm text-gray-900">
                    Specification
                  </label>
                  <input
                    type="text"
                    className="inputStyle"
                    placeholder="Specification"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-start-1 mt-6 flex items-end justify-start gap-x-6">
              <button
                type="button"
                className="cancelButton"
                onClick={() => {
                    id ?router.push("..") :
                  router.push(".")
                }}
              >
                Cancel
              </button>
              <button type="submit" className="submitButton">
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateItemComp;
