"use client";
import React from "react";
import AddButton from "@/src/components/reusable/AddButton";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import { DataTable } from "@/src/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  GetCompanyPost,
  DeleteCompanyPost,
} from "@/src/services/apiService/setup/Office/OfficeServices";
import { CompanyPostType } from "@/types/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const column: ColumnDef<CompanyPostType>[] = [
  { accessorKey: "postId", header: "S.N", cell: (info) => info.row.index + 1 },
  { accessorKey: "companyName", header: "Company" },
  { accessorKey: "departmentName", header: "Department" },
  { accessorKey: "postName", header: "Post" },
];

function PostList() {
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["companyPost"],
    queryFn: GetCompanyPost,
  });

  if (isError) return <Error />;

  const handleEdit = (id: number) => {
    router.push(`/EmployeeSetup/Company/post/createPost/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      const { status, message } = await DeleteCompanyPost(id);
      if (status === 200) {
        toast.success(message);
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const renderButtons = (row: CompanyPostType) => {
    return (
      <div className="renderButtonContainer">
        <button
          className="renderButtonEdit"
          onClick={() => handleEdit(row.postId)}
        >
          Edit
        </button>
        <button
          className="renderButtonDelete"
          onClick={() => handleDelete(row.postId)}
        >
          Delete
        </button>
      </div>
    );
  };

  const mainTable = (
    <div>
      <AddButton
        title="Post"
        buttonTitle="Create Post"
        link="/EmployeeSetup/Company/post/createPost"
      />
      <DataTable
        columns={column}
        data={apiData}
        renderActionButtons={renderButtons}
        action={true}
      />
    </div>
  );
  return <div>{isLoading ? <Loader /> : mainTable}</div>;
}

export default PostList;
