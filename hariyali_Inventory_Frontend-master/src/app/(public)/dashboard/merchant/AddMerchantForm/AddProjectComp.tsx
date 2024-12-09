"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import RequiredField from "@/src/components/reusable/RequiredField";
import ErrorMessage from "@/src/components/reusable/ErrorMessage";
import { HariyaliProject, State, District, Palika, Bank } from "@/types/types";
import { CreateHariyaliProject } from "@/src/services/apiService/layerSetup/project/projectServices";
import { useQuery } from "@tanstack/react-query";
import { nameListQuery , emailListQuery} from '@/src/services/apiService/setup/user/userServices'
import {
  GetDistrict,
  GetState,
  GetPalika,
  GetAllDistrict,
  GetAllPalika,
} from "@/src/services/apiService/setup/Office/OfficeServices";
import { getBank } from "@/src/services/apiService/setup/Bank/BankServices";
import { useParams } from "next/navigation";
const getState = async () => {
  const { data } = await GetState();
  return data;
};
const getDistrict = async (id: number) => {
  const { data } = await GetDistrict(id);
  return data;
};

const getPalika = async (id: number) => {
  const { data } = await GetPalika(id);
  return data;
};
const getAllDistrict = async () => {
  const { data } = await GetAllDistrict();
  return data;
};
const getAllPalika = async () => {
  const { data } = await GetAllPalika();
  return data;
};
const GetBank = async () => {
  const { data } = await getBank();
  return data;
};
const AddMerchantForm = ({
  clickedDataId,
}: {
  clickedDataId?: HariyaliProject;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  const router = useRouter();
  const watchFields = watch();
  const { id } = useParams();
  const { data: stateList, isLoading } = useQuery({
    queryKey: ["state"],
    queryFn: getState,
  });
  const stateOptions = stateList?.map((item: State, index: number) => {
    return (
      <option value={item.StateId} key={index}>
        {item.StateName}
      </option>
    );
  });
  const { data: districtList } = useQuery({
    queryKey: ["district", watchFields.stateId],
    queryFn: () => getDistrict(watchFields.stateId),
    enabled: !!watchFields.stateId,
  });
  const districtOptions = districtList?.map((item: District, index: number) => {
    return (
      <option value={item.DistrictId} key={index}>
        {item.DistrictName}
      </option>
    );
  });
  const { data: palikaList } = useQuery({
    queryKey: ["district", watchFields.districtId],
    queryFn: () => getPalika(watchFields.districtId),
    enabled: !!watchFields.districtId,
  });

  const palikaOptions = palikaList?.map((item: Palika, index: number) => {
    return (
      <option value={item.PalikaId} key={index}>
        {item.PalikaName}
      </option>
    );
  });
  const {data:nameList}= useQuery({
    queryKey:['userlist'],
    queryFn:nameListQuery,
  })
  const {data:emailList} = useQuery({
    queryKey:['emailList'],
    queryFn:emailListQuery
  })

  const { data: BankList } = useQuery({
    queryKey: ["bank"],
    queryFn: GetBank,
  });

  const bankOptions = BankList?.map((item: Bank, index: number) => {
    return (
      <option value={item.id} key={index}>
        {item.bankName}
      </option>
    );
  });

  const { data: AllDistrict } = useQuery({
    queryKey: ["allDistrict"],
    queryFn: getAllDistrict,
  });
  const allDistrictOptions = AllDistrict?.map(
    (item: District, index: number) => {
      return (
        <option value={item.DistrictId} key={index}>
          {item.DistrictName}
        </option>
      );
    },
  );

  const { data: AllPalika } = useQuery({
    queryKey: ["allPalika"],
    queryFn: getAllPalika,
  });
  const allPalikaOptions = AllPalika?.map((item: Palika, index: number) => {
    return (
      <option value={item.PalikaId} key={index}>
        {item.PalikaName}
      </option>
    );
  });

  useEffect(() => {
    if (clickedDataId) {
      setValue("id", clickedDataId?.id);
      setValue("name", clickedDataId?.name);
      setValue("chiefName", clickedDataId?.chiefName);
      setValue("email", clickedDataId?.email);
      setValue("contactNumber", clickedDataId?.contactNumber);
      setValue("vat_pan", clickedDataId?.vat_pan);
      setValue("stateId", clickedDataId?.stateId);
      setValue("districtId", clickedDataId?.districtId);
      setValue("palikaId", clickedDataId?.palikaId);
      setValue("ward", clickedDataId?.ward);
      setValue("tole", clickedDataId?.tole);
      setValue("houseNo", clickedDataId?.houseNo);
      setValue("bankId", clickedDataId?.bankId);
      setValue("accountNumber", clickedDataId?.accountNumber);
    }
  }, [clickedDataId, setValue]);

  const onSubmit = async (data: FieldValues) => {
    data = {
      ...data,
    };
    console.log(data);
    try {
      const { status } = await CreateHariyaliProject(data);
      if (status === 200) {
        router.push("/dashboard/merchant");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col shadow-md px-8 ">
      <main className=" py-10 ">
        <h1 className="text-2xl font-bold my-5">Hariyali Project</h1>
        <div className=" ">
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className=" grid md:grid-cols-3 grid-cols-1 gap-8 w-full pr-5 ">
              {/* Name */}
              <div className="">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Name <RequiredField />
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Project Name is required",
                  })}
                  placeholder={"Project Name"}
                  id="name"
                  className={`inputStyle ${id?"cursor-not-allowed":''}`}
                  readOnly={id ? true : false}
                />
                {
                  (!id && nameList?.includes(watch('name'))) && <ErrorMessage message={'User with this name already exist'} />
                }
                {errors.name && (
                  <ErrorMessage message={errors?.name?.message} />
                )}
              </div>

              {/* Project Chief Name */}
              <div className="">
                <label
                  htmlFor="projectChiefName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Chief Name <RequiredField />
                </label>
                <input
                  type="text"
                  id="projectChiefName"
                  {...register("chiefName", {
                    required: "Project Chief Name is required",
                  })}
                  placeholder={"Chief Name"}
                  className="inputStyle"
                />
                {errors.chiefName && (
                  <ErrorMessage message={errors?.chiefName?.message} />
                )}
              </div>

              {/* Email */}
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email <RequiredField />
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder={"Email"}
                  readOnly={id ? true : false}
                  className={`inputStyle ${id?"cursor-not-allowed":''}`}
                />
                {
                 !id && emailList?.includes(watch('email')) && <ErrorMessage message={'User with this email already exist'}  />
                }

                {errors.email && (
                  <ErrorMessage message={errors?.email?.message} />
                )}
              </div>
              {/* contact number  */}
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contact Number <RequiredField />
                </label>
                <input
                  type="text"
                  id="number"
                  {...register("contactNumber", {
                    required: "Contact no. is required",
                  })}
                  className="inputStyle"
                  placeholder={"Contact Number"}
                />
                {errors.contactNumber && (
                  <ErrorMessage message={errors?.contactNumber?.message} />
                )}
              </div>
              {/* PAN/VAT Number */}
              <div className="">
                <label
                  htmlFor="panVatNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  PAN/VAT Number
                </label>
                <input
                  type="text"
                  id="panVatNumber"
                  {...register("vat_pan")}
                  className="inputStyle"
                  placeholder={"PAN/VAT Number"}
                />
              </div>

              {/* Pradesh */}
              <div className="">
                <label
                  htmlFor="pradesh"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State <RequiredField />
                </label>
                <select
                  id="pradesh"
                  className="inputStyle"
                  {...register(`stateId`, {
                    required: "State is required",
                    valueAsNumber: true,
                  })}
                >
                  <option value="" selected disabled>
                    -- Select State --
                  </option>
                  {stateOptions}
                </select>
                {errors?.stateId && (
                  <ErrorMessage message={errors?.stateId?.message} />
                )}
              </div>
              {/* District */}
              <div className=" ">
                <label
                  htmlFor="district"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  District <RequiredField />
                </label>
                <select
                  id="district"
                  {...register(`districtId`, {
                    required: "District is required",
                    valueAsNumber: true,
                  })}
                  className="inputStyle"
                >
                  <option value="" selected disabled>
                    -- Select District --
                  </option>
                  {!id ? districtOptions : allDistrictOptions}
                </select>
                {errors?.districtId && (
                  <ErrorMessage message={errors?.districtId?.message} />
                )}
              </div>
              {/* Nagar Palika */}
              <div className="">
                <label
                  htmlFor="nagarPalika"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Palika <RequiredField />
                </label>
                <select
                  id="nagarPalika"
                  {...register(`palikaId`, {
                    required: "Palika is required",
                    valueAsNumber: true,
                  })}
                  className="inputStyle"
                >
                  <option value="" selected disabled>
                    -- Select Palika --
                  </option>
                  {!id ? palikaOptions : allPalikaOptions}
                </select>
                {errors.palikaId && (
                  <ErrorMessage message={errors?.palikaId?.message} />
                )}
              </div>
              {/* Ward Number */}
              <div className="">
                <label
                  htmlFor="wardNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ward Number <RequiredField />
                </label>
                <input
                  type="text"
                  id="wardNumber"
                  {...register(`ward`, {
                    required: "Ward is required",
                  })}
                  className="inputStyle"
                  placeholder={"Ward Number"}
                />
                {errors.ward && (
                  <ErrorMessage message={errors?.ward?.message} />
                )}
              </div>
              {/* Tole Number */}
              <div className="">
                <label
                  htmlFor="toleNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tole Number
                </label>
                <input
                  type="text"
                  id="toleNumber"
                  {...register(`tole`)}
                  placeholder="Tole Number"
                  className="inputStyle"
                />
              </div>
              {/* House Number */}
              <div className="">
                <label
                  htmlFor="houseNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  House Number
                </label>
                <input
                  type="text"
                  id="houseNumber"
                  {...register(`houseNo`)}
                  placeholder={"House Number"}
                  className="inputStyle"
                />
              </div>
              {!id ? (
                <div className="">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password <RequiredField />
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    placeholder={"password"}
                    className="inputStyle"
                  />
                  {errors?.password && (
                    <ErrorMessage message={errors?.password?.message} />
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="mt-6 ">
              <h1 className="text-xl font-bold">Bank Details</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Bank Name */}
                <div className="">
                  <label htmlFor="bankName" className=" text-sm text-gray-900">
                    Bank Name <RequiredField />
                  </label>
                  <select
                    id="bankName"
                    {...register("bankId", {
                      required: "Bank Name is required",
                      valueAsNumber: true,
                    })}
                    className="inputStyle"
                  >
                    <option value="" selected={true} disabled>
                      -- Select Bank Name --
                    </option>
                    {bankOptions}
                  </select>
                  {errors.bankId && (
                    <ErrorMessage message={errors?.bankId?.message} />
                  )}
                </div>
                <div className="">
                  <label htmlFor="bankName" className=" text-sm text-gray-900">
                    Account Number <RequiredField />
                  </label>
                  <input
                    type="text"
                    className="inputStyle"
                    {...register("accountNumber", {
                      required: "Account Number is required",
                    })}
                  />
                  {errors.accountNumber && (
                    <ErrorMessage message={errors?.accountNumber?.message} />
                  )}
                </div>
              </div>
            </div>

            <div className="sm:col-start-1 mt-6 flex items-end justify-start gap-x-6">
              <button
                type="button"
                className={"cancelButton"}
                onClick={() => router.push("/dashboard/merchant")}
              >
                Cancel
              </button>
              <button type="submit" className="submitButton" disabled={isSubmitting ||(!id && nameList?.includes(watch('name'))) ||(!id && emailList?.includes(watch('email'))) } >
                {isSubmitting ? "submitting ..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddMerchantForm;
