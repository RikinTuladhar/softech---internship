import apiUrls from "../../../apiUrls";
import { mainApi } from "../../../apiHelper";

const createBank = async (data: any) => {
  let response = await mainApi(
    apiUrls?.Bank?.createBank.method,
    apiUrls.Bank.createBank.url,
    data,
  );
  return response;
};

const getBank = async () => {
  let response = await mainApi(
    apiUrls?.Bank?.getBank.method,
    apiUrls.Bank.getBank.url,
  );
  return response;
};

const getBankById = async (id: number) => {
  let response = await mainApi(
    apiUrls?.Bank?.getBankById.method,
    apiUrls.Bank.getBankById.url+`/${id?id:0}`
  );
  return response;
};

const deleteBank = async (id: number) => {
  let response = await mainApi(
    apiUrls?.Bank?.deleteBank.method,
    apiUrls.Bank.deleteBank.url + `/${id ? id : 0}`,
  );
  return response;
};

const editBank = async (data: any) => {
  let response = await mainApi(
    apiUrls?.Bank?.editBank.method,
    apiUrls.Bank.editBank.url,
    data,
  );
  return response;
};

export { createBank, getBank, getBankById, deleteBank, editBank };
