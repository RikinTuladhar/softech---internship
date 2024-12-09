"use client";
import React from "react";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import { DataTable } from "@/src/components/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { GetGivenItemsByProject } from "@/src/services/apiService/request/requestServices";
import { ItemsGivenToGroupType } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
const column: ColumnDef<ItemsGivenToGroupType>[] = [
  {accessorKey:"id",header:"S.N",cell:(info)=>info.row.index + 1},
  {accessorKey:"typeName",header:"Type"},
  {accessorKey:"categoryName",header:"Category"},
  {accessorKey:"subCategoryName",header:"Sub Category"},
  {accessorKey:"itemName",header:"Item"},
  {accessorKey:'rateWithProfit',header:'Rate'},
  {accessorKey:'quantity',header:'Quantity'},
  {accessorKey:'finalPrice',header:'Price'},
];
export default function GivenItemToGroupList() {
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["itemsGivenByProject", id],
    queryFn: () => GetGivenItemsByProject(parseInt(id)),
    enabled: !!id,
  });
  if(isError) return <Error/>

  const table = (
    <div className="mx-10">
      <div>
        <h1 className="text-2xl font-bold mx-4 my-10">Items Requested</h1>
      </div>
      <div className="">
        <div>
          <DataTable data={apiData} columns={column} />
        </div>
      </div>{" "}
      <div>
        <button
          className="cancelButton"
          onClick={() => router.push("..")}
          type="button"
        >
          Back
        </button>
      </div>
    </div>
  );
  return <>{isLoading ? <Loader /> : table}</>;
}
