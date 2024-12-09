"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  GetVehicleType,
  DeleteVehicleType,
} from "@/src/services/apiService/vehicle/vehicleService";
import { DataTable } from "@/src/components/DataTable";
import { Company } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import AddButton from "@/src/components/reusable/AddButton";
import { useRouter } from "next/navigation";

const column: ColumnDef<Company>[] = [
  {
    accessorKey: "id",
    header: "S.N",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Vehicle Type Name",
  },
];
const getVehicleType = async () => {
  const { data } = await GetVehicleType();
  return data;
};
function VehicleType() {
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["vehicleType"],
    queryFn: getVehicleType,
  });
  const handleEdit = (id: number) => {
    router.push(`/vehicle/type/createType/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      const { status } = await DeleteVehicleType(id);
      if (status === 200) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderButtons = (row: Company) => {
    return (
      <div className={"flex items-center justify-center gap-3 text-white"}>
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
    <div className={"mx-3"}>
      <AddButton
        link={"/vehicle/type/createType"}
        title={"Vehicle Type"}
        buttonTitle={"Create Vehicle Type"}
      />
      <DataTable
        columns={column}
        data={apiData}
        renderActionButtons={renderButtons}
        action={true}
      />
    </div>
  );

  return <>{isLoading ? "Loading ..." : table}</>;
}

export default VehicleType;
