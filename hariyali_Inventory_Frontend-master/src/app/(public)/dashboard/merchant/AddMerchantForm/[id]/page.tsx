"use client";
import { useParams } from "next/navigation";
import { GetHariyaliProjectById } from "@/src/services/apiService/layerSetup/project/projectServices";
import AddProjectComp from "@/src/app/(public)/dashboard/merchant/AddMerchantForm/AddProjectComp";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
const getHariyaliProjectById = async (id: string) => {
  const { data } = await GetHariyaliProjectById(id);
  return data;
};

export default function ProjectEditPage() {
  const { id }: { id: string } = useParams();
  const {
    data: apiData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["hariyaliProjectById", id],
    queryFn: () => getHariyaliProjectById(id),
    enabled: !!id,
  });
  if (isError) return <Error />;
  return (
    <>{isLoading ? <Loader /> : <AddProjectComp clickedDataId={apiData} />}</>
  );
}
