"use client";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
//api imports
import { CreateFarmerGroup } from "@/src/services/apiService/layerSetup/farmerGroup/farmerGroupServices";
import { GetHariyaliProject } from "@/src/services/apiService/layerSetup/project/projectServices";
import {
  GetBusinessManager,
  GetBusinessManagerById,
} from "@/src/services/apiService/layerSetup/businessManager/businessManagerServices";
import {
  GetState,
  GetDistrict,
  GetPalika,
  GetAllDistrict,
  GetAllPalika,
} from "@/src/services/apiService/setup/Office/OfficeServices";
import { getBank } from "@/src/services/apiService/setup/Bank/BankServices";
import {
  Bank,
  BusinessManager,
  District,
  FarmerGroup,
  HariyaliProject,
  Palika,
  State,
} from "@/types/types";
import { emailListQuery } from "@/src/services/apiService/setup/user/userServices";

//components import
import RequiredField from "@/src/components/reusable/RequiredField";
import ErrorMessage from "@/src/components/reusable/ErrorMessage";
import Loader from "@/src/components/reusable/Loader";
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
const GetBank = async () => {
  const { data } = await getBank();
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
const getBusinessManagerById = async (id: string) => {
  const { data } = await GetBusinessManagerById(id);
  return data;
};

function AddFarmerGroup({ clickedIdData }: { clickedIdData?: FarmerGroup }) {
  const meValue = useRecoilValue(meAtom);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  const watchFields = watch();
  const { id } = useParams();
  const router = useRouter();
  const {
    data: project,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["project"],
    queryFn: getHariyaliProject,
  });
  const {
    data: businessManager,
    isError: businessManagerError,
    isLoading: businessManagerLoading,
  } = useQuery({
    queryKey: ["businessManager"],
    queryFn: getBusinessManager,
  });

  const { data: state, isLoading: stateLoading } = useQuery({
    queryKey: ["state"],
    queryFn: getState,
  });
  const { data: district } = useQuery({
    queryKey: ["district", watchFields?.stateId],
    queryFn: () => getDistrict(watchFields?.stateId),
    enabled: !!watchFields?.stateId,
  });
  const { data: palika } = useQuery({
    queryKey: ["paliak", watchFields?.districtId],
    queryFn: () => getPalika(watchFields?.districtId),
    enabled: !!watchFields?.districtId,
  });
  const { data: allDistrict, isLoading: allDistrictLoading } = useQuery({
    queryKey: ["allDistrict"],
    queryFn: getAllDistrict,
  });
  const { data: allPalika, isLoading: allPalikaLoading } = useQuery({
    queryKey: ["allPalika"],
    queryFn: getAllPalika,
  });

  const { data: bankList, isLoading: bankLoading } = useQuery({
    queryKey: ["bank"],
    queryFn: GetBank,
  });
  const { data: emailList } = useQuery({
    queryKey: ["emailList"],
    queryFn: emailListQuery,
  });
  //dropdown options
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
      <option value={item.PalikaId} key={index}>
        {item.PalikaName}
      </option>
    );
  });

  const bankOptions = bankList?.map((item: Bank, index: number) => {
    return (
      <option value={item.id} key={index}>
        {item.bankName}
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

  const {
    data: BusinessManagerById,
    isError: BusinessManagerByIdError,
    isLoading: BusinessManagerByIdLoading,
  } = useQuery({
    queryKey: ["managerById", meValue?.id],
    queryFn: () => getBusinessManagerById(meValue?.id),
    enabled: !!meValue?.id && meValue?.role === "businessManager",
  });

  useEffect(() => {
    if (meValue?.role === "project") {
      setValue("projectId", meValue?.id);
    }
  }, [meValue, setValue]);
  useEffect(() => {
    if (meValue?.role === "businessManager") {
      setValue("projectId", BusinessManagerById?.projectId);
      setValue("managerId", BusinessManagerById?.id);
    }
  }, [meValue, setValue]);

  useEffect(() => {
    if (clickedIdData) {
      setValue("id", clickedIdData?.id);
      setValue("projectId", clickedIdData?.projectId);
      setValue("managerId", clickedIdData?.managerId);
      setValue("groupName", clickedIdData?.groupName);
      setValue("contactNo", clickedIdData?.contactNo);
      setValue("email", clickedIdData?.email);
      setValue("pan_vat", clickedIdData?.pan_vat);
      setValue("stateId", clickedIdData?.stateId);
      setValue("districtId", clickedIdData?.districtId);
      setValue("palikaId", clickedIdData?.palikaId);
      setValue("ward", clickedIdData?.ward);
      setValue("tole", clickedIdData?.tole);
      setValue("houseNo", clickedIdData?.houseNo);
      setValue("bankId", clickedIdData?.bankId);
      setValue("accountNo", clickedIdData?.accountNo);
      setValue("isActive", clickedIdData?.isActive);
      setValue("isDeleted", clickedIdData?.isDeleted);
    }
  }, [clickedIdData, setValue]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const { status } = await CreateFarmerGroup(data);
      if (status === 200) {
        router.push("/dashboard/farmer-group");
        toast.success("Farmer Group created Successfully");
      }
    } catch (error) {
      toast.error("Farmer Group creation failed");
    }
  };

  const table = (
    <div className=" shadow-lg mb-6  ">
      <main className=" px-5 py-4 ">
        <h1 className="text-2xl font-bold mb-5">Farmer Group</h1>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className=" ">
              <label
                htmlFor="projectChiefName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Project Name <RequiredField />
              </label>
              <select
                className="inputStyle"
                {...register("projectId", { required: "Project is required" })}
              >
                <option value="">-- Select Project --</option>
                {projectOptions}
              </select>
              {errors.projectId && (
                <ErrorMessage message={errors.projectId.message} />
              )}
            </div>
            <div className=" ">
              <label
                htmlFor="projectChiefName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Business Manager Name <RequiredField />
              </label>
              <select
                className="inputStyle"
                {...register("managerId", {
                  required: "Business Manager is required",
                })}
              >
                <option value="">--Select Business Manager--</option>
                {managerOptions}
              </select>
              {errors.managerId && (
                <ErrorMessage message={errors.managerId.message} />
              )}
            </div>
            {/* Name */}
            <div className="">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Group Name <RequiredField />
              </label>
              <input
                type="text"
                id="name"
                className="inputStyle"
                placeholder="Group name"
                {...register("groupName", {
                  required: "Group Name is required",
                })}
              />
              {errors.groupName && (
                <ErrorMessage message={errors.groupName.message} />
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
                type="number"
                {...register("contactNo", {
                  required: "Contact Number is required",
                })}
                className="inputStyle"
                placeholder="Contact Number"
              />
              {errors.contactNo && (
                <ErrorMessage message={errors.contactNo.message} />
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
                readOnly={id ? true : false}
              />
              {!id && emailList?.includes(watch("email")) && (
                <ErrorMessage message={"User with this email already exist"} />
              )}
              {errors.email && <ErrorMessage message={errors.email.message} />}
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
                id="panVatNumber"
                name="panVatNumber"
                className="inputStyle"
                placeholder="PAN/VAT Number"
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
                className="inputStyle"
                {...register("stateId", {
                  required: "State is required",
                  valueAsNumber: true,
                })}
              >
                <option value="">--Select State--</option>
                {stateOptions}
              </select>
              {errors.stateId && (
                <ErrorMessage message={errors.stateId.message} />
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
                className="inputStyle"
                {...register("districtId", {
                  required: "District is required",
                  valueAsNumber: true,
                })}
              >
                <option value="">--Select District--</option>
                {id ? allDistrictOptions : districtOptions}
              </select>
              {errors.districtId && (
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
                className="inputStyle"
                {...register("palikaId", {
                  required: "Palika is required",
                  valueAsNumber: true,
                })}
              >
                <option value="">--Select Palika--</option>
                {id ? allPalikaOptions : palikaOptions}
              </select>
              {errors.palikaId && (
                <ErrorMessage message={errors.palikaId.message} />
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
                {...register("ward", { required: "Ward is required" })}
                className="inputStyle"
                placeholder="ward "
              />
              {errors.ward && <ErrorMessage message={errors.ward.message} />}
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
                id="toleNumber"
                className="inputStyle"
                placeholder="tole"
                {...register("tole")}
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
                {...register("houseNo")}
                className="inputStyle"
                placeholder="House No."
              />
            </div>
            {!id ? (
              <div className="">
                <label
                  htmlFor="houseNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password <RequiredField />
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="inputStyle"
                  placeholder="password"
                />
                {errors.password && (
                  <ErrorMessage message={errors.password.message} />
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="mt-3">
            <h1 className="text-xl font-bold pb-3"> Bank Details</h1>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <label htmlFor="">
                  Bank Name <RequiredField />{" "}
                </label>
                <select
                  id=""
                  className="inputStyle"
                  {...register("bankId", {
                    required: "Bank Name is required",
                    valueAsNumber: true,
                  })}
                >
                  <option value="">--Select Bank--</option>
                  {bankOptions}
                </select>
                {errors.bankId && (
                  <ErrorMessage message={errors.bankId.message} />
                )}
              </div>
              <div>
                <label>
                  Account Number <RequiredField />
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  placeholder="Account Number"
                  {...register("accountNo", {
                    required: "Account number is required",
                  })}
                />
                {errors.accountNo && (
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
      </main>
    </div>
  );
  return (
    <>
      {isLoading ||
      stateLoading ||
      allDistrictLoading ||
      allPalikaLoading ||
      bankLoading ||
      businessManagerLoading ||
      BusinessManagerByIdLoading ? (
        <Loader />
      ) : (
        table
      )}
    </>
  );
}

export default AddFarmerGroup;
