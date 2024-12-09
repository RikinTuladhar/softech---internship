"use client";
import { DataTable } from "@/src/components/DataTable";
import AddButton from "@/src/components/reusable/AddButton";
import { useQuery } from "@tanstack/react-query";
import { Vehicle } from "@/types/types";
import {
  GetVehicle,
  DeleteVehicle,
} from "@/src/services/apiService/vehicle/vehicleService";
import { ColumnDef } from "@tanstack/react-table";
import Loader from "@/src/components/reusable/Loader";
import { useRouter } from "next/navigation";
const column: ColumnDef<Vehicle>[] = [
  { accessorKey: "id", header: "S.N", cell: (info) => info.row.index + 1 },
  { accessorKey: "vehicleTypeName", header: "Vehicle Type" },
  { accessorKey: "regNo", header: "Registration No." },
  { accessorKey: "model", header: "Model" },
  { accessorKey: "vehicleNumber", header: "Vehicle Number" },
];
const getVehicles = async () => {
  const { data } = await GetVehicle();
  return data;
};

export default function VehicleIndexPage() {
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["vehicle"],
    queryFn: getVehicles,
  });
  const formattedData = apiData?.map((item: Vehicle, index: number) => {
    return {
      ...item,
      vehicleTypeName: item.type.name,
    };
  });

  const handleEdit = (id: number) => {
    router.push(`/vehicle/vehicle/createVehicle/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      const { status } = await DeleteVehicle(id);
      if (status === 200) {
        refetch();
      }
    } catch (error) {}
  };

  const renderButtons = (row: Vehicle) => {
    return (
      <div className={"flex items-center justify-center gap-3 text-white"}>
        <button
          type={"button"}
          className={"renderButtonEdit"}
          onClick={() => handleEdit(row.id)}
        >
          Edit
        </button>
        <button
          type={"button"}
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
        link={"/vehicle/vehicle/createVehicle"}
        title={"Vehicle"}
        buttonTitle={"Add Vehicle"}
      />
      <DataTable
        columns={column}
        data={formattedData}
        renderActionButtons={renderButtons}
        action={true}
      />
    </div>
  );
  return <>{isLoading ? <Loader /> : table}</>;
}
