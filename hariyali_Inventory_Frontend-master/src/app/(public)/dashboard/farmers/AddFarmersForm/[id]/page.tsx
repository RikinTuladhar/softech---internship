'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import Loader from '@/src/components/reusable/Loader'
import Error from '@/src/components/reusable/Error'
import { GetFarmerById } from '@/src/services/apiService/layerSetup/farmer/farmerServices'
const getFarmerById = async(id:string)=>{
  const {data} = await GetFarmerById(id);
  return data;
}
import AddFarmerForm from '../AddFarmerForm'
function FarmerEdit() {
  const {id}:{id:string} = useParams();
  const {data:apiData,isError,isLoading} = useQuery({
    queryKey:['farmerById',id],
    queryFn:()=>getFarmerById(id),
    enabled:!!id
  })
  if(isError) return <Error/>;
  return (
    <div>
      {isLoading ? <Loader/> : <AddFarmerForm clickedIdData={apiData} /> } 
    </div>
  )
}

export default FarmerEdit