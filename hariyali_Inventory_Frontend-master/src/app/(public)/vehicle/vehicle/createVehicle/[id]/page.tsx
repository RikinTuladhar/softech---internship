"use client";
import { useParams } from "next/navigation";
import { GetVehicleById } from "@/src/services/apiService/vehicle/vehicleService";
import { useQuery } from "@tanstack/react-query";
import CreateVehicleComp from "@/src/app/(public)/vehicle/vehicle/createVehicle/CreateVehicleComp";
import Loader from "@/src/components/reusable/Loader";
const getVehicleById = async (id: number) => {
  const { data } = await GetVehicleById(id);
  return data;
};
export default function VehicleEditPage() {
  const { id }: { id: string } = useParams();
  console.log(id, "response");

  const {
    data: apiData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["vehicleById", parseInt(id)],
    queryFn: () => getVehicleById(parseInt(id)),
    enabled: !!id,
  });
  console.log(apiData, "response");
  return (
    <>
      {isLoading ? <Loader /> : <CreateVehicleComp clickedDataId={apiData} />}
    </>
  );
}
