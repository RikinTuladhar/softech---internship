"use client";

import React from "react";
import AddButton from "@/src/components/reusable/AddButton";
import {
  deleteVendor,
  getVendor,
} from "@/src/services/apiService/setup/Vendor/VendorServices";
import { Vendor } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/src/components/DataTable";
import Loader from "@/src/components/reusable/Loader";

export const GetVendor = async () => {
  const { data } = await getVendor();
  return data;
};

const column: ColumnDef<Vendor>[] = [
  {
    accessorKey: "id",
    header: "S.N",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "vendorName",
    header: "Vendor Name",
  },
  {
    accessorKey: "contactPersonName",
    header: "Contact Person",
  },
];

export default function VendorIndex() {
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["vendor"],
    queryFn: GetVendor,
  });

  const handleEdit = (id: number) => {
    router.push(`/office/vendor/createVendor/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      const { status } = await deleteVendor(id);
      if (status === 200) {
        refetch();
      }
    } catch (error) {}
  };
  const actions = (row: Vendor) => {
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
    <div className="mx-6">
      <AddButton
        title="Vendor"
        link="/office/vendor/createVendor"
        buttonTitle="Add Vendor"
      />
      <DataTable
        data={apiData}
        columns={column}
        renderActionButtons={actions}
        action={true}
      />
    </div>
  );

  return <div>{isLoading ? <Loader/> : table}</div>;
}
