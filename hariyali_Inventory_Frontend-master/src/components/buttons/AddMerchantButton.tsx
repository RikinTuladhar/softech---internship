// components/AddMerchantButton.tsx

import React from "react";
import Link from "next/link";

const AddMerchantButton: React.FC = () => {
  return (
    <Link href="/AddMerchantForm">
      <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
        Add Merchant
      </button>
    </Link>
  );
};

export default AddMerchantButton;
