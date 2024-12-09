"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GetCompanyPostById } from "@/src/services/apiService/setup/Office/OfficeServices";
import { useParams } from "next/navigation";
import CreatePostComp from "../CreatePostComp";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
function EditPostPage() {
  const { postId }: { postId: string } = useParams();
  const {
    data: apiData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["postById", postId],
    queryFn: () => GetCompanyPostById(parseInt(postId)),
    enabled: !!postId,
  });
  if (isError) return <Error />;
  return <>{isLoading ? <Loader /> : <CreatePostComp clickedIdData={apiData} />}</>;
}

export default EditPostPage;
