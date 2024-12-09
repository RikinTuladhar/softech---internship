"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GetCompanyDepartmentById } from "@/src/services/apiService/setup/Office/OfficeServices";
import CreateDepartmentComp from "../CreateDepartmentComp";
import Error from "@/src/components/reusable/Error";
import Loader from "@/src/components/reusable/Loader";
function EditCompanyDepartment() {
  const { departmentId }: { departmentId: string } = useParams();
  const {
    data: apiData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["companyDepartmentById", departmentId],
    queryFn: () => GetCompanyDepartmentById(parseInt(departmentId)),
    enabled: !!departmentId,
  });

  if (isError) return <Error />;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <CreateDepartmentComp clickedIdData={apiData} />
      )}
    </div>
  );
}

export default EditCompanyDepartment;
