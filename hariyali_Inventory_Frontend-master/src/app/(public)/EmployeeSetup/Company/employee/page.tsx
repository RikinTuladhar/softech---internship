import React from "react";
import AddButton from "@/src/components/reusable/AddButton";
function EmployeeList() {
  const mainTable = (
    <div>
      <AddButton
        title="Employee"
        buttonTitle="Create Employee"
        link="/EmployeeSetup/Company/employee/createEmployee"
      />
    </div>
  );
  return <div>{mainTable}</div>;
}

export default EmployeeList;
