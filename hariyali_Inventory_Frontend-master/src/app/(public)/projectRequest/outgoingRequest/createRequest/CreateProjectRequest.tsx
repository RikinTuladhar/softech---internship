"use client";
import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  GetMaterialType,
  GetMaterialCategoryByType,
  GetItemBySubCategory,
  getSubCategoryByCategoryId,
} from "@/src/services/request/setups/material/materialServices";
import { CreateRequestByProject } from "@/src/services/apiService/request/requestServices";
import { Me } from "@/src/services/apiService/setup/user/userServices";
import { GetHariyaliProjectById } from "@/src/services/apiService/layerSetup/project/projectServices";
import {
  useFieldArray,
  useForm,
  Controller,
  FieldValues,
} from "react-hook-form";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  MaterialType,
  Category,
  SubCategory,
  Item,
  requestItemType,
} from "@/types/types";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
import "nepali-datepicker-reactjs/dist/index.css";
const aa = new BikramSambat(new Date()).toBS();
import RequiredField from "@/src/components/reusable/RequiredField";
import ErrorMessage from "@/src/components/reusable/ErrorMessage";
import Loader from "@/src/components/reusable/Loader";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const getHariyaliProjectById = async (id: string) => {
  const { data } = await GetHariyaliProjectById(id);
  return data;
};

function CreateRequestByProjectComp() {
  const [requestDate, setRequestDate] = useState(aa);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      requestDate: "",
      projectId: "",
      groupId: "",
      requestItems: [
        {
          typeId: "",
          categoryId: "",
          subCategoryId: "",
          itemId: "",
          quantity: 0,
          specification: "",
          description: "",
        },
      ],
    },
  });
  const watchFields = watch();
  const { append, fields, remove } = useFieldArray({
    control,
    name: "requestItems",
  });

  const getMe = async () => {
    const { data } = await Me();
    return data;
  };
  const {
    data: meData,
    isError: meError,
    isLoading: meLoading,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const {
    data: projectData,
    isError: projectDataError,
    isLoading: projectDataLoading,
  } = useQuery({
    queryKey: ["projectByIds", meData],
    queryFn: () => getHariyaliProjectById(meData?.id),
    enabled: !!meData?.id && meData?.role === "project",
  });

  const {
    data: materialType,
    isError: materialTypeError,
    isLoading: typeLoading,
  } = useQuery({
    queryKey: ["materialType"],
    queryFn: GetMaterialType,
  });

  // Get all typeIds from fields
  const typeIds = fields?.map((_, index) =>
    watch(`requestItems.${index}.typeId`)
  );

  // Fetch categories for all typeIds
  const categoryQueries = useQueries({
    queries: typeIds?.map((typeId) => ({
      queryKey: ["categoryByType", typeId],
      queryFn: () => GetMaterialCategoryByType(parseInt(typeId)),
      // enabled: !!typeId, // Only fetch when typeId is available
    })),
  });

  const categoryIds = fields?.map((_, index) =>
    watch(`requestItems.${index}.categoryId`)
  );
  const subCategoryQueries = useQueries({
    queries: categoryIds?.map((categoryId) => {
      return {
        queryKey: ["subCategoryByCategory", categoryId],
        queryFn: () => getSubCategoryByCategoryId(parseInt(categoryId)),
        enabled: !!categoryId,
      };
    }),
  });
  const subCategoryIds = fields?.map((_, index) =>
    watch(`requestItems.${index}.subCategoryId`)
  );

  const itemsQueries = useQueries({
    queries: subCategoryIds?.map((subCategoryId) => {
      return {
        queryKey: ["subCategoryId", subCategoryId],
        queryFn: () => GetItemBySubCategory(parseInt(subCategoryId)),
        enabled: !!subCategoryId,
      };
    }),
  });
  const handleRemove = (index: number, e: any) => {
    e.preventDefault();
    remove(index);
  };

  const onSubmit = async (data: FieldValues) => {
    const newArray = data?.requestItems?.map((item: requestItemType) => {
      return {
        ...item,
        typeId: item.typeId,
        categoryId: parseInt(item.categoryId),
        subCategoryId: parseInt(item.subCategoryId),
        itemId: parseInt(item.itemId),
      };
    });
    data = {
      requestDate: requestDate,
      projectId: projectData?.id,
      requestItems: newArray,
      requestedBy: meData?.role,
    };
    try {
      const response = await CreateRequestByProject(data);
      if (response?.status === 200) {
        router.push("/projectRequest/outgoingRequest");
        toast.success(response?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const mainForm = (
    <div>
      <div className="text-xl font-bold mb-6">Create Request</div>

      <div className={"border-2  border-black/20 px-3 rounded py-4"}>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className={"grid grid-cols-3 gap-3"}>
            <div>
              <label htmlFor="">
                Project <RequiredField />{" "}
              </label>
              <input
                type="text"
                className="inputStyle cursor-not-allowed "
                readOnly
                value={projectData?.name}
              />
            </div>
            <div>
              <label htmlFor="">
                Date <RequiredField />{" "}
              </label>
              <NepaliDatePicker
                inputClassName="inputStyle w-full"
                value={requestDate}
                onChange={(e) => setRequestDate(e)}
                options={{ calenderLocale: "en", valueLocale: "en" }}
                className=""
              />
            </div>
          </div>
          <div className={"px-3 py-2 rounded-md"}>
            <div className={"flex items-center justify-end my-3"}>
              <button
                className="bg-green-600 px-6 py-2 text-white rounded hover:bg-green-700 focus:outline-none "
                onClick={() =>
                  append({
                    typeId: "",
                    categoryId: "",
                    subCategoryId: "",
                    itemId: "",
                    quantity: 0,
                    specification: "",
                    description: "",
                  })
                }
                type="button"
              >
                Add
              </button>
            </div>
            {fields?.map((field, index) => {
              const categoryQuery = categoryQueries[index];
              const categories = categoryQuery?.data || [];
              const categoryLoading = categoryQuery?.isLoading;

              const subCategoryQuery = subCategoryQueries[index];
              const subCategories = subCategoryQuery?.data || [];
              const subCategoryLoading = subCategoryQuery?.isLoading;

              const itemsQuery = itemsQueries[index];
              const items = itemsQuery?.data || [];
              const itemsLoading = itemsQuery?.isLoading;

              return (
                <div key={field.id} className={" flex flex-col gap-5"}>
                  <div className=" flex items-center  gap-3 my-2 ">
                    <div>
                      <label htmlFor="">
                        Type <RequiredField />
                      </label>
                      <select
                        className="inputStyle"
                        {...register(`requestItems.${index}.typeId`, {
                          required: "Type is required",
                          valueAsNumber: true,
                        })}
                        onChange={(e) => {
                          setValue(
                            `requestItems.${index}.typeId`,
                            e.target.value
                          );
                          // Reset categoryId when typeId changes
                          setValue(`requestItems.${index}.categoryId`, "");
                          setValue(`requestItems.${index}.subCategoryId`, "");
                          setValue(`requestItems.${index}.itemId`, "");
                        }}
                      >
                        <option value="">-- Select Type --</option>
                        {materialType?.map((item: MaterialType, i: number) => (
                          <option key={i} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {errors?.requestItems?.[index]?.typeId && (
                        <ErrorMessage
                          message={errors.requestItems[index]?.typeId?.message}
                        />
                      )}
                    </div>
                    <div>
                      <label htmlFor="">
                        Category
                        <RequiredField />
                      </label>
                      <Controller
                        control={control}
                        name={`requestItems.${index}.categoryId`}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className={`inputStyle `}
                            disabled={
                              categoryLoading || categories.length === 0
                            }
                          >
                            <option value="">-- Select Category --</option>
                            {categories?.map((item: Category, i: number) => (
                              <option key={i} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors?.requestItems?.[index]?.categoryId && (
                        <ErrorMessage
                          message={
                            errors.requestItems[index]?.categoryId?.message
                          }
                        />
                      )}
                      {/*{categoryLoading && <p>Loading categories...</p>}*/}
                    </div>
                    <div>
                      <label htmlFor="">
                        Sub Category
                        <RequiredField />
                      </label>
                      <Controller
                        control={control}
                        name={`requestItems.${index}.subCategoryId`}
                        rules={{ required: "Sub Category is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className={`inputStyle `}
                            disabled={
                              subCategoryLoading || subCategories.length === 0
                            }
                          >
                            <option value="">-- Select Sub Category --</option>
                            {subCategories?.map(
                              (item: SubCategory, i: number) => (
                                <option key={i} value={item.id}>
                                  {item.name}
                                </option>
                              )
                            )}
                          </select>
                        )}
                      />
                      {errors?.requestItems?.[index]?.subCategoryId && (
                        <ErrorMessage
                          message={
                            errors.requestItems[index]?.subCategoryId?.message
                          }
                        />
                      )}
                      {/*{subCategoryLoading && <p>Loading sub categories...</p>}*/}
                    </div>
                    <div>
                      <label htmlFor="">
                        Item
                        <RequiredField />
                      </label>
                      <Controller
                        control={control}
                        name={`requestItems.${index}.itemId`}
                        rules={{ required: "Item is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className={`inputStyle `}
                            disabled={itemsLoading || items?.length === 0}
                          >
                            <option value="">-- Select Items--</option>
                            {items?.map((item: SubCategory, i: number) => (
                              <option key={i} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors?.requestItems?.[index]?.itemId && (
                        <ErrorMessage
                          message={errors.requestItems[index]?.itemId?.message}
                        />
                      )}
                      {/*{itemsLoading && <p>Loading items...</p>}*/}
                    </div>
                    <div>
                      <label htmlFor="">Specification</label>
                      <input
                        type="text"
                        className="inputStyle"
                        {...register(`requestItems.${index}.specification`, {})}
                        placeholder={"specification"}
                      />
                    </div>
                    <div>
                      <label htmlFor="">
                        Quantity <RequiredField />{" "}
                      </label>
                      <input
                        type="text"
                        className="inputStyle"
                        {...register(`requestItems.${index}.quantity`, {
                          required: "Quantity is required",
                          valueAsNumber: true,
                          validate: (value) =>
                            value > 0 || "Quantity must be greater than 0",
                        })}
                        placeholder={"quantity"}
                      />
                      {errors?.requestItems?.[index]?.quantity && (
                        <ErrorMessage
                          message={
                            errors.requestItems?.[index]?.quantity?.message
                          }
                        />
                      )}
                    </div>
                    <div>
                      <label htmlFor="">Description</label>
                      <input
                        type="text"
                        className="inputStyle"
                        {...register(`requestItems.${index}.description`)}
                        placeholder={"Description"}
                      />
                    </div>

                    {fields?.length > 1 && (
                      <button
                        className="bg-red-600 rounded px-3 py-2 mt-5 text-white"
                        type="button"
                        onClick={(e) => handleRemove(index, e)}
                      >
                        <TrashIcon className={"w-6 h-6"} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={"flex items-center gap-4 justify-end"}>
            <button
              type="button"
              className="bg-red-600 rounded hover:bg-red-700 px-6 py-2 text-white"
              onClick={() => router.push(".")}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-600 rounded hover:bg-blue-700 px-6 py-2 text-white disabled:bg-gray-300 disabled:cursor-not-allowed "
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return <>{meLoading ? <Loader /> : mainForm}</>;
}

export default CreateRequestByProjectComp;
