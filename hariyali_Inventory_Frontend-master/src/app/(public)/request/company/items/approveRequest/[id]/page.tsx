"use client";
import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

import {
  GetMaterialType,
  GetMaterialCategoryByType,
  GetItemBySubCategory,
  getSubCategoryByCategoryId,
} from "@/src/services/request/setups/material/materialServices";
import {
  GetRemainingQuantity,
  GetPriceList,
} from "@/src/services/apiService/stock/openingStock/openingStockServices";
import { GetHariyaliProject } from "@/src/services/apiService/layerSetup/project/projectServices";
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
  rateListType,
  FarmerGroup,
  compairedItemType,
  InStockItem,
  HariyaliProject,
} from "@/types/types";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import BikramSambat from "bikram-sambat-js";
import "nepali-datepicker-reactjs/dist/index.css";
const aa = new BikramSambat(new Date()).toBS();
import RequiredField from "@/src/components/reusable/RequiredField";
import ErrorMessage from "@/src/components/reusable/ErrorMessage";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  CreateGivenToProject,
  GetCompairedItemByProject,
  GetProjectIdByRequestId,
} from "@/src/services/apiService/request/requestServices";
import { useParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableWithoutPagenation } from "@/src/components/DataTableWithouPagenation";

const column: ColumnDef<compairedItemType>[] = [
  { accessorKey: "id", header: "S.N", cell: (info) => info.row.index + 1 },
  { accessorKey: "typeName", header: "Type" },
  { accessorKey: "categoryName", header: "Category" },
  { accessorKey: "subCategoryName", header: "Sub Category" },
  { accessorKey: "itemName", header: "Item" },
  { accessorKey: "remainingQuantity", header: "Remaining Quantity" },
  { accessorKey: "quantity", header: "Asked Quantity" },
];

function ApproveIncommingRequestFromProject() {
  const [requestDate, setRequestDate] = useState(aa);
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty, touchedFields },
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      requestDate: "",
      projectId: "",
      totalPrice: 0,
      cash: 0,
      credit: 0,
      paymentMethod: "",
      requestItems: [
        {
          typeId: "",
          categoryId: "",
          subCategoryId: "",
          itemId: "",
          rate: "",
          quantity: 0,
          remainingQuantity: 0,
          percentage: 0,
          rateWithProfit: 0,
          finalPrice: 0,
          expDate: "",
          askedQuantity: 0,
        },
      ],
    },
  });
  const watchFields = watch();
  const { append, fields, remove } = useFieldArray({
    control,
    name: "requestItems",
  });

  const {
    data: apiDataCompaired,
    isLoading: isLoadingCompaired,
    isError: isErrorCompaired,
  } = useQuery({
    queryKey: ["compairedItems", id],
    queryFn: () => GetCompairedItemByProject(parseInt(id)),
    enabled: !!id,
  });

  const [outOfStockItems, setOutOfStockItems] = useState<compairedItemType[]>(
    []
  );

  useEffect(() => {
    if (apiDataCompaired?.outOfStockItems) {
      setOutOfStockItems(apiDataCompaired?.outOfStockItems);
    }
  }, [apiDataCompaired]);

  const getHariyaliProject = async () => {
    const { data } = await GetHariyaliProject();
    return data;
  };

  // projectList list
  const {
    data: projectList,
    isError,
    isLoading: projectLoading,
  } = useQuery({
    queryKey: ["projectList"],
    queryFn: getHariyaliProject,
  });

  const groupOptions = projectList?.map(
    (item: HariyaliProject, index: number) => {
      return (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      );
    }
  );

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
  //category ids
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

  //sub category ids
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

  const itemIds = fields?.map((_, index) =>
    watch(`requestItems.${index}.itemId`)
  );

  const priceQueries = useQueries({
    queries: itemIds?.map((itemId) => {
      return {
        queryKey: ["itemId", itemId],
        queryFn: () => GetPriceList(parseInt(itemId)),
        enabled: !!itemId,
      };
    }),
  });

  const itemIdAndRate = fields?.map((_, index) => {
    const itemId = watch(`requestItems.${index}.itemId`);
    const rate = watch(`requestItems.${index}.rate`);
    return { itemId, rate };
  });

  const remainingQuantityQueries = useQueries({
    queries: itemIdAndRate?.map(({ itemId, rate }, index) => {
      return {
        queryKey: ["remainingQuantity", itemId, rate],
        queryFn: () => GetRemainingQuantity(parseInt(itemId), parseInt(rate)),
        enabled: !!itemId && !!rate,
      };
    }),
  });

  const {
    data: projectId,
    isError: isErrorProjectId,
    isLoading: isLoadingProjectId,
  } = useQuery({
    queryKey: ["groupIdByRequestId", id],
    queryFn: () => GetProjectIdByRequestId(parseInt(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (projectId) {
      setValue(`projectId`, projectId?.projectId);
    }
  }, [projectId, setValue]);

  const handleRemove = (index: number) => {
    remove(index);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const formatted = data?.requestItems?.map((item: any) => {
        return {
          typeId: item.typeId,
          categoryId: item.categoryId.toString(),
          subCategoryId: item.subCategoryId.toString(),
          itemId: item.itemId.toString(),
          rate: item.rate.toString(),
          rateWithProfit: item.rateWithProfit,
          percentage: parseInt(item.percentage),
          quantity: item.quantity,
          finalPrice: item.rateWithProfit * item.quantity,
          expDate: item.expDate,
        };
      });
      data = {
        ...data,
        totalPrice: totalPrice,
        requestDate: requestDate,
        requestItems: formatted,
        requestId: parseInt(id),
      };
      const { status, message } = await CreateGivenToProject(data);
      if (status) {
        router.push(`/inventory/givenToProject`);
        toast.success(message);
      }
    } catch (error: any) {
      console.log(error, "error");
      toast.error(error?.message);
    }
  };

  const remainingQuantityIssues = remainingQuantityQueries.some(
    (query, index) => {
      const remainingQuantity = query?.data || 0;
      const quantity = watch(`requestItems.${index}.quantity`);
      return remainingQuantity < quantity;
    }
  );

  const totalPrice = watch("requestItems")
    .map((item) => {
      const finalPrice = item.rateWithProfit * item.quantity;
      return finalPrice;
    })
    ?.reduce((acc, amt) => acc + amt, 0);

  useEffect(() => {
    if (watch("paymentMethod") === "cash") {
      setValue("cash", totalPrice);
      setValue("credit", 0); // Set credit to 0 if cash is selected
    } else if (watch("paymentMethod") === "credit") {
      setValue("cash", 0); // Set cash to 0 if credit is selected
      setValue("credit", totalPrice);
    } else if (watch("paymentMethod") === "half") {
      const cashValue = getValues("cash");
      const remainingCredit = totalPrice - (cashValue || 0);
      setValue("credit", remainingCredit);
    }
  }, [
    watch("paymentMethod"),
    getValues("cash"),
    totalPrice,
    setValue,
    getValues,
  ]);

  useEffect(() => {
    if (id && apiDataCompaired) {
      if (apiDataCompaired?.inStockItems?.length !== 0) {
        setValue(`requestItems`, apiDataCompaired?.inStockItems);
      }
    }
  }, [setValue, apiDataCompaired, id]);

  const handleAddItem = (row: compairedItemType) => {
    const emptyItemIndex = fields.findIndex(
      (item) =>
        !item.typeId ||
        !item.categoryId ||
        !item.subCategoryId ||
        !item.itemId ||
        !item.quantity
    );
    if (emptyItemIndex !== -1) {
      // If an empty item exists, update the empty item with new data
      setValue(`requestItems.${emptyItemIndex}`, {
        typeId: row?.typeId.toString(),
        categoryId: row?.categoryId.toString(),
        subCategoryId: row?.subCategoryId.toString(),
        itemId: row?.itemId.toString(),
        quantity: row?.quantity,
        rate: "",
        percentage: 0,
        rateWithProfit: 0,
        finalPrice: 0,
        expDate: "",
        remainingQuantity: 0,
        askedQuantity: row?.quantity,
      });
    } else {
      // No empty item found, so append the new item
      append({
        typeId: row?.typeId.toString(),
        categoryId: row?.categoryId.toString(),
        subCategoryId: row?.subCategoryId.toString(),
        itemId: row?.itemId.toString(),
        quantity: row?.quantity,
        rate: "",
        percentage: 0,
        rateWithProfit: 0,
        finalPrice: 0,
        expDate: row?.expDate,
        remainingQuantity: 0,
        askedQuantity: row?.quantity,
      });
    }

    // Remove the added item from the outOfStockItems array
    setOutOfStockItems((prevItems) =>
      prevItems.filter((item) => item.itemId !== row.itemId)
    );
  };

  const renderButton = (row: compairedItemType) => {
    return (
      <div key={row.id}>
        <button
          className="renderButtonEdit"
          type="button"
          onClick={() => handleAddItem(row)}
          disabled={row?.remainingQuantity === 0}
        >
          {" "}
          Add Item
        </button>
      </div>
    );
  };

  const mainForm = (
    <div>
      <div className="text-xl font-bold mb-6">Give to Farmer Group</div>

      <div className={"border-2  border-black/20 px-3 rounded py-4"}>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className={"grid grid-cols-3 gap-3"}>
            <div>
              <label htmlFor="">
                Project <RequiredField />{" "}
              </label>
              <select
                className="inputStyle"
                {...register("projectId", {
                  required: "Farmer Group is required",
                })}
              >
                <option value="">--Select Farmer Group--</option>
                {groupOptions}
              </select>
              {errors?.projectId && (
                <ErrorMessage message={errors?.projectId?.message} />
              )}
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
            <div>
              <label htmlFor="">
                Total Price <RequiredField />{" "}
              </label>
              <input
                type="text"
                className="inputStyle cursor-not-allowed"
                {...register("totalPrice", {
                  required: "Total Price is required",
                  valueAsNumber: true,
                })}
                value={totalPrice}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                Payment Method <RequiredField />
              </h1>
              <div className="flex gap-4 ">
                <label>
                  <input
                    type="radio"
                    value="cash"
                    className="mx-2"
                    {...register("paymentMethod", {
                      required: "Payment method is required",
                    })}
                  />
                  Cash
                </label>
                <label>
                  <input
                    type="radio"
                    value="credit"
                    className="mx-2"
                    {...register("paymentMethod", {
                      required: "Payment method is required",
                    })}
                  />
                  Credit
                </label>
                <label>
                  <input
                    type="radio"
                    value="half"
                    className="mx-2"
                    {...register("paymentMethod", {
                      required: "Payment method is required",
                    })}
                  />
                  Both Cash & Credit
                </label>
              </div>

              {watch("paymentMethod") === "cash" && (
                <div>
                  <label htmlFor="">
                    Cash Amount <RequiredField />{" "}
                  </label>
                  <input
                    type="text"
                    className="inputStyle"
                    {...register("cash", {
                      required: "Cash Amount is required",
                      valueAsNumber: true,
                      validate: (value) => value > 0 || "Amount Cannot be zero",
                    })}
                  />
                  {errors?.cash && (
                    <ErrorMessage message={errors?.cash?.message} />
                  )}
                </div>
              )}
              {watch("paymentMethod") === "credit" && (
                <div>
                  <label htmlFor="">
                    Credit Amount <RequiredField />{" "}
                  </label>
                  <input
                    type="text"
                    className="inputStyle"
                    {...register("credit", {
                      required: "Credits Amount is required",
                      valueAsNumber: true,
                      validate: (value) => value > 0 || "Amount Cannot be zero",
                    })}
                  />
                  {errors?.credit && (
                    <ErrorMessage message={errors?.credit?.message} />
                  )}
                </div>
              )}

              {watch("paymentMethod") === "half" && (
                <div className="flex gap-3">
                  <div>
                    <label htmlFor="">
                      Cash Amount <RequiredField />{" "}
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      {...register("cash", {
                        required: "Cash Amount is required",
                        valueAsNumber: true,
                        validate: (value) =>
                          value > 0 || "Amount Cannot be zero",
                      })}
                    />
                    {errors?.cash && (
                      <ErrorMessage message={errors?.cash?.message} />
                    )}
                  </div>
                  <div>
                    <label htmlFor="">
                      Credit Amount <RequiredField />{" "}
                    </label>
                    <input
                      type="text"
                      className="inputStyle"
                      {...register("credit", {
                        required: "Credits Amount is required",
                        valueAsNumber: true,
                        validate: (value) =>
                          value > 0 || "Amount Cannot be zero",
                      })}
                    />
                    {errors?.credit && (
                      <ErrorMessage message={errors?.credit?.message} />
                    )}
                  </div>
                </div>
              )}

              {errors.paymentMethod && (
                <ErrorMessage message={errors.paymentMethod.message} />
              )}
            </div>
          </div>

          {outOfStockItems?.length !== 0 && (
            <div className="my-8">
              <h1 className="text-xl font-bold my-2">Items Out of Stock</h1>
              {isLoadingCompaired ? (
                <Loader />
              ) : (
                <DataTableWithoutPagenation
                  columns={column}
                  data={outOfStockItems}
                  stockOut={true}
                  action={true}
                  renderActionButtons={renderButton}
                />
              )}
            </div>
          )}

          <div className={"px-3 py-2 rounded-md"}>
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

              const priceQuery = priceQueries[index];
              const price = priceQuery?.data || [];
              const priceLoading = priceQuery?.isLoading;

              const remainingQuantityQuery = remainingQuantityQueries[index];
              const remainingQuantity = remainingQuantityQuery?.data || 0;
              const remainingQuantityLoading =
                remainingQuantityQuery?.isLoading;

              const rate = watch(`requestItems.${index}.rate`);
              const percentage = watch(`requestItems.${index}.percentage`);

              const rateWithProfit = Math.floor(
                parseInt(rate) + (percentage / 100) * parseInt(rate)
              );

              const quantity = watch(`requestItems.${index}.quantity`);
              const finalPrice = Math.floor(rateWithProfit * quantity);

              return (
                <div key={field.id} className={" flex flex-col  gap-5"}>
                  <div className=" grid grid-cols-5 gap-3 my-2 ">
                    <div>
                      <label htmlFor="">
                        Type <RequiredField />
                      </label>
                      <select
                        className="inputStyle"
                        {...register(`requestItems.${index}.typeId`, {
                          required: "Type is required",
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
                      <label htmlFor="">
                        Rate <RequiredField />{" "}
                      </label>
                      <Controller
                        control={control}
                        name={`requestItems.${index}.rate`}
                        rules={{ required: "Rate is required" }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className={`inputStyle `}
                            disabled={priceLoading || price?.length === 0}
                          >
                            <option value="">-- Select Rate--</option>
                            {price?.map((item: rateListType, i: number) => {
                              const value = `${item.rate}/${item.expDate}`;
                              return (
                                <option
                                  key={i}
                                  value={item.rate}
                                  selected={
                                    item.rate ===
                                    parseInt(
                                      getValues(`requestItems.${index}.rate`)
                                    )
                                  }
                                >
                                  {item.rate}
                                </option>
                              );
                            })}
                          </select>
                        )}
                      />
                      {errors?.requestItems?.[index]?.rate && (
                        <ErrorMessage
                          message={errors.requestItems[index]?.rate?.message}
                        />
                      )}
                    </div>

                    <div>
                      <label htmlFor="">
                        Quantity Remaining <RequiredField />{" "}
                      </label>
                      <input
                        type="text"
                        className="inputStyle cursor-not-allowed"
                        value={remainingQuantity}
                        {...register(
                          `requestItems.${index}.remainingQuantity`,
                          {
                            required: "Quantity is required",
                            valueAsNumber: true,
                          }
                        )}
                        placeholder={"Remaining Quantity"}
                        readOnly={true}
                      />
                      {errors?.requestItems?.[index]?.remainingQuantity && (
                        <ErrorMessage
                          message={
                            errors.requestItems?.[index]?.remainingQuantity
                              ?.message
                          }
                        />
                      )}
                    </div>
                    <div>
                      <label htmlFor="">
                        Profit % <RequiredField />{" "}
                      </label>
                      <Controller
                        control={control}
                        name={`requestItems.${index}.percentage`}
                        rules={{
                          required: "Percentage is required",
                        }}
                        render={({ field }) => (
                          <input
                            type="number"
                            className="inputStyle"
                            {...field}
                            onChange={(e) => {
                              const newPercentage = e.target.value;
                              const newRateWithProfit =
                                parseInt(watch(`requestItems.${index}.rate`)) +
                                (parseInt(newPercentage) / 100) *
                                  parseInt(watch(`requestItems.${index}.rate`));
                              setValue(
                                `requestItems.${index}.rateWithProfit`,
                                Math.floor(newRateWithProfit)
                              );
                              field.onChange(e); // This updates the percentage field value
                            }}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <label htmlFor="">
                        Rate with Profit <RequiredField />{" "}
                      </label>
                      <input
                        type="Number"
                        className="inputStyle cursor-not-allowed"
                        value={rateWithProfit}
                        {...register(`requestItems.${index}.rateWithProfit`, {
                          required: "New rate is required ",
                          valueAsNumber: true,
                        })}
                        readOnly={true}
                        placeholder="rate with profit"
                      />
                    </div>

                    <div>
                      <label htmlFor="">
                        Quantity <RequiredField />{" "}
                      </label>

                      <Controller
                        control={control}
                        name={`requestItems.${index}.quantity`}
                        rules={{
                          required: "Quantity is required",
                          validate: (value) =>
                            value > 0 || "Quantity must be greater than 0",
                        }}
                        render={({ field: { onChange, ...field } }) => (
                          <input
                            type="text"
                            className={`${
                              remainingQuantity <
                              watch(`requestItems.${index}.quantity`)
                                ? "border border-red-800 bg-red-400 text-white"
                                : ""
                            } inputStyle`}
                            {...field}
                            onChange={(e) => {
                              onChange(e);
                              const newQuantity =
                                e.target.value ||
                                getValues(
                                  `requestItems.${index}.quantity`
                                ).toString();
                              const calculatedFinalPrice =
                                rateWithProfit * parseInt(newQuantity);
                              console.log(calculatedFinalPrice, "calculated");

                              setValue(
                                `requestItems.${index}.finalPrice`,
                                Math.floor(calculatedFinalPrice)
                              );
                            }}
                            placeholder={"quantity"}
                          />
                        )}
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
                      <label htmlFor="">
                        Final Price <RequiredField />{" "}
                      </label>
                      <input
                        type="Number"
                        className={` inputStyle cursor-not-allowed `}
                        value={finalPrice}
                        {...register(`requestItems.${index}.finalPrice`, {
                          required: "Final Price is required",
                          valueAsNumber: true,
                        })}
                        defaultValue={0}
                        readOnly={true}
                        placeholder="Final Price"
                      />
                      {errors?.requestItems?.[index]?.finalPrice && (
                        <ErrorMessage
                          message={
                            errors.requestItems?.[index]?.finalPrice?.message
                          }
                        />
                      )}
                    </div>

                    {fields?.length > 1 && (
                      <button
                        className="bg-red-600 flex items-center rounded px-3 py-2 h-10 w-10 mt-5 text-white"
                        type="button"
                        onClick={(e) => handleRemove(index)}
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
              onClick={() => router.push("/request/company/incomming")}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-600 rounded hover:bg-blue-700 px-6 py-2 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={isSubmitting || remainingQuantityIssues ? true : false}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (isError || isErrorCompaired || isErrorProjectId) return <Error />;

  return (
    <>
      {projectLoading || isLoadingCompaired || isLoadingProjectId ? (
        <Loader />
      ) : (
        mainForm
      )}
    </>
  );
}

export default ApproveIncommingRequestFromProject;
