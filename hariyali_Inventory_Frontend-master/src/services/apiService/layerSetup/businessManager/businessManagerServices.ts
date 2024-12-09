import { mainApi } from "@/src/services/apiHelper";
import apiUrls from "@/src/services/apiUrls";
import { FieldValues } from "react-hook-form";

export const CreateBusinessManager = async (data: FieldValues) => {
  let response = await mainApi(
    apiUrls.businessManager.CreateBusinessManager.method,
    apiUrls.businessManager.CreateBusinessManager.url,
    data,
  );
  return response;
};

export const GetBusinessManager = async () => {
  let response = await mainApi(
    apiUrls.businessManager.GetBusinessManager.method,
    apiUrls.businessManager.GetBusinessManager.url,
  );
  return response;
};

export const GetBusinessManagerById = async (id: string) => {
  let response = await mainApi(
    apiUrls.businessManager.GetBusinessManagerById.method,
    apiUrls.businessManager.GetBusinessManagerById.url + `/${id ? id : ""}`,
  );
  return response;
};

export const DeleteBusinessManager = async (id: string) => {
  let response = await mainApi(
    apiUrls.businessManager.DeleteBusinessManager.method,
    apiUrls.businessManager.DeleteBusinessManager.url + `/${id ? id : ""}`,
  );
  return response;
};

export const GetBusinessManagerByProjectId = async(id:string)=>{
  let response = await mainApi(
    apiUrls.businessManager.GetManagerByProjectId.method,
    apiUrls.businessManager.GetManagerByProjectId.url+`/${id?id:0}`,
  )
  return response?.data;
}