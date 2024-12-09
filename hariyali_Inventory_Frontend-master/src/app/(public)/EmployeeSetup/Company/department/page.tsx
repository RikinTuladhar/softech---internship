"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import AddButton from "@/src/components/reusable/AddButton";
import { DataTable } from "@/src/components/DataTable";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import {
  GetCompanyDepartment,
  DeleteCompanyDepartment,
} from "@/src/services/apiService/setup/Office/OfficeServices";
import { ColumnDef } from "@tanstack/react-table";
import { CompanyDepartmentType } from "@/types/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const column: ColumnDef<CompanyDepartmentType>[] = [
  {
    accessorKey: "departmentId",
    header: "S.N",
    cell: (info) => info.row.index + 1,
  },
  { accessorKey: "companyName", header: "Company" },
  { accessorKey: "departmentName", header: "Department Name" },
];
function DepartmentList() {
  const router = useRouter();
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["companyDepartment"],
    queryFn: GetCompanyDepartment,
  });

  const EditHandler = (id: number) => {
    router.push(`/EmployeeSetup/Company/department/createDepartment/${id}`);
  };

  const deleteHandler = async (id: number) => {
    try {
      const { status, message } = await DeleteCompanyDepartment(id);
      if (status === 200) {
        toast.success(message);
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const renderButton = (row: CompanyDepartmentType) => {
    return (
      <div key={row.departmentId} className="renderButtonContainer">
        <button
          className="renderButtonEdit"
          onClick={() => EditHandler(row.departmentId)}
        >
          Edit
        </button>
        <button
          className="renderButtonDelete"
          onClick={() => deleteHandler(row.departmentId)}
        >
          Delete
        </button>
      </div>
    );
  };

  if (isError) return <Error />;

  const mainTable = (
    <div>
      <AddButton
        title="Department"
        buttonTitle="Create Department"
        link="/EmployeeSetup/Company/department/createDepartment"
      />

      <DataTable
        data={data}
        columns={column}
        action={true}
        renderActionButtons={renderButton}
      />
    </div>
  );
  return <div> {isLoading ? <Loader /> : mainTable}</div>;
}

export default DepartmentList;
