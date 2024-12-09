import apiUrls from "../../../apiUrls";
import { mainApi } from "../../../apiHelper";

const registerUser = async (data: any) => {
  let response = await mainApi(
    apiUrls?.User?.registerUser.method,
    apiUrls.User.registerUser.url,
    data,
  );
  return response;
};

const loginUser = async (data: any) => {
  let response = await mainApi(
    apiUrls?.User?.Login.method,
    apiUrls.User.Login.url,
    data,
  );
  return response;
};

const Me = async () => {
  let response = await mainApi(
    apiUrls?.User?.Userme.method,
    apiUrls.User.Userme.url,
  );
  return response;
};

const nameList = async()=>{
  let response = await mainApi(
    apiUrls?.User?.NameList?.method,
    apiUrls.User.NameList.url,
  );
  return response;
}
const emailList = async()=>{
  let response = await mainApi(
    apiUrls?.User?.EmailList?.method,
    apiUrls.User.EmailList.url,
  );
  return response;
}
export const nameListQuery = async()=>{
  const {data} = await nameList();
  return data;
}
export const emailListQuery = async()=>{
  const {data} = await emailList();
  return data;
}

export { registerUser, loginUser, Me , nameList };
