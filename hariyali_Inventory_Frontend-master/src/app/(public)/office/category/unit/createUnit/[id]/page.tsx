"use client";
import React from "react";
import { useParams } from "next/navigation";
import CreateUnits from "../CreateUnit";
import { useQuery } from "@tanstack/react-query";
import { getUnitById } from "@/src/services/apiService/setup/unit/unitServices";

const GetUnitById = async (id: number) => {
  try {
    const { data } = await getUnitById(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

function EditUnit() {
  const { id }: { id: string } = useParams();

  const {
    data: IndividualData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["unitById", id],
    queryFn: () => GetUnitById(parseInt(id)),
  });

  console.log(IndividualData, "response");
  return (
    <>
      {isLoading ? (
        "Loading ..."
      ) : (
        <CreateUnits clickedIdData={IndividualData} />
      )}
    </>
  );
}

export default EditUnit;
