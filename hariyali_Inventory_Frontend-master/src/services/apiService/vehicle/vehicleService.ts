import { mainApi } from "@/src/services/apiHelper";
import apiUrls from "@/src/services/apiUrls";

//Company Services
export const createVehicleCompany = async (data?: any) => {
  let response = await mainApi(
    apiUrls?.vehicle?.company.createCompany.method,
    apiUrls.vehicle.company.createCompany.url,
    data,
  );
  return response;
};
export const getVehicleCompany = async () => {
  let response = await mainApi(
    apiUrls.vehicle.company.getCompany.method,
    apiUrls.vehicle.company.getCompany.url,
  );
  return response;
};

export const getVehicleCompanyById = async (id: number) => {
  let response = await mainApi(
    apiUrls.vehicle.company.getCompanyById.method,
    apiUrls.vehicle.company.getCompanyById.url + `/${id ? id : 0}`,
  );
  return response;
};
export const deleteVehicleCompany = async (id: number) => {
  let response = await mainApi(
    apiUrls.vehicle.company.deleteCompany.method,
    apiUrls.vehicle.company.deleteCompany.url + `/${id ? id : 0}`,
  );
  return response;
};

// Vehicle type Services

export const CreateVehicleType = async (data: any) => {
  let response = await mainApi(
    apiUrls.vehicle.type.createType.method,
    apiUrls.vehicle.type.createType.url,
    data,
  );
  return response;
};

export const GetVehicleType = async () => {
  let response = await mainApi(
    apiUrls.vehicle.type.getType.method,
    apiUrls.vehicle.type.getType.url,
  );
  return response;
};

export const GetVehicleTypeById = async (id: number) => {
  let response = await mainApi(
    apiUrls.vehicle.type.getTypeById.method,
    apiUrls.vehicle.type.getTypeById.url + `/${id ? id : 0}`,
  );
  return response;
};
export const DeleteVehicleType = async (id: number) => {
  let response = await mainApi(
    apiUrls.vehicle.type.deleteType.method,
    apiUrls.vehicle.type.deleteType.url + `/${id ? id : 0}`,
  );
  return response;
};

// Vehicle Use Services
export const CreateVehicleUse = async (data: any) => {
  let response = await mainApi(
    apiUrls.vehicle.use.createUse.method,
    apiUrls.vehicle.use.createUse.url,
    data,
  );
  return response;
};

export const GetVehicleUse = async () => {
  let response = await mainApi(
    apiUrls.vehicle.use.getVehicleUse.method,
    apiUrls.vehicle.use.getVehicleUse.url,
  );
  return response;
};

export const GetVehicleUseById = async (id: number) => {
  let response = await mainApi(
    apiUrls.vehicle.use.getVehicleUseById.method,
    apiUrls.vehicle.use.getVehicleUseById.url + `/${id ? id : 0}`,
  );
  return response;
};

export const DeleteVehicleUse = async (id: number) => {
  let response = await mainApi(
    apiUrls.vehicle.use.deleteVehicleUse.method,
    apiUrls.vehicle.use.deleteVehicleUse.url + `/${id ? id : 0}`,
  );
  return response;
};

//Category Services
export const CreateVehicleCategory = async (data: any) => {
  let response = await mainApi(
    apiUrls.vehicle.category.createVehicleCategory.method,
    apiUrls.vehicle.category.createVehicleCategory.url,
    data,
  );
  return response;
};

export const GetVehicleCategory = async () => {
  let response = await mainApi(
    apiUrls.vehicle.category.getVehicleCategory.method,
    apiUrls.vehicle.category.getVehicleCategory.url,
  );
  return response;
};

export const GetVehicleCategoryById = async (id: number) => {
  let response = await mainApi(
    apiUrls.vehicle.category.getVehicleCategoryById.method,
    apiUrls.vehicle.category.getVehicleCategoryById.url + `/${id ? id : 0}`,
  );
  return response;
};

export const DeleteVehicleCategory = async (id: number) => {
  let response = await mainApi(
    apiUrls.vehicle.category.deleteVehicleCategory.method,
    apiUrls.vehicle.category.deleteVehicleCategory.url + `/${id ? id : 0}`,
  );
  return response;
};

//Vehicle Services

export const CreateVehicle = async (data: any) => {
  let response = await mainApi(
    apiUrls.vehicle.vehicle.createVehicle.method,
    apiUrls.vehicle.vehicle.createVehicle.url,
    data,
  );
  return response;
};

export const GetVehicle = async () => {
  let response = await mainApi(
    apiUrls.vehicle.vehicle.getAllVehicle.method,
    apiUrls.vehicle.vehicle.getAllVehicle.url,
  );
  return response;
};

export const GetVehicleById = async (id: number) => {
  let response = await mainApi(
    apiUrls.vehicle.vehicle.getVehicleById.method,
    apiUrls.vehicle.vehicle.getVehicleById.url + `/${id ? id : 0}`,
  );
  return response;
};

export const DeleteVehicle = async (id: number) => {
  let response = await mainApi(
    apiUrls.vehicle.vehicle.deleteVehicle.method,
    apiUrls.vehicle.vehicle.deleteVehicle.url + `/${id ? id : 0}`,
  );
  return response;
};
