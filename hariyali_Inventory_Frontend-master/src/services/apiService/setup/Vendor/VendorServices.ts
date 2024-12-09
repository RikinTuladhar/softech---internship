import apiUrls from "../../../apiUrls";
import { mainApi } from "../../../apiHelper";

const createVendor = async (data: any) => {
  let response = await mainApi(
    apiUrls?.Vendor?.createVendor.method,
    apiUrls.Vendor.createVendor.url,
    data,
  );
  return response;
};

const getVendor = async () => {
  let response = await mainApi(
    apiUrls?.Vendor?.getVendor.method,
    apiUrls.Vendor.getVendor.url,
  );
  return response;
};

const getVendorById = async (id: number) => {
  let response = await mainApi(
    apiUrls?.Vendor?.getVendorById.method,
    apiUrls.Vendor.getVendorById.url+`/${id?id:0}`,
  );
  return response;
};

const deleteVendor = async (id: number) => {
  let response = await mainApi(
    apiUrls?.Vendor?.deleteVendor.method,
    apiUrls.Vendor.deleteVendor.url + `/${id}`,
  );
  return response;
};

export { createVendor, getVendor, getVendorById, deleteVendor };
