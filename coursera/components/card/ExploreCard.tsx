import React from "react";

const ExploreCard = () => {
  return (
    <div className="w-[370px] flex  items-center h-[80px] pr-6 rounded-md shadow-md">
      <div className="w-[24%] h-full mr-2">
        <img
          src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/browse/domains/data_science.png?auto=format%2Ccompress&dpr=1&fit=crop&h=100&quot"
          className="w-full rounded-l-md h-full"
          alt="image of icon"
        />
      </div>
      <div className="text-xs space-y-1">
        <h3 className=" font-bold">Data Science</h3>
        <p className=" text-secondary font-bold">425 Courses</p>
      </div>
    </div>
  );
};

export default ExploreCard;
