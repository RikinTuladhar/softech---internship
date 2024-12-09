"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import AddButton from "@/src/components/reusable/AddButton";
import { DataTable } from "@/src/components/DataTable";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import { GetIncommingRequestForCompany } from "@/src/services/apiService/request/requestServices";
import { RequestForCompany } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
const column: ColumnDef<RequestForCompany>[] = [
  { accessorKey: "id", header: "S.N", cell: (info) => info.row.index + 1 },
  { accessorKey: "companyName", header: "Company" },
  { accessorKey: "projectName", header: "Project" },
  { accessorKey: "requestedItemNumber", header: "Requested Item" },
  { accessorKey: "requestDate", header: "Request Date" },
  {
    accessorKey: "isApproved",
    header: "Status ",
    cell: (info) =>
      info.row.getValue("isApproved") ? (
        <div className="bg-green-600 font-bold text-white roundedlg">
          Approved
        </div>
      ) : (
        <div className="bg-red-600 font-bold text-white roundedlg">
          Not Approved
        </div>
      ),
  },
  {
    accessorKey: "isPartial",
    header: "FullFill Status",
    cell: (info) =>
     !info.row.getValue("isPartial") ? (
        <div className="bg-green-600 font-bold text-white roundedlg">
          Completely
        </div>
      ) : (
        <div className="bg-red-600 font-bold text-white roundedlg">
          Partially
        </div>
      ),
  },
];
export default function IncommingRequest() {
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["incomingRequestForCompany"],
    queryFn: GetIncommingRequestForCompany,
  });

  const renderButtons = (row: RequestForCompany) => {
    return (
      <div>
        <button
          className="renderButtonView"
          onClick={() => router.push(`/request/company/items/${row.id}`)}
        >
          View Items
        </button>
      </div>
    );
  };

  if (isError) return <Error />;

  if (isLoading) return <Loader />;
  const table = (
    <>
      <div>
        <h1 className="text-xl font-bold my-3 mx-2">
          Stock Request By Projects
        </h1>
      </div>
      <DataTable
        columns={column}
        data={apiData}
        action={true}
        renderActionButtons={renderButtons}
      />
    </>
  );
  return <div>{isFetched && table}</div>;
}
