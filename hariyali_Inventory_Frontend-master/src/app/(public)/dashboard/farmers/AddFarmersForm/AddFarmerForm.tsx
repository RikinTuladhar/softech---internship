"use client";

import React, { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { GetHariyaliProject } from "@/src/services/apiService/layerSetup/project/projectServices";
import {
  GetBusinessManager,
  GetBusinessManagerById,
} from "@/src/services/apiService/layerSetup/businessManager/businessManagerServices";
import {
  GetFarmerGroup,
  GetFarmerGroupById,
} from "@/src/services/apiService/layerSetup/farmerGroup/farmerGroupServices";
import {
  GetState,
  GetDistrict,
  GetPalika,
  GetAllDistrict,
  GetAllPalika,
} from "@/src/services/apiService/setup/Office/OfficeServices";
import { CreateFarmer } from "@/src/services/apiService/layerSetup/farmer/farmerServices";
import { useParams } from "next/navigation";
import Loader from "@/src/components/reusable/Loader";
import ErrorMessage from "@/src/components/reusable/ErrorMessage";
import RequiredField from "@/src/components/reusable/RequiredField";
import { getBank } from "@/src/services/apiService/setup/Bank/BankServices";
import { emailListQuery } from "@/src/services/apiService/setup/user/userServices";
import {
  HariyaliProject,
  BusinessManager,
  State,
  District,
  Palika,
  Bank,
  FarmerGroup,
  Farmer,
} from "@/types/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { meAtom } from "@/src/Recoil/atom";
import { useRecoilValue } from "recoil";

const getHariyaliProject = async () => {
  const { data } = await GetHariyaliProject();
  return data;
};
const getBusinessManager = async () => {
  const { data } = await GetBusinessManager();
  return data;
};
const getFarmerGroup = async () => {
  const { data } = await GetFarmerGroup();
  return data;
};
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
const getBusinssManagerById = async (id: string) => {
  const { data } = await GetBusinessManagerById(id);
  return data;
};
const getFarmerGroupById = async (id: string) => {
  const { data } = await GetFarmerGroupById(id);
  return data;
};
function AddFarmerForm({ clickedIdData }: { clickedIdData?: Farmer }) {
  const meValue = useRecoilValue(meAtom);
  const router = useRouter();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({});
  const watchFields = watch();
  const {
    data: project,
    isError,
    isLoading: ProjectLoading,
  } = useQuery({
    queryKey: ["project"],
    queryFn: getHariyaliProject,
  });
  const { data: businessManager, isLoading: BusinessManagerLoading } = useQuery(
    {
      queryKey: ["businessManager"],
      queryFn: getBusinessManager,
    }
  );
  const { data: emailList } = useQuery({
    queryKey: ["emailList"],
    queryFn: emailListQuery,
  });
  const { data: farmerGroup, isLoading: FarmerGroupLoading } = useQuery({
    queryKey: ["farmerGroup"],
    queryFn: getFarmerGroup,
  });
  const { data: state, isLoading: StateLoading } = useQuery({
    queryKey: ["state"],
    queryFn: getState,
  });
  const { data: district } = useQuery({
    queryKey: ["district", watchFields.stateId],
    queryFn: () => getDistrict(watchFields?.stateId),
    enabled: !!watchFields?.stateId,
  });
  const { data: palika } = useQuery({
    queryKey: ["palika"],
    queryFn: () => getPalika(watchFields?.districtId),
    enabled: !!watchFields?.districtId,
  });
  const { data: allDistrict, isLoading: AllDistrictLoading } = useQuery({
    queryKey: ["allDistrict"],
    queryFn: getAllDistrict,
  });
  const { data: allPalika, isLoading: AllPalikaLoading } = useQuery({
    queryKey: ["allPalika"],
    queryFn: getAllPalika,
  });
  const { data: bankList, isLoading: bankLoading } = useQuery({
    queryKey: ["bank"],
    queryFn: GetBank,
  });

  const { data: managerById, isLoading: managerByIdLoading } = useQuery({
    queryKey: ["managerById", meValue.id],
    queryFn: () => getBusinssManagerById(meValue?.id),
    enabled: !!meValue?.id && meValue?.role === "businessManager",
  });
  const { data: groupById, isLoading: groupByIdLoading } = useQuery({
    queryKey: ["groupById", meValue.id],
    queryFn: () => getFarmerGroupById(meValue?.id),
    enabled: !!meValue?.id && meValue?.role === "farmerGroup",
  });

  const projectOptions = project?.map(
    (item: HariyaliProject, index: number) => {
      return (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      );
    }
  );
  const managerOptions = businessManager?.map(
    (item: BusinessManager, index: number) => {
      return (
        <option key={index} value={item.id}>
          {item.businessManagerName}
        </option>
      );
    }
  );
  const farmerGroupOptions = farmerGroup?.map(
    (item: FarmerGroup, index: number) => {
      return (
        <option key={index} value={item.id}>
          {item.groupName}
        </option>
      );
    }
  );
  const stateOptions = state?.map((item: State, index: number) => {
    return (
      <option key={index} value={item.StateId}>
        {item.StateName}
      </option>
    );
  });
  const districtOptions = district?.map((item: District, index: number) => {
    return (
      <option key={index} value={item.DistrictId}>
        {item.DistrictName}
      </option>
    );
  });
  const palikaOptions = palika?.map((item: Palika, index: number) => {
    return (
      <option key={index} value={item.PalikaId}>
        {item.PalikaName}
      </option>
    );
  });
  const allDistrictOptions = allDistrict?.map(
    (item: District, index: number) => {
      return (
        <option key={index} value={item.DistrictId}>
          {item.DistrictName}
        </option>
      );
    }
  );
  const allPalikaOptions = allPalika?.map((item: Palika, index: number) => {
    return (
      <option key={index} value={item.PalikaId}>
        {item.PalikaName}
      </option>
    );
  });
  const bankOptions = bankList?.map((item: Bank, index: number) => {
    return (
      <option key={index} value={item.id}>
        {item.bankName}
      </option>
    );
  });
  useEffect(() => {
    if (clickedIdData) {
      setValue("id", clickedIdData?.id);
      setValue("fiscalYearId", clickedIdData?.fiscalYearId);
      setValue("userId", clickedIdData?.userId);
      setValue("hariyaliProjectId", clickedIdData?.hariyaliProjectId);
      setValue("businessManagerId", clickedIdData?.businessManagerId);
      setValue("farmarGroupId", clickedIdData?.farmarGroupId);
      setValue("farmarName", clickedIdData?.farmarName);
      setValue("contactNumber", clickedIdData?.contactNumber);
      setValue("email", clickedIdData?.email);
      setValue("pan_vat", clickedIdData?.pan_vat);
      setValue("stateId", clickedIdData?.stateId);
      setValue("districtId", clickedIdData?.districtId);
      setValue("palikaId", clickedIdData?.palikaId);
      setValue("ward", clickedIdData?.ward);
      setValue("tole", clickedIdData?.tole);
      setValue("houseNo", clickedIdData?.houseNo);
      setValue("areaInsqkm", clickedIdData?.areaInsqkm);
      setValue("lat", clickedIdData?.lat);
      setValue("long", clickedIdData?.long);
      setValue("bankId", clickedIdData?.bankId);
      setValue("accountNo", clickedIdData?.accountNo);
    }
  }, [clickedIdData, setValue]);
  useEffect(() => {
    if (meValue?.role === "project") {
      setValue("hariyaliProjectId", meValue?.id);
    }
  }, [setValue, meValue]);
  useEffect(() => {
    if (meValue?.role === "businessManager") {
      setValue("businessManagerId", managerById?.id);
      setValue("hariyaliProjectId", managerById?.projectId);
    }
  }, [setValue, meValue]);
  useEffect(() => {
    if (meValue?.role === "farmerGroup") {
      setValue("businessManagerId", groupById?.managerId);
      setValue("hariyaliProjectId", groupById?.projectId);
      setValue("farmarGroupId", groupById?.id);
    }
  }, [setValue, meValue]);
  const onSubmit = async (data: FieldValues) => {
    try {
      const { status } = await CreateFarmer(data);
      if (status === 200) {
        router.push("/dashboard/farmers");
        toast.success("Farmer created successfully");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const table = (
    <div className="flex flex-col shadow-lg mb-6  ">
      <main className="flex  flex-col px-5 py-4 ">
        <h1 className="text-2xl font-bold mb-5">Farmers</h1>
        <div className="">
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className=" ">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Name <RequiredField />
                </label>
                <select
                  className="inputStyle"
                  {...register("hariyaliProjectId", {
                    required: "Project is required",
                  })}
                >
                  <option value="" selected disabled>
                    --Select Project--
                  </option>
                  {projectOptions}
                </select>
                {errors?.hariyaliProjectId && (
                  <ErrorMessage message={errors.hariyaliProjectId.message} />
                )}
              </div>
              <div className=" ">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Business Manager Name <RequiredField />
                </label>
                <select
                  className="inputStyle"
                  {...register("businessManagerId", {
                    required: "Business Manager is required",
                  })}
                >
                  <option value="" selected disabled>
                    --Select Business Manager--
                  </option>
                  {managerOptions}
                </select>
                {errors?.businessManagerId && (
                  <ErrorMessage message={errors.businessManagerId.message} />
                )}
              </div>
              <div className=" ">
                <label
                  htmlFor="district"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Farmer Group <RequiredField />
                </label>
                <select
                  className="inputStyle"
                  {...register("farmarGroupId", {
                    required: "Farmer group is required",
                  })}
                >
                  <option value="" selected disabled>
                    --Select Farmer--
                  </option>
                  {farmerGroupOptions}
                </select>
                {errors?.farmarGroupId && (
                  <ErrorMessage message={errors.farmarGroupId.message} />
                )}
              </div>
              {/* Name */}
              <div className="">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Farmer Name <RequiredField />
                </label>
                <input
                  type="text"
                  {...register("farmarName", {
                    required: "Farmer Name is required",
                  })}
                  className="inputStyle"
                  placeholder="Farmer Name"
                />
                {errors?.farmarName && (
                  <ErrorMessage message={errors.farmarName.message} />
                )}
              </div>

              {/* Number */}
              <div className="">
                <label
                  htmlFor="number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contact Number <RequiredField />
                </label>
                <input
                  type="text"
                  {...register("contactNumber", {
                    required: "Contact number is required",
                  })}
                  className="inputStyle"
                  placeholder="Contact Number"
                />
                {errors?.contactNumber && (
                  <ErrorMessage message={errors.contactNumber.message} />
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
                  {...register("email", { required: "Email is required" })}
                  className="inputStyle"
                  placeholder="Email"
                />
                {!id && emailList?.includes(watch("email")) && (
                  <ErrorMessage
                    message={"User already exist with this email"}
                  />
                )}
                {errors?.email && (
                  <ErrorMessage message={errors.email.message} />
                )}
              </div>
              {/* PAN/VAT Number */}
              <div className=" ">
                <label
                  htmlFor="panVatNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  PAN/VAT Number
                </label>
                <input
                  type="text"
                  {...register("pan_vat")}
                  className="inputStyle"
                  placeholder="PAN/VAT Number"
                />
              </div>

              {/* Pradesh */}
              <div>
                <label htmlFor="" className="labelText">
                  State <RequiredField />{" "}
                </label>
                <select
                  {...register("stateId", {
                    required: "State is required ",
                    valueAsNumber: true,
                  })}
                  className="inputStyle"
                >
                  <option selected disabled value={""}>
                    {" "}
                    -- Select State --{" "}
                  </option>
                  {stateOptions}
                </select>
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
                  {...register("districtId", {
                    required: "District is required",
                    valueAsNumber: true,
                  })}
                  className="inputStyle"
                >
                  <option value="" selected disabled>
                    --Select District--
                  </option>
                  {id ? allDistrictOptions : districtOptions}
                </select>
                {errors?.districtId && (
                  <ErrorMessage message={errors.districtId.message} />
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
                  {...register("palikaId", {
                    required: "Palika is required",
                    valueAsNumber: true,
                  })}
                  className="inputStyle"
                >
                  <option value="" selected disabled>
                    --Select Palika--
                  </option>
                  {id ? allPalikaOptions : palikaOptions}
                </select>
                {errors?.palikaId && (
                  <ErrorMessage message={errors.palikaId.message} />
                )}
              </div>
              {/* Ward Number */}
              <div className="">
                <label
                  htmlFor="wardNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ward <RequiredField />
                </label>
                <input
                  type="text"
                  {...register("ward", { required: "Ward is required" })}
                  className="inputStyle"
                  placeholder="Ward"
                />
                {errors?.ward && <ErrorMessage message={errors.ward.message} />}
              </div>
              {/* Tole Number */}
              <div className="">
                <label
                  htmlFor="toleNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tole
                </label>
                <input
                  type="text"
                  {...register("tole")}
                  className="inputStyle"
                  placeholder="Tole"
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
                  {...register("houseNo")}
                  className="inputStyle"
                  placeholder="House No."
                />
              </div>
              <div className="">
                <label
                  htmlFor="wardNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Area in sq Km <RequiredField />
                </label>
                <input
                  type="number"
                  {...register("areaInsqkm", {
                    required: "Area is required",
                    valueAsNumber: true,
                  })}
                  className="inputStyle"
                  placeholder="area in sq km."
                />
                {errors?.areaInsqkm && (
                  <ErrorMessage message={errors.areaInsqkm.message} />
                )}
              </div>
              <div className="">
                <label
                  htmlFor="wardNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Latitude <RequiredField />
                </label>
                <input
                  type="text"
                  {...register("lat", { required: "Latitude is required" })}
                  className="inputStyle"
                  placeholder="Latitude"
                />
                {errors?.lat && <ErrorMessage message={errors.lat.message} />}
              </div>
              <div className="">
                <label
                  htmlFor=""
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Longitude <RequiredField />
                </label>
                <input
                  type="text"
                  {...register("long", { required: "Longitude is required" })}
                  className="inputStyle"
                  placeholder="Longitude"
                />
                {errors?.long && <ErrorMessage message={errors.long.message} />}
              </div>
              {id ? (
                <></>
              ) : (
                <div className="">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password <RequiredField />
                  </label>
                  <input
                    type="text"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="inputStyle"
                    placeholder="password"
                  />
                  {errors?.password && (
                    <ErrorMessage message={errors.password.message} />
                  )}
                </div>
              )}
            </div>
            <div className="mt-6">
              <h1 className="font-bold text-xl">Bank Details</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="">
                    Bank Name <RequiredField />
                  </label>
                  <select
                    {...register("bankId", {
                      required: "Bank is required",
                      valueAsNumber: true,
                    })}
                    className="inputStyle"
                  >
                    <option value="" selected disabled>
                      --Select Bank--
                    </option>
                    {bankOptions}
                  </select>
                  {errors?.bankId && (
                    <ErrorMessage message={errors.bankId.message} />
                  )}
                </div>
                <div>
                  <label htmlFor="">
                    Account Number <RequiredField />
                  </label>
                  <input
                    type="text"
                    className="inputStyle"
                    {...register("accountNo", {
                      required: "Account number is required",
                    })}
                  />
                  {errors?.accountNo && (
                    <ErrorMessage message={errors.accountNo.message} />
                  )}
                </div>
              </div>
            </div>
            <div className="sm:col-start-1 mt-6 flex items-end justify-start gap-x-6">
              <button
                type="button"
                className="cancelButton"
                onClick={() => router.push(id ? ".." : ".")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submitButton"
                disabled={
                  isSubmitting || (!id && emailList?.includes(watch("email")))
                }
              >
                {isSubmitting ? "Submitting..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
  return (
    <>
      {ProjectLoading ||
      BusinessManagerLoading ||
      FarmerGroupLoading ||
      StateLoading ||
      AllDistrictLoading ||
      AllPalikaLoading ||
      bankLoading ||
      managerByIdLoading ||
      groupByIdLoading ? (
        <Loader />
      ) : (
        table
      )}
    </>
  );
}

export default AddFarmerForm;
