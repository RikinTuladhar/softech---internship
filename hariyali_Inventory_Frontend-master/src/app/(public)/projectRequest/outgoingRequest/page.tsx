"use client";
import React from "react";
import AddButton from "@/src/components/reusable/AddButton";
import { DataTable } from "@/src/components/DataTable";
import { GetRequestDoneByProject } from "@/src/services/apiService/request/requestServices";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import { useRouter } from "next/navigation";
import { meAtom } from "@/src/Recoil/atom";
import { useRecoilValue } from "recoil";
import { ColumnDef } from "@tanstack/react-table";
import { Request } from "@/types/types";

const column: ColumnDef<Request>[] = [
  { accessorKey: "id", header: "S.N", cell: (info) => info.row.index + 1 },
  { accessorKey: "projectName", header: "Project Name" },
  { accessorKey: "requestedItemNumber", header: "Requested Item" },
  { accessorKey: "requestDate", header: "Request Date" },
  {
    accessorKey: "isApproved",
    header: "Status ",
    cell: (info) =>
      info.row.getValue("isApproved") ? (
        <div className="bg-green-600 font-bold text-white roundedlg">Approved</div>
      ) : (
        <div className="bg-red-600 font-bold text-white roundedlg">
          Not Approved
        </div>
      ),
  },
];

function RequestForm() {
  const meValue = useRecoilValue(meAtom);
  const router = useRouter();
  const {
    data: apiData,
    isError: projectError,
    isLoading: projectLoading,
  } = useQuery({
    queryKey: ["requestListByFarmerGroup"],
    queryFn: GetRequestDoneByProject,
    enabled: meValue?.role === "project",
  });

  const renderButtons = (row: Request) => {
    return (
      <div>
        <button
          className="renderButtonView"
          onClick={() => router.push(`/projectRequest/outgoingRequest/items/${row.id}`)}
        >
          View Items
        </button>
      </div>
    );
  };

  if (projectError) return <Error />;

  const table = (
    <div>
      <AddButton
        title="Request List"
        link="/projectRequest/outgoingRequest/createRequest"
        buttonTitle="Add Request"
      />
      <DataTable
        data={apiData}
        columns={column}
        renderActionButtons={renderButtons}
        action={true}
      />
    </div>
  );
  return <>{projectLoading ? <Loader /> : table}</>;
}

export default RequestForm;