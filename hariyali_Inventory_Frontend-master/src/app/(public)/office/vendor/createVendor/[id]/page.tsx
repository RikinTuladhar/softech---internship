'use client';
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CreateVendor from '../CreateVendor'
import {getVendorById} from '@/src/services/apiService/setup/Vendor/VendorServices'
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
const GetVendorById = async(id:number)=>{
  const {data} =  await getVendorById(id);
  return data;
}

function EditVendor() {
  const {id}:{id:string} = useParams();
  const {data:apiData,isError,isLoading} = useQuery({
    queryKey:['vendorById',id],
    queryFn:()=>GetVendorById(parseInt(id)),
    enabled:!!id
  })
  if(isError) return <Error/>
  return <div>
{isLoading?<Loader/>:<CreateVendor clickedIdData={apiData} />}
  </div>;
}

export default EditVendor;
