"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/src/components/DataTable";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import { GetProjectIncommingRequest , GetGroupIdByRequestId } from "@/src/services/apiService/request/requestServices";
import { Request } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import AddButton from "@/src/components/reusable/AddButton";
import { useRouter } from "next/navigation";
const column: ColumnDef<Request>[] = [
  { accessorKey: "id", header: "S.N", cell: (info) => info.row.index + 1 },
  { accessorKey: "projectName", header: "Project Name" },
  { accessorKey: "groupName", header: "Group Name" },
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
  } = useQuery({
    queryKey: ["projectIncommingRequest"],
    queryFn: GetProjectIncommingRequest,
  });

 

  if (isError) return <Error />;

  const renderButtons = (row: Request) => {
    return (
      <div>
        <button
          className="renderButtonView"
          onClick={() => router.push(`/projectRequest/inCommingRequest/requestItem/${row.id}`)}
        >
          View Items
        </button>
      </div>
    );
  };

  const table = (
    <div>
     <div className="">
        <h1 className="text-xl font-bold my-5 mx-2">
            Incomming Request List
        </h1>
     </div>
      <DataTable
        data={apiData}
        columns={column}
        renderActionButtons={renderButtons}
        action={true}
      />
    </div>
  );
  return <div>{isLoading ? <Loader /> : table }</div>;
}
