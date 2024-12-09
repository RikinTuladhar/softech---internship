import apiUrls from "../../apiUrls";
import { mainApi } from "../../apiHelper";
import { FieldValues } from "react-hook-form";

export const CreateRequest = async (data: FieldValues) => {
  let resposne = await mainApi(
    apiUrls.request.createRequest.method,
    apiUrls.request.createRequest.url,
    data as any
  );
  return resposne;
};
export const GetRequestByFarmerGroup = async () => {
  let response = await mainApi(
    apiUrls.request.getRequestByFarmerGroup.method,
    apiUrls.request.getRequestByFarmerGroup.url
  );
  return response?.data;
};

export const GetRequestedItemByRequestId = async (id: number) => {
  let response = await mainApi(
    apiUrls?.request?.getRequestedItem?.method,
    apiUrls?.request?.getRequestedItem?.url + `/${id ? id : 0}`
  );
  return response?.data;
};

export const GetProjectIncommingRequest = async () => {
  let response = await mainApi(
    apiUrls.request.incommingRequestForProject.method,
    apiUrls.request.incommingRequestForProject.url
  );
  return response?.data;
};

export const CreateGivenToProject = async (data: FieldValues) => {
  let response = await mainApi(
    apiUrls.request.createGivenToProject.method,
    apiUrls.request.createGivenToProject.url,
    data as any
  );
  return response;
};
export const CreateGivenToGroup = async (data: FieldValues) => {
  let response = await mainApi(
    apiUrls.request.createGivenToGroup.method,
    apiUrls.request.createGivenToGroup.url,
    data as any
  );
  return response;
};
export const CreateGivenToFarmer = async (data: FieldValues) => {
  let response = await mainApi(
    apiUrls.request.createGivenToFarmer.method,
    apiUrls.request.createGivenToFarmer.url,
    data as any
  );
  return response;
};

export const CreateRequestByProject = async (data: FieldValues) => {
  let response = await mainApi(
    apiUrls.request.createRequestByProject.method,
    apiUrls.request.createRequestByProject.url,
    data as any
  );
  return response;
};

export const GetRequestDoneByProject = async () => {
  let response = await mainApi(
    apiUrls.request.getRequestDoneByProject.method,
    apiUrls.request.getRequestDoneByProject.url
  );
  return response?.data;
};

export const GetIncommingRequestForCompany = async () => {
  let response = await mainApi(
    apiUrls.request.getInCommingRequestForCompany.method,
    apiUrls.request.getInCommingRequestForCompany.url
  );
  return response?.data;
};

export const GetRequestedItemByProject = async (id: number) => {
  let response = await mainApi(
    apiUrls.request.getRequestedItemByProject.method,
    apiUrls.request.getRequestedItemByProject.url + `/${id ? id : 0}`
  );
  return response?.data;
};

export const GetGivenStockToGroup = async () => {
  let response = await mainApi(
    apiUrls.request.getGivenStockToGroup.method,
    apiUrls.request.getGivenStockToGroup.url
  );
  return response?.data;
};
export const GetGivenStockToFarmer = async () => {
  let response = await mainApi(
    apiUrls.request.getGivenStockToFramer.method,
    apiUrls.request.getGivenStockToFramer.url
  );
  return response?.data;
};

export const GetStockTakenByGroup = async () => {
  let response = await mainApi(
    apiUrls.request.getStockTakenByGroup.method,
    apiUrls.request.getStockTakenByGroup.url
  );
  return response?.data;
};

export const GetGivenItemsByProject = async (givenId: number) => {
  let response = await mainApi(
    apiUrls.request.getGivenItemsByProject.method,
    apiUrls.request.getGivenItemsByProject.url + `/${givenId ? givenId : 0}`
  );
  return response?.data;
};
export const GetGivenItemsByGroup = async (givenId: number) => {
  let response = await mainApi(
    apiUrls.request.getGivenItemsByGroup.method,
    apiUrls.request.getGivenItemsByGroup.url + `/${givenId ? givenId : 0}`
  );
  return response?.data;
};

export const GetGivenItemsToProject = async () => {
  let response = await mainApi(
    apiUrls.request.getGivenItemsToProject.method,
    apiUrls.request.getGivenItemsToProject.url
  );
  return response?.data;
};
export const GetItemsGivenByCompany = async (id: number) => {
  let response = await mainApi(
    apiUrls.request.getItemsGivenByCompany.method,
    apiUrls.request.getItemsGivenByCompany.url + `/${id ? id : 0}`
  );
  return response?.data;
};

export const GetItemsTakenByProject = async () => {
  let response = await mainApi(
    apiUrls.request.getItemsTakenByProject.method,
    apiUrls.request.getItemsTakenByProject.url
  );
  return response?.data;
};

export const GetCompairdItemsByGroup = async (requestId: number) => {
  let response = await mainApi(
    apiUrls.request.getComparisonRequestedItem.method,
    apiUrls.request.getComparisonRequestedItem.url +
      `/${requestId ? requestId : 0}`
  );
  return response?.data;
};

export const GetGroupIdByRequestId = async (id: number) => {
  let response = await mainApi(
    apiUrls.request.getGroupIdByRequestId.method,
    apiUrls.request.getGroupIdByRequestId.url + `/${id ? id : 0}`
  );
  return response?.data;
};

export const GetCompairedItemByProject = async (requestId: number) => {
  let response = await mainApi(
    apiUrls.request.getComparisonRequestedItemByProject.method,
    apiUrls.request.getComparisonRequestedItemByProject.url +
      `/${requestId ? requestId : 0}`
  );
  return response?.data;
};

export const GetProjectIdByRequestId = async (id: number) => {
  let response = await mainApi(
    apiUrls.request.getProjectIdByRequestId.method,
    apiUrls.request.getProjectIdByRequestId.url + `/${id ? id : 0}`
  );
  return response?.data;
};
