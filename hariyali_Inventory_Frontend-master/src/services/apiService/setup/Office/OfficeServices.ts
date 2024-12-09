import apiUrls from "../../../apiUrls";
import { mainApi } from "../../../apiHelper";
import { FieldValues } from "react-hook-form";

const GetState = async () => {
  let response = await mainApi(
    apiUrls?.Office?.GetState.method,
    apiUrls.Office.GetState.url
  );
  return response;
};

export const GetDistrict = async (id: number) => {
  let response = await mainApi(
    apiUrls?.Office?.GetDistrict.method,
    apiUrls.Office.GetDistrict.url + `?stateId=${id ? id : 0}`
  );
  return response;
};
export const GetPalika = async (id: number) => {
  let response = await mainApi(
    apiUrls?.Office?.GetPalika.method,
    apiUrls.Office.GetPalika.url + `?districtId=${id ? id : 0}`
  );
  return response;
};

export const GetAllDistrict = async () => {
  let response = await mainApi(
    apiUrls.Office.GetAllDistrict.method,
    apiUrls.Office.GetAllDistrict.url
  );
  return response;
};
export const GetAllPalika = async () => {
  let response = await mainApi(
    apiUrls.Office.GetAllPalika.method,
    apiUrls.Office.GetAllPalika.url
  );
  return response;
};
// company department
export const CreateCompanyDepartment = async (data: FieldValues) => {
  let response = await mainApi(
    apiUrls.Office.companyDepartment.create.method,
    apiUrls.Office.companyDepartment.create.url,
    data as String
  );
  return response;
};

export const GetCompanyDepartment = async () => {
  let response = await mainApi(
    apiUrls.Office.companyDepartment.get.method,
    apiUrls.Office.companyDepartment.get.url
  );
  return response?.data;
};

export const GetCompanyDepartmentById = async (id: number) => {
  let response = await mainApi(
    apiUrls.Office.companyDepartment.getById.method,
    apiUrls.Office.companyDepartment.getById.url + `/${id ? id : 0}`
  );
  return response?.data;
};

export const DeleteCompanyDepartment = async (id: number) => {
  let response = await mainApi(
    apiUrls.Office.companyDepartment.deleteDepartment.method,
    apiUrls.Office.companyDepartment.deleteDepartment.url + `/${id ? id : 0}`
  );
  return response;
};

//company post services

export const CreateCompanyPost = async (data: FieldValues) => {
  let response = await mainApi(
    apiUrls.Office.companyPost.createPost.method,
    apiUrls.Office.companyPost.createPost.url,
    data as String
  );
  return response;
};

export const GetCompanyPost = async () => {
  let response = await mainApi(
    apiUrls.Office.companyPost.getPost.method,
    apiUrls.Office.companyPost.getPost.url
  );
  return response?.data;
};

export const GetCompanyPostById = async (id: number) => {
  let response = await mainApi(
    apiUrls.Office.companyPost.getPostById.method,
    apiUrls.Office.companyPost.getPostById.url + `/${id ? id : 0}`
  );
  return response?.data;
};

export const GetCompanyPostByDepartmentId = async (departmentId: number) => {
  let response = await mainApi(
    apiUrls.Office.companyPost.getPostByDepartmentId.method,
    apiUrls.Office.companyPost.getPostByDepartmentId.url +
      `/${departmentId ? departmentId : 0}`
  );
  return response?.data;
};
export const DeleteCompanyPost = async (id: number) => {
  let response = await mainApi(
    apiUrls.Office.companyPost.deletePost.method,
    apiUrls.Office.companyPost.deletePost.url + `/${id ? id : 0}`
  );
  return response;
};

// company employee services
export const CreateCompanyEmployee = async (data: FieldValues) => {
  let response = await mainApi(
    apiUrls.Office.companyEmployee.createEmployee.method,
    apiUrls.Office.companyEmployee.createEmployee.url,
    data as String
  );
  return response;
};

export { GetState };
