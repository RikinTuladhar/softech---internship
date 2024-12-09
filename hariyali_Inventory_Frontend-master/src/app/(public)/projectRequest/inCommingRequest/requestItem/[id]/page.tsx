"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Error from "@/src/components/reusable/Error";
import Loader from "@/src/components/reusable/Loader";
import { GetRequestedItemByRequestId } from "@/src/services/apiService/request/requestServices";
import { RequestItem } from "@/types/types";
import { DataTable } from "@/src/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { isFullFilled } from "@/src/Helper/helper";
const column: ColumnDef<RequestItem>[] = [
  { accessorKey: "id", header: "S.N", cell: (info) => info.row.index + 1 },
  { accessorKey: "typeName", header: "Material Type" },
  { accessorKey: "categoryName", header: "Category " },
  { accessorKey: "subCategoryName", header: "Sub Category" },
  { accessorKey: "itemName", header: "Item" },
  { accessorKey: "quantity", header: "Quantity" },
];

function RequestedItemListForProject() {
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const {
    data: itemByRequestId,
    isError: itemError,
    isLoading: itemLoading,
  } = useQuery({
    queryKey: ["requestItemByRequestId", id],
    queryFn: () => GetRequestedItemByRequestId(parseInt(id)),
    enabled: !!id,
  });
  const handleApproveRoute = () => {
    router.push(
      `/projectRequest/inCommingRequest/approveInCommingRequest/${id}`
    );
  };
  const isDemandFullFilled = isFullFilled(itemLoading ? [] : itemByRequestId);
  const table = (
    <div className="mx-10">
      <div>
        <h1 className="text-2xl font-bold mx-4 my-10">Items Requested</h1>
      </div>
      <div className="">
        <div>
          <DataTable data={itemByRequestId} columns={column} />
        </div>
      </div>{" "}
      <div className="flex gap-6">
        <button
          className="cancelButton"
          onClick={() => router.push("..")}
          type="button"
        >
          Back
        </button>
        {isDemandFullFilled ? (
          <button className="submitButton" type="button" disabled={true}>
            Approved & Demand FullFilled
          </button>
        ) : (
          <button
            className="submitButton"
            type="button"
            onClick={() => handleApproveRoute()}
          >
            Approve
          </button>
        )}
      </div>
    </div>
  );
  if (itemError) return <Error />;
  return <>{itemLoading ? <Loader /> : table}</>;
}

export default RequestedItemListForProject;
