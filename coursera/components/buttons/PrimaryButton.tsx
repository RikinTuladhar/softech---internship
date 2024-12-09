import React from "react";

const PrimaryButton = ({
  className,
  title,
}: {
  className: string;
  title: string;
}) => {
  return (
    <button
      className={` ${className} w-full  h-[2.5rem] md:h-auto py-3 text-sm font-semibold text-white rounded-lg bg-primary`}
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
