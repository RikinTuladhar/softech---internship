"use client";
import { useQuery } from "@tanstack/react-query";
import { Company } from "@/types/types";
import {
  GetVehicleCategory,
  DeleteVehicleCategory,
} from "@/src/services/apiService/vehicle/vehicleService";
import { ColumnDef } from "@tanstack/react-table";
import AddButton from "@/src/components/reusable/AddButton";
import { DataTable } from "@/src/components/DataTable";
import Loader from "@/src/components/reusable/Loader";
import { useRouter } from "next/navigation";

const getVehicleCategory = async () => {
  const { data } = await GetVehicleCategory();
  return data;
};
const column: ColumnDef<Company>[] = [
  { accessorKey: "id", header: "S.N", cell: (info) => info.row.index + 1 },
  { accessorKey: "name", header: "Vehicle Category" },
];

export default function VehicleCategoryIndexComp() {
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["vehicleCategory"],
    queryFn: getVehicleCategory,
  });

  const handleEdit = (id: number) => {
    router.push(`/vehicle/category/createVehicleCategory/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      const { status } = await DeleteVehicleCategory(id);
      if (status === 200) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderButtons = (row: Company) => {
    return (
      <div className="flex items-center justify-center gap-3 text-white ">
        <button
          className={"renderButtonEdit"}
          onClick={() => handleEdit(row.id)}
        >
          Edit
        </button>
        <button
          className={"renderButtonDelete"}
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </button>
      </div>
    );
  };

  const table = (
    <div>
      <AddButton
        link={`/vehicle/category/createVehicleCategory`}
        title={"Vehicle Category"}
        buttonTitle={"Add Vehicle Category"}
      />
      <DataTable
        columns={column}
        data={apiData}
        action={true}
        renderActionButtons={renderButtons}
      />
    </div>
  );

  return <>{isLoading ? <Loader /> : table}</>;
}
