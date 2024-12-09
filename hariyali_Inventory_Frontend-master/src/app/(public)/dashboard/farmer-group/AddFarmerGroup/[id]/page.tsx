'use client'
import React from 'react'
import { useParams } from 'next/navigation'

import AddFarmerGroup from '../AddFarmerGroup'
import Error from '@/src/components/reusable/Error'
import Loader from "@/src/components/reusable/Loader"
import {
    GetFarmerGroupById
} from '@/src/services/apiService/layerSetup/farmerGroup/farmerGroupServices'
import { useQuery } from '@tanstack/react-query'
const getFarmerGroupById = async(id:string)=>{
    const{data} = await GetFarmerGroupById(id);
    return data;
}
function EditPageFarmerGroup() {
    const {id}:{id:string} = useParams();
    const {data:apiData,isError,isLoading} = useQuery({
            queryKey:['farmerGroupById',id],
            queryFn:()=>getFarmerGroupById(id),
            enabled:!! id
    })
    if(isError) return <Error/>
  return (
    <div>
        {
            isLoading ? <Loader/> : <AddFarmerGroup clickedIdData={apiData} />
        }
    </div>
  )
}

export default EditPageFarmerGroup