"use client";
import { useForm } from "react-hook-form";

export default function CreateFarmerCommodity() {
  const { register, handleSubmit, watch } = useForm();
  const watchField = watch();
  const onSubmit = () => {};
  return (
    <div className="flex flex-col shadow-md px-8 ">
      <main className=" py-10 ">
        <h1 className="text-2xl font-bold my-5">Add Items</h1>
        <div className=" ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" grid md:grid-cols-3 grid-cols-2 gap-8 w-full pr-5 "
          >
            <div className="">
              <label className="labelStyle">Types</label>
              <select className="selectStyle" {...register("types")}>
                <option selected disabled>
                  --Select Types--
                </option>
                <option value={"accessories"}>Accessories</option>
                <option value={"seed"}>Seeds</option>
                <option value={"vehicles"}>Vehicles</option>
              </select>
            </div>
            <div>
              <label htmlFor="" className="labelStyle">
                Name
              </label>
              <input className="inputStyle" placeholder=" name.." />
            </div>
            <div>
              <label htmlFor="" className="labelStyle">
                Price
              </label>
              <input
                type="number"
                className="inputStyle"
                placeholder=" price.."
              />
            </div>
            <div>
              <label htmlFor="" className="labelStyle">
                Buy Date
              </label>
              <input
                type="date"
                className="inputStyle"
                placeholder="Weapon name.."
              />
            </div>
            <div className="sm:col-start-1  flex items-end justify-start gap-x-6">
              <button
                type="button"
                // onClick={handleCancel}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
