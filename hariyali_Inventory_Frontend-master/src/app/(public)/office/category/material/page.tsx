"use client";
import React from "react";
import {
  deleteMaterialCategory,
  getMaterialCategory,
} from "@/src/services/apiService/setup/MaterialCategory/MaterialCategory";
import AddButton from "@/src/components/reusable/AddButton";
import { Category } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/src/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Loader from "@/src/components/reusable/Loader";

const column: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "S.N",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "materialTypeName",
    header: "Material Type",
  },
  {
    accessorKey: "name",
    header: "Material Category",
  },
];

const GetMaterialCategory = async () => {
  const { data } = await getMaterialCategory();
  return data;
};
export default function CategoryIndex() {
  const router = useRouter();
  const {
    data: materialCategory,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Category"],
    queryFn: GetMaterialCategory,
  });
  const formattedData = React.useMemo(
    () =>
      materialCategory?.map((item: Category) => {
        return {
          materialTypeName: item.materialType.name,
          ...item,
        };
      }),
    [materialCategory],
  );
  const handleEdit = (id: number) => {
    router.push(`/office/category/material/create/${id}`);
  };
  const handleDelete = async (id: number) => {
    const { status } = await deleteMaterialCategory(id);
    if (status === 200) {
      refetch();
    }
  };
  const buttonRender = (row: Category) => {
    return (
      <div className="flex items-center justify-center gap-3">
        <button
          className="renderButtonEdit "
          onClick={() => handleEdit(row.id)}
        >
          Edit
        </button>
        <button
          className="renderButtonDelete "
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </button>
      </div>
    );
  };

  const table = (
    <div className="mx-6">
      <AddButton
        title="Material Setup"
        link="/office/category/material/create"
        buttonTitle="Add Material"
      />

      <DataTable
        columns={column}
        data={formattedData}
        action={true}
        renderActionButtons={buttonRender}
      />
    </div>
  );

  return <>{isLoading ? <Loader/> : table}</>;
}
