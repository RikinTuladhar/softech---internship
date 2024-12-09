"use client";
import React, { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import RequiredField from "@/src/components/reusable/RequiredField";
import ErrorMessage from "@/src/components/reusable/ErrorMessage";
import Loader from "@/src/components/reusable/Loader";
import Error from "@/src/components/reusable/Error";
import { useQuery } from "@tanstack/react-query";
import {
  GetAllDistrict,
  GetAllPalika,
  GetPalika,
  GetDistrict,
  GetState,
} from "@/src/services/apiService/setup/Office/OfficeServices";
import {
  GetHariyaliProject,
  GetHariyaliProjectById,
} from "@/src/services/apiService/layerSetup/project/projectServices";
import { getBank } from "@/src/services/apiService/setup/Bank/BankServices";
import { CreateBusinessManager } from "@/src/services/apiService/layerSetup/businessManager/businessManagerServices";
import { emailListQuery } from "@/src/services/apiService/setup/user/userServices";
import {
  State,
  District,
  Palika,
  HariyaliProject,
  Bank,
  BusinessManager,
} from "@/types/types";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { meAtom } from "@/src/Recoil/atom";
import { useRecoilValue } from "recoil";

const getAllDistrict = async () => {
  const { data } = await GetAllDistrict();
  return data;
};
const getAllPalika = async () => {
  const { data } = await GetAllPalika();
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
const getHariyaliProject = async () => {
  const { data } = await GetHariyaliProject();
  return data;
};
const GetBank = async () => {
  const { data } = await getBank();
  return data;
};
const getHariyaliProjectById = async (id: string) => {
  const { data } = await GetHariyaliProjectById(id);
  return data;
};
const AddMerchantForm = ({
  clickedIdData,
}: {
  clickedIdData?: BusinessManager;
}) => {
  const { id } = useParams();
  const meValue = useRecoilValue(meAtom);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm();
  const router = useRouter();
  const watchFields = watch();
  //fetching
  const {
    data: State,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["state"],
    queryFn: getState,
  });
  const stateOptions = State?.map((item: State, index: number) => {
    return (
      <option key={index} value={item.StateId}>
        {item.StateName}
      </option>
    );
  });
  const { data: emailList } = useQuery({
    queryKey: ["emailList"],
    queryFn: emailListQuery,
  });
  const { data: District } = useQuery({
    queryKey: ["district", watchFields.stateId],
    queryFn: () => getDistrict(watchFields.stateId),
    enabled: !!watchFields.stateId,
  });

  const districtOptions = District?.map((item: District, index: number) => {
    return (
      <option key={index} value={item.DistrictId}>
        {item.DistrictName}
      </option>
    );
  });

  const { data: Palika } = useQuery({
    queryKey: ["palika", watchFields.districtId],
    queryFn: () => getPalika(watchFields.districtId),
    enabled: !!watchFields.districtId,
  });

  const palikaOptions = Palika?.map((item: Palika, index: number) => {
    return (
      <option key={index} value={item.PalikaId}>
        {item.PalikaName}
      </option>
    );
  });

  const { data: AllDistrict } = useQuery({
    queryKey: ["allDistrict"],
    queryFn: () => getAllDistrict(),
  });
  const allDistrictOptions = AllDistrict?.map(
    (item: District, index: number) => {
      return (
        <option key={index} value={item.DistrictId}>
          {item.DistrictName}
        </option>
      );
    }
  );
  const { data: AllPalika } = useQuery({
    queryKey: ["allPalika"],
    queryFn: getAllPalika,
  });
  const allPaliakOptions = AllPalika?.map((item: Palika, index: number) => {
    return (
      <option key={index} value={item.PalikaId}>
        {item.PalikaName}
      </option>
    );
  });

  const { data: Project, isLoading: ProjectLoading } = useQuery({
    queryKey: ["project"],
    queryFn: () => getHariyaliProject(),
  });

  const { data: ProjectById, isLoading: ProjectByIdLoading } = useQuery({
    queryKey: ["projectById", meValue.id],
    queryFn: () => getHariyaliProjectById(meValue.id),
    enabled: !!meValue.id && meValue.role === "project",
  });

  const ProjectOptions = Project?.map(
    (item: HariyaliProject, index: number) => {
      return (
        <option value={item.id} key={index}>
          {item.name}
        </option>
      );
    }
  );
  const { data: Bank } = useQuery({
    queryKey: ["bank"],
    queryFn: () => GetBank(),
  });
  const bankOptions = Bank?.map((item: Bank, index: number) => {
    return (
      <option key={index} value={item.id}>
        {item.bankName}
      </option>
    );
  });

  useEffect(() => {
    setValue("id", clickedIdData?.id);
    setValue("projectId", clickedIdData?.projectId);
    setValue("businessManagerName", clickedIdData?.businessManagerName);
    setValue("contactNo", clickedIdData?.contactNo);
    setValue("email", clickedIdData?.email);
    setValue("pan_vat", clickedIdData?.pan_vat);
    setValue("stateId", clickedIdData?.stateId);
    setValue("districtId", clickedIdData?.districtId);
    setValue("palikaId", clickedIdData?.palikaId);
    setValue("wardNo", clickedIdData?.wardNo);
    setValue("tole", clickedIdData?.tole);
    setValue("houseno", clickedIdData?.houseno);
    setValue("bankId", clickedIdData?.bankId);
    setValue("accountNo", clickedIdData?.accountNo);
  }, [clickedIdData, setValue]);

  useEffect(() => {
    if (meValue?.role === "project") {
      setValue("projectId", ProjectById?.id);
    }
  }, [meValue, setValue]);
  const onSubmit = async (data: FieldValues) => {
    try {
      const { status } = await CreateBusinessManager(data);
      if (status === 200) {
        router.push("/dashboard/entrepreneur");
      }
    } catch (error) {
      toast.error("Error While Creating Business Manager");
    }
  };
  if (isError) return <Error />;
  if (isLoading || ProjectLoading || ProjectByIdLoading) return <Loader />;
  return (
    <div className="flex flex-col shadow-lg mb-6 pr-7 ">
      <main className="flex flex-1 flex-col justify-items-center gap-4 p-4 lg:gap-6 lg:p-6">
        <h1 className="text-2xl font-bold my-5">Business Manager</h1>
        <div className="">
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="grid grid-cols-1 gap-7 gap-x-8 md:grid-cols-3">
              <div className="">
                <label
                  htmlFor="district"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Name <RequiredField />
                </label>
                <select
                  id="district"
                  className="inputStyle"
                  {...register("projectId", {
                    required: "Project is required",
                  })}
                >
                  <option value={""} selected disabled>
                    --Select Project--
                  </option>
                  {ProjectOptions}
                </select>
                {errors?.projectId && (
                  <ErrorMessage message={errors?.projectId.message} />
                )}
              </div>
              {/* Name */}
              <div className="">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Business Manager Name <RequiredField />
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("businessManagerName", {
                    required: "Business Manager Name is required",
                  })}
                  className="inputStyle"
                  placeholder={"Business Manager Name"}
                />
                {errors.businessManagerName && (
                  <ErrorMessage
                    message={errors?.businessManagerName?.message}
                  />
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
                  id="number"
                  {...register("contactNo", {
                    required: "Contact Number is required",
                  })}
                  className="inputStyle"
                  placeholder={"Contact Number"}
                />
                {errors?.contactNo && (
                  <ErrorMessage message={errors.contactNo.message} />
                )}
              </div>
              {/* VAT/Tax */}

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
                  className="inputStyle"
                  readOnly={id ? true : false}
                  placeholder={"Email"}
                />

                {!id && emailList?.includes(watch("email")) && (
                  <ErrorMessage
                    message={"User with this email already exist"}
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
                  id="panVatNumber"
                  {...register("pan_vat")}
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
                  {...register("stateId", {
                    required: "State is required",
                    valueAsNumber: true,
                  })}
                  className="inputStyle"
                >
                  <option value="" selected={true} disabled={true}>
                    --Select State--
                  </option>
                  {stateOptions}
                </select>
                {errors?.stateId && (
                  <ErrorMessage message={errors.stateId.message} />
                )}
              </div>
              {/* District */}
              <div className="">
                <label
                  htmlFor="district"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  District <RequiredField />
                </label>
                <select
                  id="district"
                  {...register("districtId", {
                    required: "District is required",
                    valueAsNumber: true,
                  })}
                  className="inputStyle"
                >
                  <option value="" selected={true} disabled={true}>
                    {" "}
                    -- Select District --
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
                  id="nagarPalika"
                  {...register("palikaId", {
                    required: "Palika is required",
                    valueAsNumber: true,
                  })}
                  className="inputStyle"
                >
                  <option value="" disabled={true} selected={true}>
                    --Select Palika--
                  </option>
                  {id ? allPaliakOptions : palikaOptions}
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
                  Ward Number <RequiredField />
                </label>

                <input
                  type="text"
                  id="wardNumber"
                  {...register(`wardNo`, { required: "Ward is required" })}
                  className="inputStyle"
                  placeholder={"Ward Number"}
                />
                {errors?.wardNo && (
                  <ErrorMessage message={errors.wardNo.message} />
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
                  className="inputStyle"
                  placeholder="Tole "
                />
              </div>
              {/* House Number */}
              <div className="">
                <label
                  htmlFor="houseno"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  House Number
                </label>
                <input
                  type="text"
                  id="houseNumber"
                  {...register(`houseno`)}
                  className="inputStyle"
                  placeholder="House Number"
                />
              </div>
              {id ? (
                <></>
              ) : (
                <div className="">
                  <label
                    htmlFor="houseno"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password <RequiredField />
                  </label>
                  <input
                    type="password"
                    id="houseNumber"
                    {...register(`password`, {
                      required: "Password is required ",
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

            <h1 className={"text-xl font-bold mt-6 "}>Bank Details</h1>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-3 ">
              <div>
                <label htmlFor="">
                  Bank <RequiredField />{" "}
                </label>
                <select
                  className="inputStyle"
                  {...register("bankId", {
                    required: "Bank is required",
                    valueAsNumber: true,
                  })}
                >
                  <option value="" disabled={true} selected={true}>
                    --Select Bank--
                  </option>
                  {bankOptions}
                </select>
                {errors?.bankId && (
                  <ErrorMessage message={errors.bankId.message} />
                )}
              </div>
              <div>
                <label htmlFor="">Account Number</label>
                <input
                  type="text"
                  className="inputStyle"
                  {...register("accountNo", {
                    required: "Account number is required",
                  })}
                  placeholder="Business Manager Account Number"
                />
                {errors?.accountNo && (
                  <ErrorMessage message={errors.accountNo.message} />
                )}
              </div>
            </div>

            <div className="sm:col-start-1 mt-5 flex items-end justify-start gap-x-6">
              <button
                type="button"
                className={"cancelButton"}
                onClick={() => router.push(id ? ".." : ".")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={"submitButton"}
                disabled={
                  isSubmitting
                    ? true
                    : false || (!id && emailList?.includes(watch("email")))
                }
              >
                {isSubmitting ? " Submtting ..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddMerchantForm;
