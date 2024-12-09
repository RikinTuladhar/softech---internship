import { mainApi } from "@/src/services/apiHelper";
import apiUrls from "@/src/services/apiUrls";
import { FieldValues } from "react-hook-form";

export const CreateHariyaliProject = async (data: FieldValues) => {
  let response = await mainApi(
    apiUrls.hariyaliProject.createHariyaliProject.method,
    apiUrls.hariyaliProject.createHariyaliProject.url,
    data as String
  );
  return response;
};

export const GetHariyaliProject = async () => {
  let response = await mainApi(
    apiUrls.hariyaliProject.getHariyaliProject.method,
    apiUrls.hariyaliProject.getHariyaliProject.url
  );
  return response;
};

export const GetHariyaliProjectById = async (id: string) => {
  let response = await mainApi(
    apiUrls.hariyaliProject.getHariyaliProjectById.method,
    apiUrls.hariyaliProject.getHariyaliProjectById.url + `/${id ? id : ""}`
  );
  return response;
};

export const DeleteHariyaliProject = async (id: string) => {
  let response = await mainApi(
    apiUrls.hariyaliProject.deleteHariyaliProject.method,
    apiUrls.hariyaliProject.deleteHariyaliProject.url + `/${id ? id : ""}`
  );
  return response;
};

export const GetType = async () => {
  let response = await mainApi(
    apiUrls.hariyaliProject.materialType.method,
    apiUrls.hariyaliProject.materialType.url
  );
  return response?.data;
};

export const GetCategory = async (id: number) => {
  let response = await mainApi(
    apiUrls.hariyaliProject.categoryList.method,
    apiUrls.hariyaliProject.categoryList.url + `/${id}`
  );
  return response?.data;
};

export const GetSubCategory = async (id: number) => {
  let response = await mainApi(
    apiUrls.hariyaliProject.subCategoryList.method,
    apiUrls.hariyaliProject.subCategoryList.url + `/${id}`
  );
  return response?.data;
};
export const GetItem = async (id: number) => {
  let response = await mainApi(
    apiUrls.hariyaliProject.itemList.method,
    apiUrls.hariyaliProject.itemList.url + `/${id}`
  );
  return response?.data;
};
