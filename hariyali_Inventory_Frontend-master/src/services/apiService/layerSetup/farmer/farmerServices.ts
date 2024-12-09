import { mainApi } from "@/src/services/apiHelper";
import apiUrls from "@/src/services/apiUrls";
import { FieldValues } from "react-hook-form";

export const CreateFarmer = async (data: FieldValues) => {
  let response = await mainApi(
    apiUrls.farmer.createrFarmer.method,
    apiUrls.farmer.createrFarmer.url,
    data as String
  );
  return response;
};

export const GetFarmer = async () => {
  let response = await mainApi(
    apiUrls.farmer.getFarmer.method,
    apiUrls.farmer.getFarmer.url
  );
  return response;
};

export const GetFarmerById = async (id: string) => {
  let response = await mainApi(
    apiUrls.farmer.getFarmerById.method,
    apiUrls.farmer.getFarmerById.url + `/${id ? id : ""}`
  );
  return response;
};

export const deleteFarmer = async (id: string) => {
  let response = await mainApi(
    apiUrls.farmer.deleteFarmer.method,
    apiUrls.farmer.deleteFarmer.url + `/${id ? id : ""}`
  );
  return response;
};
export const updateFarmerStatus = async (id: string) => {
  let response = await mainApi(
    apiUrls.farmer.updateFarmerStatus.method,
    apiUrls.farmer.updateFarmerStatus.url + `/${id ? id : ""}`
  );
  return response;
};

export const GetFarmerAccordingToGroup = async () => {
  let response = await mainApi(
    apiUrls.farmer.farmerByGroupId.method,
    apiUrls.farmer.farmerByGroupId.url
  );
  return response?.data;
};

export const GetFarmerByManager = async (managerId: string) => {
  let response = await mainApi(
    apiUrls.farmer.farmerByManager.method,
    apiUrls.farmer.farmerByManager.url + `/${managerId ? managerId : 0}`
  );
  return response?.data;
};

export const GetFarmerByProject = async (projectId: string) => {
  let response = await mainApi(
    apiUrls.farmer.farmerByProject.method,
    apiUrls.farmer.farmerByProject.url + `/${projectId ? projectId : 0}`
  );
  return response?.data;
};
