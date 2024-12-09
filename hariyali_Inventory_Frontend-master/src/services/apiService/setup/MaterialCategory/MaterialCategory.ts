import apiUrls from "../../../apiUrls";
import { mainApi } from "../../../apiHelper";

const createMaterialCategory = async (data: any) => {
  let response = await mainApi(
    apiUrls?.MaterialCategory?.CreateMaterialCategory.method,
    apiUrls.MaterialCategory.CreateMaterialCategory.url,
    data,
  );
  return response;
};

const getMaterialCategory = async () => {
  let response = await mainApi(
    apiUrls?.MaterialCategory?.GetMaterialCategory.method,
    apiUrls.MaterialCategory.GetMaterialCategory.url,
  );
  return response;
};

const getMaterialCategoryByType = async (id: number) => {
  let response = await mainApi(
    apiUrls?.MaterialCategory?.GetMaterialbyType.method,
    apiUrls.MaterialCategory.GetMaterialbyType.url + `?id=${id ? id : 0}`,
  );
  return response;
};

const getMaterialCategoryById = async (id: number) => {
  let response = await mainApi(
    apiUrls?.MaterialCategory?.GetMaterialCategoryById.method,
    apiUrls.MaterialCategory.GetMaterialCategoryById.url + `/${id}`,
  );
  return response;
};

const deleteMaterialCategory = async (id: number) => {
  let response = await mainApi(
    apiUrls?.MaterialCategory?.deleteMaterialCategory.method,
    apiUrls.MaterialCategory.deleteMaterialCategory.url + `/${id}`,
  );
  return response;
};

export {
  createMaterialCategory,
  getMaterialCategory,
  getMaterialCategoryByType,
  getMaterialCategoryById,
  deleteMaterialCategory,
};
