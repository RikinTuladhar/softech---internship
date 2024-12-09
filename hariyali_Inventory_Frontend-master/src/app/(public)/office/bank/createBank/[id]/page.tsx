'use client'
import React from "react";
import { getBankById } from '@/src/services/apiService/setup/Bank/BankServices'
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
const GetBankById = async(id:number)=>{
  const {data} = await getBankById(id);
  return data;

}
function EditBank() {
  const {id}:{id:string} = useParams();
  const router = useRouter();
  const {handleSubmit,register,formState:{errors,isSubmitting}} = useForm({})
  const {data:apiData,isError,isLoading} = useQuery({
    queryKey:['bankById',id],
    queryFn:()=>GetBankById(parseInt(id)),
    enabled:!!id
  });
  const onSubmit =()=>{}

  if(isError) return <Error/>
  const form =  <div className="mt-10">
  <h1 className="text-xl font-bold">Bank Setup</h1>
  <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
    
    <div className="">
     
          <div  className="flex  items-center gap-6 ">
            <div className="">
              <label htmlFor="bankName" className="labelText">
                Bank Name
              </label>
              <input
                id="bankName"
                type="text"
                className="inputStyle"
                placeholder="Bank Name"
                {...register(`bankName`, {
                  required: "Bank Name is required",
                })}
              />
            </div>
          </div>
      
    </div>
    <div className="flex gap-6 my-4">
      <button
        className="cancelButton"
        onClick={(e) => {
          e.preventDefault();
          router.push(".");
        }}
      >
        Cancel
      </button>
      <button
        className="submitButton"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting" : "Save"}
      </button>
    </div>
  </form>
</div>

  return (
    <>
    { isLoading ? <Loader/> : form }
    </>
  )
}

export default EditBank;
