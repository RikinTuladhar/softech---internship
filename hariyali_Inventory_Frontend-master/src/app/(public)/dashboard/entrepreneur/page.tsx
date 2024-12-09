"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  GetBusinessManager,
  DeleteBusinessManager,
  GetBusinessManagerByProjectId,
} from "@/src/services/apiService/layerSetup/businessManager/businessManagerServices";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import AddButton from "@/src/components/reusable/AddButton";
import { DataTable } from "@/src/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { BusinessManager } from "@/types/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { meAtom } from "@/src/Recoil/atom";
import { useRecoilValue } from "recoil";
const getBusinessManager = async () => {
  const { data } = await GetBusinessManager();
  return data;
};

const column: ColumnDef<BusinessManager>[] = [
  { accessorKey: "id", header: "S.N", cell: (info) => info.row.index + 1 },
  { accessorKey: "businessManagerName", header: "Business Manager Name" },
  { accessorKey: "projectName", header: "Project Name" },
  { accessorKey: "contactNo", header: "Contact Number" },
];

const BusinessManagerIndex = () => {
  const meValue = useRecoilValue(meAtom);
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["businessManager"],
    queryFn: getBusinessManager,
    enabled: meValue?.role === "admin" || meValue?.role === "administator",
  });
  const {
    data: apiDataByProjectId,
    isError: isErrorByProject,
    isLoading: isLoadingByProject,
    refetch: refetchByProject,
  } = useQuery({
    queryKey: ["businessManagerByProject", meValue?.id],
    queryFn: () => GetBusinessManagerByProjectId(meValue?.id),
    enabled: !!meValue?.id && meValue?.role === "project",
  });

  const handleEdit = (id: string) => {
    router.push(`/dashboard/entrepreneur/AddEntrepreneurForm/${id}`);
  };
  const handleDelete = async (id: string) => {
    try {
      const { status } = await DeleteBusinessManager(id);
      if (status === 200) {

        meValue?.role === "project" ? refetchByProject() : refetch();
        toast.success("Business Manager deleted Successfully");
      }
    } catch (error) {
      toast.error("Error while deleting Business Manager");
    }
  };

  const renderButtons = (row: BusinessManager) => {
    return (
      <div className={"flex gap-6 items-center justify-center"}>
        <button
          className={"renderButtonEdit"}
          onClick={() => handleEdit(row.id)}
        >
          Edit
        </button>
        <button
          className={"renderButtonDelete"}
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </button>
      </div>
    );
  };

  const mainData = meValue?.role === "project" ? apiDataByProjectId : apiData;

  const table = (
    <div>
      <AddButton
        link={"/dashboard/entrepreneur/AddEntrepreneurForm"}
        title={"Business Manager"}
        buttonTitle={"Create Manager"}
      />
      <DataTable
        columns={column}
        data={mainData}
        action={true}
        renderActionButtons={renderButtons}
      />
    </div>
  );
  if (isError || isErrorByProject) return <Error />;
  return (
    <>{isLoading || isLoadingByProject ? <Loader /> : <div>{table}</div>}</>
  );
};

export default BusinessManagerIndex;
