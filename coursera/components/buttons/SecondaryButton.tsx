import React from "react";

const SecondaryButton = ({ title }: { title: string }) => {
  return (
    <button className="w-full h-[2.5rem] md:h-auto text-sm py-2 font-semibold  text-primary rounded-lg bg-background border-primary border md:border-4">
      {title}
    </button>
  );
};

export default SecondaryButton;
