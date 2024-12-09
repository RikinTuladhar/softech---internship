// components/AddMerchantButton.tsx

import React from "react";
import Link from "next/link";

const AddEntrepreneurButton: React.FC = () => {
  return (
    <Link href="/AddEntrepreneurForm">
      <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
        Add Bussiness Manager
      </button>
    </Link>
  );
};

export default AddEntrepreneurButton;
