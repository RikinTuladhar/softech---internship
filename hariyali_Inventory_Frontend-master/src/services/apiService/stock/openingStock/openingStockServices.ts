import { mainApi } from "@/src/services/apiHelper";
import apiUrls from "@/src/services/apiUrls";

export async function CreateOpeningStock(data: any) {
  let response = await mainApi(
    apiUrls.stock.openingStock.create.method,
    apiUrls.stock.openingStock.create.url,
    data
  );
  return response;
}

export async function GetStockList() {
  let response = await mainApi(
    apiUrls.stock.openingStock.list.method,
    apiUrls.stock.openingStock.list.url
  );
  return response;
}
export async function getStockList() {
  const { data } = await GetStockList();
  return data;
}

export async function GetPriceList(id: number) {
  let response = await mainApi(
    apiUrls?.stock?.openingStock.getPriceList.method,
    apiUrls?.stock?.openingStock.getPriceList.url + `/${id ? id : 0}`
  );
  return response?.data;
}
export async function GetRemainingQuantity(itemId: number, rate: number) {
  let response = await mainApi(
    apiUrls?.stock?.openingStock.getRemainingStock.method,
    apiUrls?.stock?.openingStock.getRemainingStock.url +
      `?itemId=${itemId}&rate=${rate}`
  );
  return response?.data;
}

export async function GetProjectOpeningStock(){
  let response = await mainApi(
    apiUrls?.stock?.openingStock?.listProject.method,
    apiUrls?.stock?.openingStock?.listProject.url,
  )
  return response?.data;

}

export async function GetPriceListByProjectStock(id: number) {
  let response = await mainApi(
    apiUrls?.stock?.openingStock.getPriceListProject.method,
    apiUrls?.stock?.openingStock.getPriceListProject.url + `/${id ? id : 0}`
  );
  return response?.data;
}
export async function GetRemainingQuantityByProjectStock(itemId: number, rate: number) {
  let response = await mainApi(
    apiUrls?.stock?.openingStock.getRemainingStockProject.method,
    apiUrls?.stock?.openingStock.getRemainingStockProject.url +
      `?itemId=${itemId}&rate=${rate}`
  );
  return response?.data;
}
export async function GetPriceListByGroupStock(id: number) {
  let response = await mainApi(
    apiUrls?.stock?.openingStock.getPriceListGroup.method,
    apiUrls?.stock?.openingStock.getPriceListGroup.url + `/${id ? id : 0}`
  );
  return response?.data;
}
export async function GetRemainingQuantityByGroupStock(itemId: number, rate: number) {
  let response = await mainApi(
    apiUrls?.stock?.openingStock.getRemainingStockGroup.method,
    apiUrls?.stock?.openingStock.getRemainingStockGroup.url +
      `?itemId=${itemId}&rate=${rate}`
  );
  return response?.data;
}

export async function GetGroupOpeningStock(){
  let response = await mainApi(
    apiUrls?.stock?.openingStock?.listGroup.method,
    apiUrls?.stock?.openingStock?.listGroup.url,
  )
  return response?.data;

}