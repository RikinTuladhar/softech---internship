"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import { DataTable } from "@/src/components/DataTable";
import { GetRequestedItemByProject } from "@/src/services/apiService/request/requestServices";
import { isFullFilled } from "@/src/Helper/helper";
import { ColumnDef } from "@tanstack/react-table";
import { RequestItem } from "@/types/types";
import { useRouter } from "next/navigation";
const column: ColumnDef<RequestItem>[] = [
  { accessorKey: "id", header: "S.N", cell: (info) => info.row.index + 1 },
  { accessorKey: "typeName", header: "Material Type" },
  { accessorKey: "categoryName", header: "Category " },
  { accessorKey: "subCategoryName", header: "Sub Category" },
  { accessorKey: "itemName", header: "Item" },
  { accessorKey: "quantity", header: "Quantity" },
];
export default function RequestedItemForCompany() {
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["requestedItemForCompany", id],
    queryFn: () => GetRequestedItemByProject(parseInt(id)),
    enabled: !!id,
  });
  if (isError) return <Error />;

  const isDemandFullFilled = isFullFilled(isLoading ? [] : apiData);

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
      <div className="flex gap-5">
        <button
          className="cancelButton"
          onClick={() => router.push("/request/company/incomming")}
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
            onClick={() =>
              router.push(`/request/company/items/approveRequest/${id}`)
            }
          >
            Approve
          </button>
        )}
      </div>
    </div>
  );

  return <div>{isLoading ? <Loader /> : table}</div>;
}
