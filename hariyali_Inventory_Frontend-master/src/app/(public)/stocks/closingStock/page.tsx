import AddButton from "@/src/components/reusable/AddButton";
import React from "react";

const closingPage = () => {
  return (
    <div className="mx-6">
      <AddButton
        title="Closing Stock"
        link="/stocks/closingStock/create"
        buttonTitle="Closing Stock"
      />

      <table className="w-full border border-gray-300 border-collapse my-3">
        <tr>
          <th className="tableBorder">No records found!</th>
        </tr>
      </table>
    </div>
  );
};

export default closingPage;
