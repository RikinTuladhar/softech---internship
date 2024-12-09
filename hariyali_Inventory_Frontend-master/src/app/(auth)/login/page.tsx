"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  loginUser,
  Me,
} from "@/src/services/apiService/setup/user/userServices";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../../public/hariyali-abhiyan-logo-3.png";
import ButtonLoader from "@/src/components/reusable/ButtonLoader";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { meAtom } from "@/src/Recoil/atom";

export default function LoginIndex() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({});
  const setMe = useSetRecoilState(meAtom);

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await loginUser(data);
      if (response?.status === 200) {
        Cookies.set("access_token", response?.data.accessToken);
        router.push("/");
        toast.success(response?.message);
        try {
          const { data, status } = await Me();
          if (status === 200) {
            setMe(data);
          }
        } catch (error) {}
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  return (
    <React.Fragment>
      <div className={" flex items-center justify-center h-screen w-full   "}>
        <div className="px-4 py-2 borderRadius  bg-green-300   ">
          <div className={"flex items-center justify-center  "}>
            <Image
              src={Logo}
              alt={"hariyali-abhiyan-logo"}
              height={520}
              width={520}
              className={" h-40 w-40"}
            />
          </div>

          <form
            className={" flex gap-3 flex-col"}
            onSubmit={handleSubmit((data) => onSubmit(data))}
          >
            <div>
              <h1 className={"font-bold text-xl "}>
                Hariyali Abhiyan Inventory System
              </h1>
            </div>
            <div className={"mt-8 flex flex-col gap-3"}>
              <div>
                <div className={"w-full flex flex-col gap-2"}>
                  <label>Email</label>
                  <input
                    className={"inputStyle borderRadiusInput"}
                    placeholder={"email"}
                    type={"email"}
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p
                      className={"text-red-600"}
                    >{`${errors.email.message}`}</p>
                  )}
                </div>
                <div className={"w-full flex flex-col gap-2"}>
                  <label>Password</label>
                  <input
                    className={"inputStyle borderRadiusInput"}
                    placeholder={"password"}
                    type={"password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <p
                      className={"text-red-600"}
                    >{`${errors.password.message}`}</p>
                  )}
                </div>
              </div>

              <button
                className={
                  "w-full bg-green-600 borderRadiusInput text-white py-2 mb-3 hover:bg-green-700 duration-150 transition-all ease-in-out disabled:bg-gray-300 "
                }
                type={"submit"}
                disabled={isSubmitting ? true : false}
              >
                {isSubmitting ? (
                  <div className={"flex items-center justify-center"}>
                    <ButtonLoader />
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
