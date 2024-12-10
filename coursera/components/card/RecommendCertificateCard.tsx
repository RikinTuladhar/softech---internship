import React from "react";
import { space } from "postcss/lib/list";
import { Star } from "lucide-react";
const RecommendCertificateCard = () => {
  return (
    <div className="w-[300px] relative rounded-lg min-h-[380px] shadow-xl">
      <div className="px-3 py-[1px] rounded-md font-bold absolute right-2 text-xs bg-slate-50 top-2">
        AI Skills
      </div>
      <div className="w-full rounded-lg h-[200px] ">
        <img
          className="w-full h-full rounded-t-lg "
          src="/Project-management-professional-certificate-SP-Logo.png"
          alt="image of project management"
        />
      </div>
      <div className="py-5 space-y-2 px-4">
        <div className="flex gap-x-5 items-center">
          <div className="size-4">
            <img
              className="w-full object-center object-cover h-full"
              src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/cc/61dbdf2c1c475d82d3b8bf8eee1bda/MSFT-stacked-logo_FINAL.png?auto=format%2Ccompress&dpr=1&w=25&h=25&q=40"
              alt="image of microsoft"
            />
          </div>
          <div className="text-xs text-[#5B6780]">Microsoft</div>
        </div>
        <h3 className="text-sm font-semibold">Microsfot Project Management</h3>
        <div>
          <p className="text-xs text-dim">
            Skills you'll gain: Risk management, Budgeting Stakeholder
            Management, Planning
          </p>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-bold text-xs">4.7</span>
          <span>
            <Star size={15} />
          </span>
          <span className="text-xs text-secondary">(217) reviews</span>
        </div>
        <div className="text-xs text-dim">
          <span>Beginner. Professional Certificate. 4months</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendCertificateCard;
