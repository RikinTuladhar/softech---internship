import { getMaterialType } from "@/src/services/apiService/setup/MaterialType/MaterialType"
import { getMaterialCategoryByType } from "@/src/services/apiService/setup/MaterialCategory/MaterialCategory"
import { GetSubCategoryByCategoryId } from '@/src/services/apiService/setup/MaterialSubCategory/materialSubCategoryServices'
import { getItemBySubCategory } from '@/src/services/apiService/setup/Item/ItemServices'


export async function  GetMaterialType(){
    const { data} = await getMaterialType();
    return data;
}
export async function GetMaterialCategoryByType(id:number){
    const {data} = await getMaterialCategoryByType(id);
    return data;
}
export async function getSubCategoryByCategoryId(id:number){
    const {data} = await GetSubCategoryByCategoryId(id);
    return data;
}
export async function GetItemBySubCategory(id:number){
    const {data} = await getItemBySubCategory(id);
    return data;
}