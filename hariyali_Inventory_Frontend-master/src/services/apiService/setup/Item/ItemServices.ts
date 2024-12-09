import apiUrls from "../../../apiUrls";
import { mainApi } from "../../../apiHelper";

const CreateItem = async (data: any) => {
  let response = await mainApi(
    apiUrls?.Item?.CreateItem.method,
    apiUrls.Item.CreateItem.url,
    data,
  );
  return response;
};

const getAllItems = async () => {
  let response = await mainApi(
    apiUrls?.Item?.getAllItem.method,
    apiUrls.Item.getAllItem.url,
  );
  return response;
};

const getItemBySubCategory = async (subCategoryId: number) => {
  let response = await mainApi(
    apiUrls?.Item?.GetItemBySubCategory.method,
    apiUrls.Item.GetItemBySubCategory.url + `/${subCategoryId}`,
  );
  return response;
};

const getItemById = async (id: number) => {
  let response = await mainApi(
    apiUrls?.Item?.GetItemById.method,
    apiUrls.Item.GetItemById.url + `/${id}`,
  );
  return response;
};

const deleteItem = async (id: number) => {
  let response = await mainApi(
    apiUrls?.Item?.deleteItem.method,
    apiUrls.Item.deleteItem.url + `/${id}`,
  );
  return response;
};

export {
  CreateItem,
  getAllItems,
  getItemBySubCategory,
  getItemById,
  deleteItem,
};
