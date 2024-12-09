import { mainApi } from "@/src/services/apiHelper";
import apiUrls from "@/src/services/apiUrls";
import { FieldValues } from "react-hook-form";

export const CreateFarmerGroup = async (data: FieldValues) => {
  let response = await mainApi(
    apiUrls.farmerGroup.createFarmerGroup.method,
    apiUrls.farmerGroup.createFarmerGroup.url,
    data as String
  );
  return response;
};

export const GetFarmerGroup = async () => {
  let response = await mainApi(
    apiUrls.farmerGroup.getFarmerGroup.method,
    apiUrls.farmerGroup.getFarmerGroup.url
  );
  return response;
};

export const GetFarmerGroupById = async (id: string) => {
  let response = await mainApi(
    apiUrls.farmerGroup.getFarmerGroupById.method,
    apiUrls.farmerGroup.getFarmerGroupById.url + `/${id ? id : ""}`
  );
  return response;
};
export const getFarmerGroupById = async (id: string) => {
  const { data } = await GetFarmerGroupById(id);
  return data;
};

export const DeleteFarmerGroup = async (id: string) => {
  let response = await mainApi(
    apiUrls.farmerGroup.deleteFarmerGroup.method,
    apiUrls.farmerGroup.deleteFarmerGroup.url + `/${id ? id : ""}`
  );
  return response;
};
export const updateStatus = async (id: string) => {
  let response = await mainApi(
    apiUrls.farmerGroup.changeStatus.method,
    apiUrls.farmerGroup.changeStatus.url + `/${id ? id : ""}`
  );
  return response;
};
export const GetFarmerGroupByProject = async () => {
  let response = await mainApi(
    apiUrls.farmerGroup.getGroupByProject.method,
    apiUrls.farmerGroup.getGroupByProject.url
  );
  return response?.data;
};

export const GetTypeAccordingToGroupStock = async () => {
  let response = await mainApi(
    apiUrls.farmerGroup.getType.method,
    apiUrls.farmerGroup.getType.url
  );
  return response?.data;
};

export const GetCategoryAccordingToGroupStock = async (id: number) => {
  let response = await mainApi(
    apiUrls.farmerGroup.getCategory.method,
    apiUrls.farmerGroup.getCategory.url + `/${id ? id : 0}`
  );
  return response?.data;
};

export const GetSubCategoryAccordingToGroupStock = async (id: number) => {
  let response = await mainApi(
    apiUrls.farmerGroup.getSubCategory.method,
    apiUrls.farmerGroup.getSubCategory.url + `/${id ? id : 0}`
  );
  return response?.data;
};

export const GetItemAccordingToGroupStock = async (id: number) => {
  let response = await mainApi(
    apiUrls.farmerGroup.getItem.method,
    apiUrls.farmerGroup.getItem.url + `/${id ? id : 0}`
  );
  return response?.data;
};

export const GetFarmerGroupByManagerId = async (id: string) => {
  let response = await mainApi(
    apiUrls.farmerGroup.getFarmerGroupByManagerId.method,
    apiUrls.farmerGroup.getFarmerGroupByManagerId.url + `/${id ? id : 0}`
  );
  return response?.data;
};

export const GetFarmerGroupByProjectId = async (id: string) => {
  let response = await mainApi(
    apiUrls.farmerGroup.getFarmerGroupByProjectId.method,
    apiUrls.farmerGroup.getFarmerGroupByProjectId.url + `/${id ? id : 0}`
  );
  return response?.data;
};
