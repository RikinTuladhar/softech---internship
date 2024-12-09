import apiUrls from "@/src/services/apiUrls";
import { mainApi } from "@/src/services/apiHelper";

export const CreateSubCategory = async (data: any) => {
  let response = await mainApi(
    apiUrls.MaterialSubCategory.CreateSubCategory.method,
    apiUrls.MaterialSubCategory.CreateSubCategory.url,
    data,
  );
  return response;
};

export const GetSubCategory = async () => {
  let response = await mainApi(
    apiUrls.MaterialSubCategory.GetSubCategory.method,
    apiUrls.MaterialSubCategory.GetSubCategory.url,
  );
  return response;
};

export const GetSubCategoryByCategoryId = async (categoryId: number) => {
  let response = await mainApi(
    apiUrls.MaterialSubCategory.GetSubCategoryByCategory.method,
    apiUrls.MaterialSubCategory.GetSubCategoryByCategory.url +
      `/${categoryId ? categoryId : ""}`,
  );
  return response;
};

export const GetSubCategoryById = async (id: number) => {
  let response = await mainApi(
    apiUrls.MaterialSubCategory.GetSubCategoryById.method,
    apiUrls.MaterialSubCategory.GetSubCategoryById.url + `/${id ? id : ""}`,
  );
  return response;
};

export const DeleteSubCategory = async (id: number) => {
  let response = await mainApi(
    apiUrls.MaterialSubCategory.deleteCategory.method,
    apiUrls.MaterialSubCategory.deleteCategory.url + `/${id ? id : ""}`,
  );
  return response;
};
