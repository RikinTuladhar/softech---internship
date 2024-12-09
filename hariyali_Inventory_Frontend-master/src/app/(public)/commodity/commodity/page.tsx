import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/src/components/DataTable";
import PageTitle from "@/src/components/ui/PageTitle";
import Button from "@/src/components/buttons/button";

type Props = {};

type Entrepreneur = {
  sno: number;
  type: string;
  name: string;
  date: string;
};

const columns: ColumnDef<Entrepreneur>[] = [
  {
    accessorKey: "sno",
    header: "S. No",
  },

  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

const data: Entrepreneur[] = [
  // Add more merchant data objects as needed
];

const Commodity: React.FC<Props> = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center justify-between">
        <PageTitle title="Commodity" />
        <Button
          urlName={"/commodity/commodity/createCommodity"}
          buttonName={"Add Commodity"}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-5 w-full">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Commodity;
