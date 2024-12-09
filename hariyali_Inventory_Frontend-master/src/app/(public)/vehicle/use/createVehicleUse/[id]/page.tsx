"use client";
import { useParams } from "next/navigation";
import { GetVehicleUseById } from "@/src/services/apiService/vehicle/vehicleService";
import { useQuery } from "@tanstack/react-query";
import CreateVehicleUseComp from "@/src/app/(public)/vehicle/use/createVehicleUse/CreateVehicleUseComp";
import Loader from "@/src/components/reusable/Loader";

const getVehicleUseById = async (id: number) => {
  const { data } = await GetVehicleUseById(id);
  return data;
};
export default function EditVehicleType() {
  const { id }: { id: string } = useParams();
  const {
    data: apiData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["vehicleusebyid", parseInt(id)],
    queryFn: () => getVehicleUseById(parseInt(id)),
    enabled: !!id,
  });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <CreateVehicleUseComp clickedDataId={apiData} />
      )}
    </>
  );
}
