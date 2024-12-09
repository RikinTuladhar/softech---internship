"use client";

import { DataTable } from "@/src/components/DataTable";
import { useQuery } from "@tanstack/react-query";
import {
  GetVehicleUse,
  DeleteVehicleUse,
} from "@/src/services/apiService/vehicle/vehicleService";
import { ColumnDef } from "@tanstack/react-table";
import { Company } from "@/types/types";
import Loader from "@/src/components/reusable/Loader";
import AddButton from "@/src/components/reusable/AddButton";
import { useRouter } from "next/navigation";
const column: ColumnDef<Company>[] = [
  { accessorKey: "id", header: "S.N", cell: (info) => info.row.index + 1 },
  { accessorKey: "name", header: "Vehicle Use" },
];
const getVehicleUse = async () => {
  const { data } = await GetVehicleUse();
  return data;
};

export default function VehicleUseComp() {
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["vehicleUse"],
    queryFn: getVehicleUse,
  });
  const handleEdit = (id: number) => {
    router.push(`/vehicle/use/createVehicleUse/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      const { status } = await DeleteVehicleUse(id);
      if (status === 200) {
        refetch();
      }
    } catch (error) {}
  };

  const renderButtons = (row: Company) => {
    return (
      <div className={"flex items-center justify-center gap-3 text-white"}>
        <button
          className={"renderButtonEdit"}
          onClick={() => handleEdit(row.id)}
        >
          {"Edit"}
        </button>
        <button
          className={"renderButtonDelete"}
          onClick={() => handleDelete(row.id)}
        >
          {"Delete"}
        </button>
      </div>
    );
  };

  const table = (
    <div>
      <AddButton
        link={"/vehicle/use/createVehicleUse"}
        title={"Vehicle Use"}
        buttonTitle={"Add Vehicle Use"}
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
