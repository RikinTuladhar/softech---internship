"use client";
import { GetVehicleCategoryById } from "@/src/services/apiService/vehicle/vehicleService";
import Loader from "@/src/components/reusable/Loader";
import CreateVehicleCategoryComp from "@/src/app/(public)/vehicle/category/createVehicleCategory/CreateVehicleCategoryComp";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const getVehicleCategoryById = async (id: number) => {
  const { data } = await GetVehicleCategoryById(id);
  return data;
};

export default function EditVehicleCategory() {
  const { id }: { id: string } = useParams();
  const {
    data: apiData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["vehicleCategorybyId", parseInt(id)],
    queryFn: () => getVehicleCategoryById(parseInt(id)),
    enabled: !!id,
  });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <CreateVehicleCategoryComp clickedDataId={apiData} />
      )}
    </>
  );
}
