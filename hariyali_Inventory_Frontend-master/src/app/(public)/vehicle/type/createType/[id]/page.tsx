"use client";
import { useParams } from "next/navigation";
import { GetVehicleTypeById } from "@/src/services/apiService/vehicle/vehicleService";
import { useQuery } from "@tanstack/react-query";

import CreateVehicleTypePage from "../page";
const getVehicleTypeById = async (id: number) => {
  const { data } = await GetVehicleTypeById(id);
  return data;
};

export default function EditVehicleType() {
  const { id }: { id: string } = useParams();
  const {
    data: apiData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["vehicletypebyId", parseInt(id)],
    queryFn: () => getVehicleTypeById(parseInt(id)),
    enabled: !!id,
  });

  return <>{isLoading ? "Loading" : <CreateVehicleTypePage />}</>;
}
