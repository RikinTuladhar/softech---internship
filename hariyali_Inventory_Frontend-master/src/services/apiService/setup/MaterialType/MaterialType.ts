import apiUrls from "../../../apiUrls";
import { mainApi } from "../../../apiHelper";

const getMaterialType = async () => {
  let response = await mainApi(
    apiUrls?.MaterialType?.Newrequest.method,
    apiUrls.MaterialType.Newrequest.url,
  );
  return response;
};

export { getMaterialType };
