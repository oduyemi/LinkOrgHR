import React from "react";
import PageTitle from "../../../components/ui/PageTitle";
import EmployeeForm from "../../../components/forms/EmployeeForm";

const AddEmployee: React.FC = () => {
  return (
    <div className="flex flex-col">
      <PageTitle title="Add New Employee" />

      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex w-full ">
          <EmployeeForm />
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
