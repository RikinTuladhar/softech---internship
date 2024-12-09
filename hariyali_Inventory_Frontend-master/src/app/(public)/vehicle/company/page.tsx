"use client";
import React from "react";
import AddButton from "@/src/components/reusable/AddButton";
import { Company } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  getVehicleCompany,
  deleteVehicleCompany,
} from "@/src/services/apiService/vehicle/vehicleService";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/src/components/DataTable";
import { useRouter } from "next/navigation";
import Loader from "@/src/components/reusable/Loader";
const GetVehicleCompany = async () => {
  const { data } = await getVehicleCompany();
  return data;
};
const column: ColumnDef<Company>[] = [
  {
    accessorKey: "id",
    header: "S.N",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Company Name",
  },
];
function VehicleCompany() {
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["VehicleCompany"],
    queryFn: GetVehicleCompany,
  });

  const handleEdit = (id: number) => {
    router.push(`/vehicle/company/createCompany/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      const { status } = await deleteVehicleCompany(id);
      if (status === 200) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const renderButtons = (row: Company) => {
    return (
      <div className={"flex items-center justify-center text-white gap-3"}>
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
        title="Company"
        buttonTitle="Add Company"
        link="/vehicle/company/createCompany"
      />
      <DataTable
        data={apiData}
        columns={column}
        action={true}
        renderActionButtons={renderButtons}
      />
    </div>
  );
  return <>{isLoading ? <Loader /> : table}</>;
}

export default VehicleCompany;
