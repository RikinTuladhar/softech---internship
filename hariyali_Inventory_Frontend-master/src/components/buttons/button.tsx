// components/AddMerchantButton.tsx

import React from "react";
import Link from "next/link";

const Button = ({
  buttonName,
  urlName,
}: {
  buttonName: string;
  urlName: string;
}) => {
  return (
    <Link href={urlName}>
      <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
        {buttonName}
      </button>
    </Link>
  );
};

export default Button;
