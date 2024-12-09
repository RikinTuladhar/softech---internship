import React from "react";
import { getFiscalYearById } from "@/src/services/apiService/setup/fiscalyear/fiscalyear";
import CreateFiscalYear from "../CreateFiscalYear";
import Error from "@/src/components/reusable/Error";
import Loader from "@/src/components/reusable/Loader";
import { FiscalYear } from "@/types/types";
interface FetchResponse {
  data: FiscalYear | null;
  status: number;
  message: string;
}

export default async function EditFiscalYear({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  // Handle loading state
  let loading: Boolean = true;

  let error: string | null = null;

  async function fetchData() {
    try {
      const { data, status, message }: FetchResponse = await getFiscalYearById(
        parseInt(id)
      );

      if (status === 200) {
        return data;
      } else {
        console.log("log");
      }
    } catch (err) {
      error = (err as Error).message || "An error occurred.";
      return null;
    } finally {
      loading = false;
    }
  }

  const apiData = await fetchData();
  console.log(apiData);
  if (error) return <Error />;

  return (
    <div>
      {loading ? <Loader /> : <CreateFiscalYear clickedIdData={apiData} />}
    </div>
  );
}
