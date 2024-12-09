"use client";
import React from "react";
import AddButton from "@/src/components/reusable/AddButton";
import {
  getFiscalYear,
  updateFiscalYearActiveStatus,
} from "@/src/services/apiService/setup/fiscalyear/fiscalyear";
import { FiscalYear } from "@/types/types";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import { DataTable } from "@/src/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import Switch from "@mui/material/Switch";
const label = { inputProps: { "aria-label": "Switch demo" } };
import { useRouter } from "next/navigation";
export default function FiscalYearIndex() {
  const router = useRouter();
  const {
    data: apiData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["fiscalYear"],
    queryFn: getFiscalYear,
    // refetchInterval:10000
  });

  const handleUpdate = async (id: number) => {
    const response = await updateFiscalYearActiveStatus(id);
    if (response?.status === 200) {
      refetch();
    }
  };

  const column: ColumnDef<FiscalYear>[] = [
    {
      accessorKey: "id",
      header: "S.N",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "fiscalYearName",
      header: "Fiscal Year",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        return (
          <div>
            <p>
              {info.row.getValue("status") ? (
                <p className="text-green-600 font-bold">Active</p>
              ) : (
                <p className="text-red-600 font-bold">Deactive</p>
              )}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const value = info.row.getValue("status");
        const id: number = info.row.getValue("id");

        return (
          <div>
            <Switch
              {...label}
              checked={value ? true : false}
              onClick={() => handleUpdate(id)}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: (info) => {

        const id: number = info.row.getValue("id");

        return (
          <div>
            <button type="button" className="renderButtonEdit" onClick={()=>handleEditRoute(id)} >Edit</button>
          </div>
        );
      },
    },
  ];
  const handleEditRoute = (id:number)=>{
    router.push(`/office/fiscal/createFiscalYear/${id}`)
  }
  if (isError) return <Error />;
  const table = (
    <div>
      <AddButton
        title="Fiscal Year"
        link="/office/fiscal/createFiscalYear"
        buttonTitle="Add Fiscal Year"
      />
      <DataTable columns={column} data={apiData} />
    </div>
  );
  return <>{isLoading ? <Loader /> : table}</>;
}
