"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/src/components/DataTable";
import AddButton from "@/src/components/reusable/AddButton";
import { useQuery } from "@tanstack/react-query";
import {
  GetHariyaliProject,
  DeleteHariyaliProject,
} from "@/src/services/apiService/layerSetup/project/projectServices";
import { HariyaliProject } from "@/types/types";
import { useRouter } from "next/navigation";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import { meAtom } from "@/src/Recoil/atom";
import { useRecoilValue } from "recoil";

const column: ColumnDef<HariyaliProject>[] = [
  { accessorKey: "id", header: "S.N", cell: (info) => info.row.index + 1 },
  { accessorKey: "name", header: "Project Name" },
  { accessorKey: "chiefName", header: "Chief Name" },
  { accessorKey: "email", header: "Email" },
];
const getHariyaliProject = async () => {
  const { data } = await GetHariyaliProject();
  return data;
};
const ProjectPageIndex = () => {
  const meValue = useRecoilValue(meAtom);
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["HariyaliProject"],
    queryFn: getHariyaliProject,
  });
  

  const handleEdit = (id: string) => {
    router.push(`/dashboard/merchant/AddMerchantForm/${id}`);
  };
  const handleDelete = async (id: string) => {
    try {
      const { status } = await DeleteHariyaliProject(id);
      if (status === 200) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderActions = (row: HariyaliProject) => {
    return (
      <div className={"flex items-center justify-center gap-3"}>
        {meValue?.role === "admin" || meValue?.role === "administator" && (
          <button className={"renderButtonEdit"} onClick={() => handleEdit(row.id)}>
            {"Edit"}
          </button>
        )}
        {meValue?.role === "admin" || meValue?.role === "administator" && (
          <button
            className={"renderButtonDelete"}
            onClick={() => handleDelete(row.id)}
          >
            {"Delete"}
          </button>
        )}
      </div>
    );
  };

  const table = (
    <div>
      <AddButton
        link={"/dashboard/merchant/AddMerchantForm"}
        title={"Hariyali Project"}
        buttonTitle={"Create Project"}
      />
      <DataTable
        columns={column}
        data={apiData}
        action={true}
        renderActionButtons={renderActions}
      />
    </div>
  );

  if (isError) return <Error />;

  return <>{isLoading ? <Loader /> : table}</>;
};

export default ProjectPageIndex;
