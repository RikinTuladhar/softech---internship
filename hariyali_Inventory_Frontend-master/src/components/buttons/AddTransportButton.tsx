// components/AddMerchantButton.tsx

import React from "react";
import Link from "next/link";

const AddTransportButton: React.FC = () => {
  return (
    <Link href="/AddTransportForm">
      <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
        Add Transport
      </button>
    </Link>
  );
};

export default AddTransportButton;
