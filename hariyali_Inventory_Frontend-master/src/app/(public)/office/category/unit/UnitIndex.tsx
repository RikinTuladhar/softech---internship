"use client";
import React from "react";
import {
  deleteUnit,
  getUnit,
} from "@/src/services/apiService/setup/unit/unitServices";
import AddButton from "@/src/components/reusable/AddButton";
import { UnitType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/src/components/DataTable";
import { useRouter } from "next/navigation";

const columns: ColumnDef<UnitType>[] = [
  {
    accessorKey: "id",
    header: "S.N",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Unit Name",
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
];
const GetUnit = async () => {
  const { data } = await getUnit();
  return data;
};

export default function UnitIndex() {
  const router = useRouter();

  const {
    data: unitList,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["unit"],
    queryFn: GetUnit,
  });

  const handleEdit = (id: number) => {
    router.push(`/office/category/unit/createUnit/${id}`);
  };

  const handleDelete = async (id: number) => {
    const { status } = await deleteUnit(id);
    if (status === 200) {
      refetch();
    }
    // Implement delete logic here
    console.log("Delete action for row:", id);
  };

  const renderActionButtons = (row: UnitType) => (
    <div className="flex items-center justify-center gap-5">
      <button
        className="bg-green-600 text-white px-6 py-2 shadow-md"
        onClick={() => handleEdit(row.id)}
      >
        Edit
      </button>
      <button
        className="bg-red-600 text-white px-6 py-2 shadow-md"
        onClick={() => handleDelete(row.id)}
      >
        Delete
      </button>
    </div>
  );

  return (
    <div className="mx-6">
      <AddButton
        title="Units"
        link="/office/category/unit/createUnit"
        buttonTitle="Add Units"
      />
      {isLoading ? (
        "Loading"
      ) : (
        <DataTable
          data={unitList}
          columns={columns}
          action={true}
          renderActionButtons={renderActionButtons}
        />
      )}
    </div>
  );
}
