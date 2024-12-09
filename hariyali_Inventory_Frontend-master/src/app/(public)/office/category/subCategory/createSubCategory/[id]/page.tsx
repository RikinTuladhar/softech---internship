"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GetSubCategoryById } from "@/src/services/apiService/setup/MaterialSubCategory/materialSubCategoryServices";
import { useParams } from "next/navigation";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import CreateSubCategoryComp from "../createSubCategory";
const getSubCategoryById = async (id: number) => {
  const { data } = await GetSubCategoryById(id);
  return data;
};
function EditSubCategory() {
  const { id }: { id: string } = useParams();
  const {
    data: apiData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["subCategoryById", id],
    queryFn: () => getSubCategoryById(parseInt(id)),
    enabled: !!id,
  });
  if(isError) return <Error/>
  return <>
  {isLoading ? <Loader/> : <CreateSubCategoryComp clickedIdData={apiData} />}
  </>
}

export default EditSubCategory;
