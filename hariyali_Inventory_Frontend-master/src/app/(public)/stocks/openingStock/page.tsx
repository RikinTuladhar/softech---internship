"use client";
import AddButton from "@/src/components/reusable/AddButton";
import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  getStockList,
  GetProjectOpeningStock,
  GetGroupOpeningStock,
} from "@/src/services/apiService/stock/openingStock/openingStockServices";
import { DataTable } from "@/src/components/DataTable";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import { StockList } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { meAtom } from "@/src/Recoil/atom";
import { useRecoilValue } from "recoil";
const column: ColumnDef<StockList>[] = [
  { accessorKey: "id", header: "S.N", cell: (info) => info.row.index + 1 },
  { accessorKey: "typeName", header: "Material Type" },
  { accessorKey: "categoryName", header: "Material Category" },
  { accessorKey: "subCategoryName", header: "Material SubCategory" },
  { accessorKey: "itemName", header: "Item" },
  { accessorKey: "quantity", header: "Initial Stock" },
  { accessorKey: "remaining", header: "Remaining Stock" },
];

const openingStock = () => {
  const router = useRouter();
  const meValue = useRecoilValue(meAtom);

  const {
    data: apiData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["openingStock"],
    queryFn: getStockList,
    enabled: meValue?.role == "admin" || meValue?.role == "administator",
  });
  const {
    data: apiDataProject,
    isLoading: projectLoading,
    isError: projectError,
  } = useQuery({
    queryKey: ["openingStock"],
    queryFn: GetProjectOpeningStock,
    enabled: meValue?.role == "project",
  });
  const {
    data: apiDataGroup,
    isLoading: groupLoading,
    isError: groupError,
  } = useQuery({
    queryKey: ["openingStock"],
    queryFn: GetGroupOpeningStock,
    enabled: meValue?.role == "farmerGroup",
  });

  const handleEdit = (id: number) => {
    router.push(`/stocks/openingStock/create/${id}`);
  };
  const handleDelete = async () => {};

  const renderButtons = (row: StockList) => {
    return (
      <div className="renderButtonContainer">
        <button className="renderButtonEdit">Edit</button>
        <button className="renderButtonDelete">Delete</button>
      </div>
    );
  };
  const data =
    meValue?.role === "admin" || meValue?.role === "administator"
      ? apiData
      : meValue?.role === "project"
        ? apiDataProject
        : meValue?.role === "farmerGroup"
          ? apiDataGroup
          : [];
  const table = (
    <div className="mx-6">
      {meValue?.role === "project" && (
        <AddButton
          title="Project Opening Stock"
          link=""
          buttonTitle="Request Stock"
        />
      )}
      {meValue?.role === "farmerGroup" && (
        <AddButton
          title="Group Opening Stock"
          link="/request/createRequest"
          buttonTitle="Request Stock"
        />
      )}
      {(meValue?.role === "admin" || meValue?.role === "administator") && (
        <AddButton
          title="Opening Stock"
          link=""
          buttonTitle="Opening Stock"
        />
      )}
      <DataTable
        columns={column}
        data={data}
        action={false}
        renderActionButtons={renderButtons}
      />
    </div>
  );

  if (isError || projectError || groupError) return <Error />;

  return (
    <>{isLoading || projectLoading || groupLoading ? <Loader /> : table}</>
  );
};

export default openingStock;
