"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function createGivenInventory() {
  const { register, handleSubmit, watch } = useForm();
  const watchField = watch();
  const [typesCondition, setTypeCondition] = useState();
  console.log(typesCondition, "hellworld");

  const onSubmit = () => {};
  return (
    <div className="flex flex-col shadow-md px-8 ">
      <main className=" py-10 ">
        <h1 className="text-2xl font-bold my-5">Add Items</h1>
        <div className=" ">
          <form onSubmit={handleSubmit(onSubmit)} className="   w-full pr-5 ">
            <div className="grid grid-cols-3">
              <div className="">
                <label className="labelStyle">Types</label>
                <select
                  className="selectStyle"
                  {...register("types")}
                  onChange={(e: any) => setTypeCondition(e.target.value)}
                >
                  <option selected disabled value={""}>
                    --Select Types--
                  </option>
                  <option value={"accessories"}>Accessories</option>
                  <option value={"seed"}>Seeds</option>
                  <option value={"vehicles"}>Vehicles</option>
                </select>
              </div>
            </div>
            {/* Accessories           */}
            {(typeof typesCondition === "undefined" ||
              typesCondition === "accessories") && (
              <div className="grid grid-cols-3 gap-5 py-5">
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
                    Quantity
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
              </div>
            )}
            {/* Seeds           */}
            {typesCondition === "seed" && (
              <div className="grid grid-cols-3 gap-5 py-5">
                <div>
                  <label htmlFor="" className="labelStyle">
                    Name
                  </label>
                  <input className="inputStyle" placeholder=" name.." />
                </div>
                <div>
                  <label htmlFor="" className="labelStyle">
                    Species
                  </label>
                  <select className="selectStyle">
                    <option value="" selected disabled>
                      --Select Species--
                    </option>
                  </select>
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
                    Quantity (kg)
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
                <div>
                  <label htmlFor="" className="labelStyle">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    className="inputStyle"
                    placeholder="Weapon name.."
                  />
                </div>
              </div>
            )}
            {/* Vehicle           */}
            {typesCondition === "vehicles" && (
              <div className="grid grid-cols-3 gap-5 py-5">
                <div>
                  <label htmlFor="" className="labelStyle">
                    Name
                  </label>
                  <input className="inputStyle" placeholder=" name.." />
                </div>
                <div>
                  <label htmlFor="" className="labelStyle">
                    Type
                  </label>
                  <select className="selectStyle">
                    <option value="" selected disabled>
                      --Select Type--
                    </option>
                  </select>
                </div>
                <div>
                  <label htmlFor="" className="labelStyle">
                    Manufacture Company
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
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="inputStyle"
                    placeholder=" price.."
                  />
                </div>
                <div>
                  <label htmlFor="" className="labelStyle">
                    Release Date
                  </label>
                  <input
                    type="date"
                    className="inputStyle"
                    placeholder="Weapon name.."
                  />
                </div>
                <div>
                  <label htmlFor="" className="labelStyle">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    className="inputStyle"
                    placeholder="Weapon name.."
                  />
                </div>
              </div>
            )}
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
