"use client";
import React from "react";
import CountUp from "react-countup";
interface CardDataStatsProps {
  title: string;
  count: number;
}
const CardDataStats: React.FC<CardDataStatsProps> = ({ title, count }) => {
  return (
    <div className=" border  px-3 relative mt-8 ml-4 h-16 rounded-lg shadow-lg  bg-[#e0f0e9fd] ">
      <div className="absolute   left-12 top-0 w-36 h-12  bg-[#38a745]  border text-gray-200/100 font-bold text-sm  transform -translate-x-1/2 -translate-y-1/2 rounded-xl pl-4 pt-1   ">
        {title}
      </div>
      <div className="rounded-full w-14 h-14  bg-gray-100/50 border border-black flex justify-center text-gray-500 items-center ml-40 xl:ml-40 2xl:ml-52 mt-1 ">
        <span className="items-center text-center flex justify-center font-bold ">
          <CountUp start={0} end={count} duration={9} />
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
