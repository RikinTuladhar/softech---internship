"use client";
import React from "react";
import AddButton from "@/src/components/reusable/AddButton";
import { useQuery } from "@tanstack/react-query";
import {
  deleteItem,
  getAllItems,
} from "@/src/services/apiService/setup/Item/ItemServices";
import { ColumnDef } from "@tanstack/react-table";
import { Item } from "@/types/types";
import { DataTable } from "@/src/components/DataTable";
import { useRouter } from "next/navigation";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
const column: ColumnDef<Item>[] = [
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
    accessorKey: "materialCategoryName",
    header: "Category",
  },
  {
    accessorKey: "materialSubCategoryName",
    header: "Sub Category",
  },
  {
    accessorKey: "name",
    header: "Item",
  },
  {
    accessorKey: "unitName",
    header: "Unit",
  },
];

const GetAllItems = async () => {
  try {
    const { data } = await getAllItems();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default function ItemIndex() {
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allItems"],
    queryFn: GetAllItems,
  });

  const formattedData = apiData?.map((item: Item) => {
    return {
      ...item,
      materialTypeName: item.materialType.name,
      materialCategoryName: item.materialCategory.name,
      materialSubCategoryName: item.materialSubCategory.name,
      unitName: item.unit.symbol,
    };
  });

  const handleEdit = (id: number) => {
    router.push(`/office/category/content/create/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const { status } = await deleteItem(id);
      if (status === 200) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderButtons = (row: Item) => {
    return (
      <div className="flex items-center  justify-center gap-3 text-white">
        <button
          className="bg-green-600 rounded px-6 py-2 shadow-md"
          onClick={() => handleEdit(row.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-600 px-6 rounded py-2 shadow-md"
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </button>
      </div>
    );
  };

  if(isError) return <Error/>

  const table = (
    <div className="mx-6 ">
      <AddButton
        title="Item Setup"
        link="/office/category/content/create"
        buttonTitle="Add Item"
      />

      <DataTable
        data={formattedData}
        columns={column}
        action={true}
        renderActionButtons={renderButtons}
      />
    </div>
  );
  return <>{isLoading ? <Loader/> : table}</>;
}
