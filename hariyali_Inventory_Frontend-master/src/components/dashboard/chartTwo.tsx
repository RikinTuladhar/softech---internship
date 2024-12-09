"use client";
import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#3C50E0", "#6577F3", "#8FD0EF"],
  labels: ["Accessories", "Vehicles  ", "Seeds  "],
  legend: {
    show: false,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartTwo = () => {
  const [state, setState] = useState({
    series: [65, 34, 12],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [65, 34, 12],
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke shadow-lg shadow-[#3b9ce1fd] px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black ">योजना विश्लेषण</h5>
        </div>
        <div>
          <div className="relative z-20 inline-block border-black border mt-2 rounded-lg ">
            <select
              name=""
              id=""
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value="" selected className="dark:bg-boxdark">
                ----- महिना चंनुहोस -----
              </option>
              <option value="" className="dark:bg-boxdark">
                वैशाख
              </option>
              <option value="" className="dark:bg-boxdark">
                जेठ
              </option>
              <option value="" className="dark:bg-boxdark">
                असार
              </option>

              <option value="" className="dark:bg-boxdark">
                साउन
              </option>
              <option value="" className="dark:bg-boxdark">
                भदौ
              </option>
              <option value="" className="dark:bg-boxdark">
                असोज
              </option>
              <option value="" className="dark:bg-boxdark">
                कार्तिक
              </option>
              <option value="" className="dark:bg-boxdark">
                मंसिर
              </option>
              <option value="" className="dark:bg-boxdark">
                पुष
              </option>
              <option value="" className="dark:bg-boxdark">
                माघ
              </option>
              <option value="" className="dark:bg-boxdark">
                फाल्गुण
              </option>
              <option value="" className="dark:bg-boxdark">
                चैत्र
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
