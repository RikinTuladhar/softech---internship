"use client";
import ChartOne from "../../components/dashboard/chartOne";
import CardDataStats from "../../components/dashboard/cardDataStats";

export default function Home() {
  return (
    <>
      <div className="mx-8">
        <div className="grid grid-cols-1 gap-4 my-8 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
          <CardDataStats title={"Accessories"} count={50} />
          <CardDataStats title={"Vehicles"} count={56} />
          <CardDataStats title={"Seeds"} count={78} />
        </div>
        <ChartOne />
        {/* <ChartTwo /> */}
      </div>
    </>
  );
}
