import apiUrls from "../../../apiUrls";
import { mainApi } from "../../../apiHelper";

const createFiscalYear = async (data: any) => {
  let response = await mainApi(
    apiUrls?.fiscalYear?.createFiscalyear.method,
    apiUrls.fiscalYear.createFiscalyear.url,
    data
  );
  return response;
};

const getFiscalYear = async () => {
  let response = await mainApi(
    apiUrls?.fiscalYear?.getFiscalYear.method,
    apiUrls.fiscalYear.getFiscalYear.url
  );
  return response?.data;
};

const getFiscalYearById = async (id: number) => {
  let response = await mainApi(
    apiUrls?.fiscalYear?.getFiscalYearById.method,
    apiUrls.fiscalYear.getFiscalYearById.url + `/${id ? id : 0}`
  );
  return response;
};

const deleteFiscalYear = async (id: string) => {
  let response = await mainApi(
    apiUrls?.fiscalYear?.deleteFiscalYear.method,
    apiUrls.fiscalYear.deleteFiscalYear.url + `/${id ? id : 0}`
  );
  return response;
};

const updateFiscalYearActiveStatus = async (id: number) => {
  let response = await mainApi(
    apiUrls?.fiscalYear?.updateActiveStatus.method,
    apiUrls.fiscalYear.updateActiveStatus.url + `/${id ? id : 0}`
  );
  return response;
};

export {
  createFiscalYear,
  getFiscalYear,
  getFiscalYearById,
  deleteFiscalYear,
  updateFiscalYearActiveStatus,
};
