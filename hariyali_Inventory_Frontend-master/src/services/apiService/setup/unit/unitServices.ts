import apiUrls from "../../../apiUrls";
import { mainApi } from "../../../apiHelper";

const CreateUnit = async (data: any) => {
  let response = await mainApi(
    apiUrls?.unit?.createUnit.method,
    apiUrls.unit.createUnit.url,
    data,
  );
  return response;
};

const getUnit = async () => {
  let response = await mainApi(
    apiUrls?.unit?.getUnit.method,
    apiUrls.unit.getUnit.url,
  );
  return response;
};

const deleteUnitList = async () => {
  let response = await mainApi(
    apiUrls?.unit?.deleteUnit.method,
    apiUrls.unit.deleteUnit.url,
  );
  return response;
};

const deleteUnit = async (id: number) => {
  let response = await mainApi(
    apiUrls?.unit?.deleteUnit.method,
    apiUrls.unit.deleteUnit.url + `/${id}`,
  );
  return response;
};
export const getUnitById = async (id: number) => {
  let response = await mainApi(
    apiUrls?.unit.getUnitById.method,
    apiUrls?.unit.getUnitById.url + `/${id ? id : 0}`,
  );
  return response;
};

export { CreateUnit, getUnit, deleteUnitList, deleteUnit };
