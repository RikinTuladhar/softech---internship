"use client";
import React from "react";
import Error from "@/src/components/reusable/Error";
import Loader from "@/src/components/reusable/Loader";
import AddButton from "@/src/components/reusable/AddButton";
import { useQuery } from "@tanstack/react-query";
import { GetGivenStockToFarmer } from "@/src/services/apiService/request/requestServices";
import { ColumnDef } from "@tanstack/react-table";
import { GivenToFarmerType } from "@/types/types";
import { DataTable } from "@/src/components/DataTable";
import { useRouter } from "next/navigation";
export default function GivenToFarmerIndex() {
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["givenToFarmer"],
    queryFn: GetGivenStockToFarmer,
  });

 

  if (isError) return <Error />;
  const column: ColumnDef<GivenToFarmerType>[] = [
    { accessorKey: "id", header: "S.N", cell: (info) => info.row.index + 1 },
    { accessorKey: "groupName", header: "Farmer Group" },
    { accessorKey: "farmerName", header: "Farmer Name" },
    { accessorKey: "itemNumber", header: "No. of Items" },
    {
      accessorKey: "paymentMethod", // You can use any key name here
      header: "Payment Status",
      cell: (info) => {
        const isCash = info.row.getValue("paymentMethod") === "isCash";
        const isCredit = info.row.getValue("paymentMethod") === "isCredit";
        const isBoth = info.row.getValue("paymentMethod") === "isBoth";

        if (isCash) {
          return (
            <div className="bg-green-600 roundedlg text-white font-bold">
              Cash
            </div>
          );
        } else if (isCredit) {
          return (
            <div>
              <h1 className="bg-red-600 roundedlg text-white font-bold">
                Credit
              </h1>
            </div>
          );
        } else if (isBoth) {
          return (
            <div>
              <h1 className="bg-indigo-600 roundedlg font-bold text-white">
                Both Cash and Credit
              </h1>
            </div>
          );
        } else {
          return <></>;
        }
      },
    },
    {
      accessorKey: "creditAmount",
      header: "Due Amount",
      cell: (info) => {
        const creditAmount: number = info.row.getValue("creditAmount");
        if (creditAmount > 0) {
          return (
            <div className="bg-red-400 text-white roundedlg">
              {creditAmount}
            </div>
          );
        } else {
          return <div>0</div>;
        }
      },
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: (info) => {
        const id = info.row.getValue("id");
        return (
          <div>
            <button
              onClick={() =>
                router.push(`/inventory/givenToFarmer/items/${id}`)
              }
              className="bg-blue-600 rounded text-white px-4 py-2 shadow-md"
            >
              View Item
            </button>
          </div>
        );
      },
    },
  ];

  const table = (
    <>
      <AddButton title="Given To Farmer" buttonTitle="Give Item" link="/inventory/givenToFarmer/create" />
      <DataTable columns={column} data={apiData} />
    </>
  );
  return <div>{isLoading ? <Loader /> : table}</div>;
}
