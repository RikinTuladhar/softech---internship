"use client";
import React from "react";
import AddButton from "@/src/components/reusable/AddButton";
import {
  DeleteSubCategory,
  GetSubCategory,
} from "@/src/services/apiService/setup/MaterialSubCategory/materialSubCategoryServices";
import { SubCategory } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/src/components/DataTable";
import { useRouter } from "next/navigation";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
const GetMaterialSubCategory = async () => {
  const { data } = await GetSubCategory();
  return data;
};

const columns: ColumnDef<SubCategory>[] = [
  {
    accessorKey: "id",
    header: "S.N",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "materialCategoryName",
    header: "Material Category",
  },
  {
    accessorKey: "name",
    header: "Material Sub Category",
  },
];

function SubCategoryIndex() {
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["subcategory"],
    queryFn: GetMaterialSubCategory,
  });

  const formattedData = React.useMemo(
    () =>
      apiData?.map((item: SubCategory) => {
        return {
          ...item,
          materialCategoryName: item.materialCategory.name,
        };
      }),
    [apiData],
  );

  const handleEdit = (id: number) => {
    router.push(`/office/category/subCategory/createSubCategory/${id}`);
  };

  const handleDelete = async (id: number) => {
    const { status } = await DeleteSubCategory(id);
    if (status === 200) {
      refetch();
    }
  };

  const renderButton = (row: SubCategory) => {
    return (
      <div className="flex items-center justify-center gap-3 text-white">
        <button
          className="renderButtonEdit"
          onClick={() => handleEdit(row.id)}
        >
          Edit
        </button>
        <button
          className="renderButtonDelete"
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
        link="/office/category/subCategory/createSubCategory"
        title="Sub Category Setup"
        buttonTitle="Add Sub Category"
      />
      <DataTable
        data={formattedData}
        columns={columns}
        action={true}
        renderActionButtons={renderButton}
      />
    </div>
  );
  if(isError) return <Error/>
  return <>{isLoading ? <Loader/> : table}</>;
}

export default SubCategoryIndex;
