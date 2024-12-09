import React from "react";
import Image from "next/image";
import imgSource from '../../../public/underConstruction.svg'
export default function UnderConstruction() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <Image
        src={imgSource}
        alt="Under Construction"
        width={500}
        height={500}
        loading="lazy"
      />
      <h1 className="text-5xl font-bold text-green-600 my-7">Section Under Construction</h1>
    </div>
  );
}
