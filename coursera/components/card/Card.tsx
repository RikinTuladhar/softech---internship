import React from "react";
import { CreditCard } from "lucide-react";
const Card = () => {
  return (
    <div className="w-[280px] relative px-2 py-2 border-2 border-[#E8EEF7] rounded-[16px]  min-h-[250px] bg-[#FFFFFF] shadow-sm">
      <div className="absolute text-xs bg-white border px-2 rounded-sm font-bold top-4 left-4">
        New AI Skills
      </div>
      <div>
        <img
          src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/41/4d3d7c05fb42729c9d90352e072ca3/1060x596_GCC-photos_Karrim.png?auto=format%2Ccompress%2C%20enhance&dpr=1&w=320&h=180&fit=crop&q=50&crop=faces"
          className="w-full h-full rounded-md"
          alt=""
        />
      </div>
      <div className="flex items-center px-2 py-2 gap-2">
        <img
          src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/4a/cb36835ae3421187080898a7ecc11d/Google-G_360x360.png?auto=format%2Ccompress&dpr=3&w=24&h=24"
          alt="Image of google"
          className="size-5"
        />
        <span className="text-xs text-secondary">Google</span>
      </div>
      <div>
        <h3 className="text-[16px] px-2 font-semibold">
          Google Data Analytics
        </h3>
      </div>
      <div className="pt-4 space-y-2 pb-2">
        <div className="text-primary flex gap-2 items-center px-2 text-sm">
          <CreditCard size={20} />
          <p className="text-xs">Build toward a degree</p>
        </div>
        <div className="px-2 text-xs text-secondary">
          <span>Professional Certificate</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
