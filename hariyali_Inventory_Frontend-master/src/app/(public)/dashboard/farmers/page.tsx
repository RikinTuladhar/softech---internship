"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/src/components/DataTable";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import { Farmer } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import {
  GetFarmer,
  GetFarmerAccordingToGroup,
  GetFarmerByManager,
  GetFarmerByProject,
  deleteFarmer,
} from "@/src/services/apiService/layerSetup/farmer/farmerServices";
import { meAtom } from "@/src/Recoil/atom";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import AddButton from "@/src/components/reusable/AddButton";
const columns: ColumnDef<Farmer>[] = [
  { accessorKey: "id", header: "S.N", cell: (info) => info.row.index + 1 },
  { accessorKey: "projectName", header: "Project Name" },
  { accessorKey: "managerName", header: "Business Manager Name" },
  { accessorKey: "groupName", header: "Group Name" },
  { accessorKey: "farmarName", header: "Farmer Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "contactNumber", header: "Contact Number" },
];

const getFarmer = async () => {
  const { data } = await GetFarmer();
  return data;
};

const FarmerIndex = () => {
  const meValue = useRecoilValue(meAtom);
  const router = useRouter();
  const {
    data: apiData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["farmer"],
    queryFn: getFarmer,
  });

  const {
    data: apiDataByGroup,
    isError: isErrorByGroup,
    isLoading: isLoadingByGroup,
  } = useQuery({
    queryKey: ["farmerByGroup"],
    queryFn: GetFarmerAccordingToGroup,
    enabled: meValue?.role === "farmerGroup",
  });
  const {
    data: apiDataByManager,
    isError: isErrorByManager,
    isLoading: isLoadingByManager,
  } = useQuery({
    queryKey: ["farmerByManager"],
    queryFn: () => GetFarmerByManager(meValue?.id),
    enabled: !!meValue?.id && meValue?.role === "businessManager",
  });
  const {
    data: apiDataByProject,
    isError: isErrorByProject,
    isLoading: isLoadingByProject,
  } = useQuery({
    queryKey: ["farmerByProject"],
    queryFn: () => GetFarmerByProject(meValue?.id),
    enabled: !!meValue?.id && meValue?.role === "project",
  });
  const handleEdit = (id: string) => {
    router.push(`/dashboard/farmers/AddFarmersForm/${id}`);
  };

  const mainData =
    meValue?.role === "farmerGroup"
      ? apiDataByGroup
      : meValue?.role === "businessManager"
        ? apiDataByManager
        : meValue?.role === "project"
          ? apiDataByProject
          : apiData;

  const renderButtons = (row: Farmer) => {
    return (
      <div className="renderButtonContainer">
        <div>
          <button
            className="renderButtonEdit"
            onClick={() => handleEdit(row.id)}
          >
            Edit
          </button>
        </div>
        <div>
          <button className="renderButtonDelete">Delete</button>
        </div>
      </div>
    );
  };

  const table = (
    <div>
      <AddButton
        title="Farmer"
        link="/dashboard/farmers/AddFarmersForm"
        buttonTitle="Add Farmers"
      />
      <DataTable
        columns={columns}
        data={mainData}
        action={true}
        renderActionButtons={renderButtons}
      />
    </div>
  );
  if (isError || isErrorByGroup || isErrorByManager || isErrorByProject)
    return <Error />;
  return (
    <>
      {isLoading ||
      isLoadingByGroup ||
      isLoadingByManager ||
      isLoadingByProject ? (
        <Loader />
      ) : (
        table
      )}
    </>
  );
};

export default FarmerIndex;
