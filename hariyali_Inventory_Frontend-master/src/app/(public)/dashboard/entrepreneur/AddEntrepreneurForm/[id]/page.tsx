"use client";
import { GetBusinessManagerById } from "@/src/services/apiService/layerSetup/businessManager/businessManagerServices";
import AddMerchantForm from "../AddBusinessManagerComp";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
async function getBussinessManagerById(id: string) {
  const { data } = await GetBusinessManagerById(id);
  return data;
}
export default function EditBusinessManager() {
  const { id }: { id: string } = useParams();
  const {
    data: apiData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["businessManagerById", id],
    queryFn: () => getBussinessManagerById(id),
    enabled: !!id,
  });
  if (isError) return <Error />;

  if (isLoading) return <Loader />;
  return (
    <>
      <AddMerchantForm clickedIdData={apiData} />
    </>
  );
}
