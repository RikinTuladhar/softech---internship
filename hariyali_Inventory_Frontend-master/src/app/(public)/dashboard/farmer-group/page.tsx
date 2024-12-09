"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  GetFarmerGroup,
  DeleteFarmerGroup,
  GetFarmerGroupByManagerId,
  GetFarmerGroupByProjectId,
} from "@/src/services/apiService/layerSetup/farmerGroup/farmerGroupServices";
import { DataTable } from "@/src/components/DataTable";
import { FarmerGroup } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import AddButton from "@/src/components/reusable/AddButton";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { meAtom } from "@/src/Recoil/atom";
import { useRecoilValue } from "recoil";
const column: ColumnDef<FarmerGroup>[] = [
  { accessorKey: "id", header: "S.N", cell: (info) => info.row.index + 1 },
  { accessorKey: "groupName", header: "Farmer Group Name" },
  { accessorKey: "projectName", header: "Project Name" },
  { accessorKey: "businessManagerName", header: "Business Manager" },
  { accessorKey: "email", header: "Email" },
];
const getFarmerGroup = async () => {
  const { data } = await GetFarmerGroup();
  return data;
};

const FarmerGroupIndex = () => {
  const meValue = useRecoilValue(meAtom);
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["farmerGroup"],
    queryFn: getFarmerGroup,
  });
  const {
    data: apiDataByManagerId,
    isError: isErrorManager,
    isLoading: isLoadingManager,
    refetch: refetchManager,
  } = useQuery({
    queryKey: ["farmerGroupByManagerId", meValue?.id],
    queryFn: () => GetFarmerGroupByManagerId(meValue?.id),
    enabled: !!meValue.id && meValue.role === "businessManager",
  });
  const {
    data: apiDataByProjectId,
    isError: isErrorProject,
    isLoading: isLoadingProject,
    refetch: refetchProject,
  } = useQuery({
    queryKey: ["farmerGroupByProjectId", meValue?.id],
    queryFn: () => GetFarmerGroupByProjectId(meValue?.id),
    enabled: !!meValue.id && meValue.role === "project",
  });

  const handleEdit = (id: string) => {
    router.push(`/dashboard/farmer-group/AddFarmerGroup/${id}`);
  };
  const handleDelete = async (id: string) => {
    try {
      const { status } = await DeleteFarmerGroup(id);
      if (status === 200) {
        meValue.role === "businessManager"
          ? refetchManager()
          : meValue?.role === "project"
            ? refetchProject()
            : refetch();
        toast.success("Farmer Group Deleted Successfully");
      }
    } catch (error) {
      toast.error("Error while deleting Farmer Group");
    }
  };

  const renderButtons = (row: FarmerGroup) => {
    return (
      <div className="renderButtonContainer">
        <button className="renderButtonEdit" onClick={() => handleEdit(row.id)}>
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

  const mainApi =
    meValue.role === "businessManager"
      ? apiDataByManagerId
      : meValue?.role === "project"
        ? apiDataByProjectId
        : apiData;

  const table = (
    <div>
      <AddButton
        title="Farmer Group"
        link="/dashboard/farmer-group/AddFarmerGroup"
        buttonTitle="Add Farmer"
      />
      <DataTable
        data={mainApi}
        columns={column}
        action={true}
        renderActionButtons={renderButtons}
      />
    </div>
  );
  if (isError || isErrorManager || isErrorProject) return <Error />;
  return (
    <>
      {isLoading || isLoadingManager || isLoadingProject ? <Loader /> : table}
    </>
  );
};

export default FarmerGroupIndex;
