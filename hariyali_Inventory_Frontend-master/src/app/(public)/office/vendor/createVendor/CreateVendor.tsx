"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { createVendor } from "@/src/services/apiService/setup/Vendor/VendorServices";
import {
  GetDistrict,
  GetPalika,
  GetState,
  GetAllDistrict,GetAllPalika
} from "@/src/services/apiService/setup/Office/OfficeServices";
import { useParams } from "next/navigation";
import { Vendor } from "@/types/types";
import Loader from "@/src/components/reusable/Loader";

const getAllDitrict = async()=>{
  const {data} = await GetAllDistrict();
  return data;
}
const getAllPalika = async()=>{
  const {data} = await GetAllPalika();
  return data;
}
export default function CreateVendor({clickedIdData}:{clickedIdData?:Vendor}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      id:0,
      vendorName: "",
      pan_vat: "",
      vendorState: 0,
      vendorDistrict: 0,
      vendorPalika: 0,
      vendorWard: "",
      vendorTole: "",
      vendorHouseNo: "",
      vendorContact: "",
      contactPersonName: "",
      contactPersonPhoneNo: "",
      contactPersonDetails: "",
    },
  });
  const {id} = useParams();

  const watchFields = watch();
  const [state, setState] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await GetState();
      if (response?.status === 200) {
        setState(response?.data);
      }
    };
    fetchData();
  }, []);

  const {data:allDistrict,isLoading:allDistrictLoading} = useQuery({
    queryKey:['allDistrict'],
    queryFn:getAllDitrict
  })
  const {data:allPalika,isLoading:allPalikaLoading} = useQuery({
    queryKey:['allPalika'],
    queryFn:getAllPalika
  })

  const [district, setDistrict] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await GetDistrict(watchFields?.vendorState);
      if (response?.status === 200) {
        setDistrict(response?.data);
      }
    };
    fetchData();
  }, [watchFields?.vendorState]);

  const [palika, setPalika] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetPalika(watchFields?.vendorDistrict);
      if (response?.status === 200) {
        setPalika(response?.data);
      }
    };
    fetchData();
  }, [watchFields?.vendorDistrict]);

  const palikaOptions = palika?.map((item: any, index) => {
    return (
      <option value={item.PalikaId} key={index}>
        {item.PalikaName}
      </option>
    );
  });
  const allPalikaOptions = allPalika?.map((item: any, index:number) => {
    return (
      <option value={item.PalikaId} key={index}>
        {item.PalikaName}
      </option>
    );
  });

  useEffect(()=>{
    if(clickedIdData){
      setValue('id',clickedIdData?.id);
      setValue('vendorName',clickedIdData?.vendorName);
      setValue('pan_vat',clickedIdData?.pan_vat);
      setValue('vendorState',clickedIdData?.vendorState);
      setValue('vendorDistrict',clickedIdData?.vendorDistrict);
      setValue('vendorPalika',clickedIdData?.vendorPalika);
      setValue('vendorWard',clickedIdData?.vendorWard);
      setValue('vendorTole',clickedIdData?.vendorTole);
      setValue('vendorHouseNo',clickedIdData?.vendorHouseNo);
      setValue('vendorContact',clickedIdData?.vendorContact);
      setValue('contactPersonDetails',clickedIdData?.contactPersonDetails);
      setValue('contactPersonName',clickedIdData?.contactPersonName);
      setValue('contactPersonPhoneNo',clickedIdData?.contactPersonPhoneNo);
    }
  },[setValue,clickedIdData])

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await createVendor(data);
      if (response?.status === 200) {
        router.push("/office/vendor");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(data, "response");
  };

  const handleBack = (e: FormEvent) => {
    e.preventDefault();
    router.push(".");
  };

  const table = 

    <div className="mt-16">
      <div>
        <h1 className="text-lg font-bold mx-3">Create Vendor</h1>
      </div>
      <form className="px-4 py-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col">
            <label className="labelText">
              Vendor Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register("vendorName", {
                required: "Vendor Name is required",
              })}
              className="inputStyle"
              placeholder="Vendor Name"
            />
          </div>
          <div className="flex flex-col">
            <label className="labelText">
              Contact Number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register("vendorContact", {
                required: "Contact Number is required",
              })}
              className="inputStyle"
              placeholder="Contact Number"
            />
          </div>
          <div className="flex flex-col">
            <label className="labelText">
              Pan/Vat <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register("pan_vat", { required: "PAN/VAT is required" })}
              className="inputStyle"
              placeholder="PAN/VAT"
            />
          </div>
          <div className="flex flex-col">
            <label className="labelText">
              State <span className="text-red-600">*</span>
            </label>
            <select
              {...register("vendorState", {
                required: "State is required",
                valueAsNumber: true,
              })}
              className="inputStyle"
            >
              <option value={0} selected disabled>
                -- Select State --
              </option>
              {state?.map((item: any, index: number) => {
                return (
                  <option value={item.StateId} key={index}>
                    {item.StateName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="labelText">
              District <span className="text-red-600">*</span>
            </label>
            <select
              {...register("vendorDistrict", {
                required: "District is required",
                valueAsNumber: true,
              })}
              className="inputStyle"
            >
              <option value={0} selected disabled>
                -- Select District --
              </option>
             { !id ? district?.map((item: any, index: number) => {
                return (
                  <option key={index} value={item.DistrictId}>
                    {item.DistrictName}
                  </option>
                );
              }) :
              allDistrict?.map((item: any, index: number) => {
                return (
                  <option key={index} value={item.DistrictId}>
                    {item.DistrictName}
                  </option>
                );
              })}
              {/* Add district options here */}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="labelText">
              Paalika <span className="text-red-600">*</span>
            </label>
            <select
              {...register("vendorPalika", {
                required: "Paalika is required",
                valueAsNumber: true,
              })}
              className="inputStyle"
            >
              <option value={0} selected disabled>
                -- Select Paalika --
              </option>
              { !id ? palikaOptions : allPalikaOptions}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="labelText">
              Ward Number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register("vendorWard", {
                required: "Ward Number is required",
              })}
              className="inputStyle"
              placeholder="Ward"
            />
          </div>
          <div className="flex flex-col">
            <label className="labelText">
              Toll Number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register("vendorTole", {
                required: "Toll Number is required",
              })}
              className="inputStyle"
              placeholder="Tole"
            />
          </div>
          <div className="flex flex-col">
            <label className="labelText">
              House No. <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register("vendorHouseNo", {
                required: "House No. is required",
              })}
              className="inputStyle"
              placeholder="House no."
            />
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-lg font-bold my-4">Contact Person</h1>
          <div className="grid md:grid-cols-3 gap-3">
            <div>
              <label htmlFor="" className="labelText">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="inputStyle"
                placeholder="Name"
                {...register("contactPersonName", {
                  required: "Name is required",
                })}
              />
            </div>
            <div>
              <label htmlFor="" className="labelText">
                Contact Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="inputStyle"
                placeholder="Contact Number"
                {...register("contactPersonPhoneNo", {
                  required: "Contact Number is required",
                })}
              />
            </div>
            <div>
              <label htmlFor="" className="labelText">
                Detail <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="inputStyle"
                placeholder=" Eg. 'Branch Manager'"
                {...register("contactPersonDetails", {
                  required: "Detail is required",
                })}
              />
            </div>
          </div>
        </div>
        <div className="flex my-6 gap-8">
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
  return (
    <>
{allDistrictLoading || allPalikaLoading ? <Loader/> : table}
    </>
  );
}
