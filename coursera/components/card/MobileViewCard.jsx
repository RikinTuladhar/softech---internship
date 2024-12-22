import React from 'react'

const MobileViewCard = () => {
    return (
        <div className="w-full min-h-32  px-2 py-2 rounded-xl border-2 border-gray-400">
            <div className="w-full h-[20%] ">
                <div className=" w-fit px-2  my-2 ml-1 rounded-md  border  ">
                    <h3 className="text-[14px] font-semibold ">New AI Skills</h3>
                </div>

            </div>
            <div className="w-full  flex justify-between pr-3">
                <div className="w-full  space-y-2 ">
                    <div className="size-6 flex gap-x-2 items-center"><img src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/4a/cb36835ae3421187080898a7ecc11d/Google-G_360x360.png?auto=format%2Ccompress&dpr=3&w=24&h=24" className="w-full h-full" alt="image of google" />

                        <div className="text-xs text-secondary">Google</div>
                    </div>
                    <h4 className="text-xs font-bold">Google Data Analytics</h4>

                    <div className="flex">

                        <p className="text-primary text-xs">Build toward a degree</p>
                    </div>

                    <p className="text-xs text-secondary">Professional Certificate</p>
                </div>
                <div className="w-[20%] ">
                    <div className="size-14 overflow-hidden rounded-md">
                        <img src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/41/4d3d7c05fb42729c9d90352e072ca3/1060x596_GCC-photos_Karrim.png?auto=format%2Ccompress%2C%20enhance&dpr=1&w=320&h=180&fit=crop&q=50&crop=faces" className="rounded-lg w-full h-full object-cover" alt="image of person" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MobileViewCard
