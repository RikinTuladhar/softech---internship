"use client";
import AddButton from "@/src/components/reusable/AddButton";
import {
  deleteBank,
  getBank,
} from "@/src/services/apiService/setup/Bank/BankServices";
import { Bank } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/src/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
const column: ColumnDef<Bank>[] = [
  {
    accessorKey: "id",
    header: "S.N",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "bankName",
    header: "Bank Name",
  },
];

export const GetBank = async () => {
  const { data } = await getBank();
  return data;
};

export default function BankIndex() {
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bank"],
    queryFn: GetBank,
  });
  const handleEdit = (id: number) => {
    router.push(`/office/bank/createBank/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      const { status } = await deleteBank(id);
      if (status === 200) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderButtons = (row: Bank) => {
    return (
      <div className="flex items-center  justify-center gap-3 text-white ">
        <button
          className="bg-green-600 shadow-md hover:bg-green-700 rounded px-6 py-2 "
          onClick={() => handleEdit(row.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-600 shadow-md hover:bg-red-700 rounded px-6 py-2 "
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
        title="Bank Setup"
        link="/office/bank/createBank"
        buttonTitle="Add Bank"
      />
      <DataTable
        data={apiData}
        columns={column}
        renderActionButtons={renderButtons}
        action={true}
      />
    </div>
  );
  if(isError) return <Error/>
  return <>{isLoading ? <Loader/> : table}</>;
}
