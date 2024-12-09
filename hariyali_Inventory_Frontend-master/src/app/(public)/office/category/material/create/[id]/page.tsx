"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMaterialCategoryById } from "@/src/services/apiService/setup/MaterialCategory/MaterialCategory";
import CreateMaterialComp from "../CreateMaterialComp";
import { useParams } from "next/navigation";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
const GetMaterialCategoryById = async (id: number) => {
  const { data } = await getMaterialCategoryById(id);
  return data;
};

function EditCategory() {
  const { id }: { id: string } = useParams();
  const {
    data: apiData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["materialCategoryById", id],
    queryFn: () => GetMaterialCategoryById(parseInt(id)),
    enabled: !!id,
  });
if(isError) return <Error/>
  return (
    <>
    {
      isLoading ? <Loader/> : 
      <CreateMaterialComp clickedIdData = {apiData}  />
    }
    </>
  );
}

export default EditCategory;
