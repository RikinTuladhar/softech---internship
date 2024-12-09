"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getItemById } from "@/src/services/apiService/setup/Item/ItemServices";
import { useParams } from "next/navigation";
import CreateItemComp from "../CreateItemPage";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
const GetItemById = async (id: number) => {
  const { data } = await getItemById(id);
  return data;
};
function EditItem() {
  const { id }: { id: string } = useParams();
  const {
    data: apiData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["itemById", id],
    queryFn: () => GetItemById(parseInt(id)),
    enabled: !!id,
  });
  if(isError) return <Error/>
  return (
    <>
    {isLoading ? <Error/> : <CreateItemComp clickedIdData={apiData} />}
    </>
  )
}

export default EditItem;
