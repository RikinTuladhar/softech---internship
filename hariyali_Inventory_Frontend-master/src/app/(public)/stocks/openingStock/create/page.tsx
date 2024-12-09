"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import BikramSambat from "bikram-sambat-js";
import { useRouter } from "next/navigation";
import { getMaterialType } from "@/src/services/apiService/setup/MaterialType/MaterialType";
import { getMaterialCategoryByType } from "@/src/services/apiService/setup/MaterialCategory/MaterialCategory";
import { GetSubCategoryByCategoryId } from "@/src/services/apiService/setup/MaterialSubCategory/materialSubCategoryServices";
import { getItemBySubCategory } from "@/src/services/apiService/setup/Item/ItemServices";
import { getVendor } from "@/src/services/apiService/setup/Vendor/VendorServices";
import {
  Category,
  Item,
  MaterialType,
  SubCategory,
  Vendor,
} from "@/types/types";
import { CreateOpeningStock } from "@/src/services/apiService/stock/openingStock/openingStockServices";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "@/src/components/reusable/ErrorMessage";
import { rule } from "postcss";
const aa = new BikramSambat(new Date()).toBS();

const GetCategoryByType = async (id: number) => {
  try {
    const { data } = await getMaterialCategoryByType(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const MaterialSubCategoryByCategoryId = async (id: number) => {
  try {
    const { data } = await GetSubCategoryByCategoryId(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const ItemBySubCategoryId = async (id: number) => {
  try {
    const { data } = await getItemBySubCategory(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const GetVendor = async () => {
  try {
    const { data } = await getVendor();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default function createOpeningStock() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting},
    setValue,
  } = useForm();
  const watchFields = watch();
  const router = useRouter();
  const [purchaseDate, setPurchaseDate] = useState(aa);
  const [expireDate, setExpireDate] = useState(aa);
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
  const materialTypeOptions = materialType?.map((item, index) => {
    return <option value={item.id}>{item.name}</option>;
  });

  //category
  const { data: CategoryByTypeList } = useQuery({
    queryKey: ["categoryByTypeId", watchFields?.materialTypeId],
    queryFn: () => GetCategoryByType(watchFields?.materialTypeId),
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
      MaterialSubCategoryByCategoryId(watchFields?.materialCategoryId),
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

  //Item by subcategory
  const { data: ItemBySubCategory } = useQuery({
    queryKey: ["itemBySubCategoryId", watchFields?.materialSubCategoryId],
    queryFn: () => ItemBySubCategoryId(watchFields?.materialSubCategoryId),
    enabled: !!watchFields?.materialSubCategoryId,
  });

  const itemOptions = ItemBySubCategory?.map((item: Item, index: number) => {
    return (
      <option value={item.id} key={index}>
        {item.name}
      </option>
    );
  });

  // Vendor
  const { data: Vendor } = useQuery({
    queryKey: ["vendor"],
    queryFn: GetVendor,
  });

  const vendorOptions = Vendor?.map((item: Vendor, index: number) => {
    return (
      <option value={item.id} key={index}>
        {item.vendorName}
      </option>
    );
  });

  useEffect(() => {
    const price = watchFields?.rate * watchFields?.quantity;
    setValue("price", price);
  }, [watchFields?.rate, watchFields?.quantity, setValue]);

  useEffect(() => {
    if (watchFields?.vat === true) {
      const finalPrice = watchFields?.price + 0.13 * watchFields?.price;
      setValue("finalPrice", finalPrice);
    } else {
      setValue("finalPrice", watchFields?.price);
    }
  }, [watchFields?.vat, setValue, watchFields?.price]);

  const onSubmit = async (data: FieldValues) => {
    data = {
      ...data,
      purcheseDate: purchaseDate,
      expDate: expireDate,
    };
    try {
      const { status } = await CreateOpeningStock(data);
      if (status === 200) {
        router.push("/stocks/openingStock");
      }
    } catch (error) {
      console.log(error);
    }
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
          <div className="flex flex-col gap-2">
            <label className="labelText">
              Type of Material <span className="text-red-600">*</span>
            </label>

            <select
              className="inputStyle"
              {...register("materialTypeId", {
                required: "Material Type is required",
                valueAsNumber: true,
              })}
            >
              <option value="" selected disabled>
                -- Select Material Type --
              </option>
              {materialTypeOptions}
            </select>
            {errors?.materialTypeId && (
              <ErrorMessage message={errors.materialTypeId.message} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="labelText ">
              Category of Material <span className="text-red-600">*</span>
            </label>

            <select
              className="inputStyle"
              {...register("materialCategoryId", {
                required: "Category is required",
                valueAsNumber: true,
              })}
            >
              <option value="" selected disabled>
                -- Select Category --
              </option>
              {categoryOptions}
            </select>
            {errors?.materialCategoryId && (
              <ErrorMessage message={errors.materialCategoryId.message} />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="labelText ">
              Sub Category <span className="text-red-600">*</span>
            </label>

            <select
              className="inputStyle"
              {...register("materialSubCategoryId", {
                required: " Sub Category is required",
                valueAsNumber: true,
              })}
            >
              <option value="" selected disabled>
                -- Select Item --
              </option>
              {subCategoryOptions}
            </select>
            {errors?.materialSubCategoryId && (
              <ErrorMessage message={errors.materialSubCategoryId.message} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="labelText  ">
              Item <span className="text-red-600">*</span>
            </label>

            <select
              className="inputStyle"
              {...register("itemId", {
                required: "Item is required",
                valueAsNumber: true,
              })}
            >
              <option value="" selected disabled>
                -- Select Item --
              </option>
              {itemOptions}
            </select>
            {errors?.itemId && <ErrorMessage message={errors.itemId.message} />}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="labelText">
              Vendor <span className="text-red-600">*</span>
            </label>
            <select
              className="inputStyle"
              {...register("vendorId", {
                required: "Ventor  is required",
                valueAsNumber: true,
              })}
            >
              <option value="" disabled selected>
                -- Select Vendor --
              </option>
              {vendorOptions}
            </select>
            {errors?.vendorId && (
              <ErrorMessage message={errors.vendorId.message} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="labelText">
              Purchase Date <span className="text-red-600">*</span>
            </label>
            <NepaliDatePicker
              inputClassName="inputStyle "
              className=""
              value={purchaseDate}
              onChange={(value: string) => setPurchaseDate(value)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="labelText">
              Expiry Date <span className="text-red-600">*</span>
            </label>
            <NepaliDatePicker
              inputClassName="inputStyle "
              className=""
              value={expireDate}
              onChange={(value: string) => setExpireDate(value)}
              options={{ calenderLocale: "en", valueLocale: "en" }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="labelText">
              Rate <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="inputStyle"
              {...register("rate", {
                required: "Rate is requierd",
                valueAsNumber: true,
                
              }
            )}
            min={1}
              defaultValue={0}
              placeholder="Rate"
            />
            {errors?.rate && <ErrorMessage message={errors.rate.message} />}
            
          </div>

          <div className="flex flex-col gap-2">
            <label className="labelText  ">
              Quantity <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              className="inputStyle"
              placeholder="Quantity"
              {...register("quantity", {
                required: "Quantity is required",
                valueAsNumber: true,
              })}
              defaultValue={0}
            />
            {errors?.rate && <ErrorMessage message={errors.rate.message} />}
            
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="labelText">
              Price <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="inputStyle"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              defaultValue={""}
              placeholder="Price"
            />
          </div>
          <div className="relative flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="labelText">
                Total Price <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="inputStyle"
                {...register("finalPrice", {
                  required: "final Price is required",
                  valueAsNumber: true,
                })}
                placeholder="Total Price"
                readOnly
              />
            </div>
            <div className="flex gap-3 items-center absolute left-28 ">
              <input
                type="checkbox"
                className="h-6 w-6"
                {...register("vat", { setValueAs: Boolean })}
              />
              <label htmlFor="">Vat</label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="labelText">
              Remarks
            </label>
            <textarea
              cols={4}
              rows={3}
              className="border border-black/60 px-2 py-1"
              placeholder="Remarks"
              {...register("remarks")}
            />
          </div>
        </div>

        <div className=" flex my-6 gap-8 ">
          <button
            className="cancelButton"
            type="button"
            onClick={() => router.push(".")}
          >
            Cancel
          </button>
          <button
            className="submitButton"
            disabled={isSubmitting || watch('rate') === 0 || watch('quantity') === 0}
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
