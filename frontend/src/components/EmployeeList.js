import React from "react";
import EmployeeCard from "./EmployeeCard";

const EmployeeList = ({ employees, onDelete }) => {
  return (
    <div>
      {employees.map((employee) => (
        <EmployeeCard
          key={employee._id}
          employee={employee}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
