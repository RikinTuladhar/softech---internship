"use client";
import CreateCompany from "../CreateCompany";
import { getVehicleCompanyById } from "@/src/services/apiService/vehicle/vehicleService";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const GetVehicleCompanyById = async (id: number) => {
  const { data } = await getVehicleCompanyById(id);
  return data;
};

export default function EditCompanyPage() {
  const { id }: { id: string } = useParams();
  const {
    data: apiData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["companybyid", parseInt(id)],
    queryFn: () => GetVehicleCompanyById(parseInt(id)),
    enabled: !!id,
  });
  return (
    <>{isLoading ? "Loading" : <CreateCompany clickedDataId={apiData} />}</>
  );
}
