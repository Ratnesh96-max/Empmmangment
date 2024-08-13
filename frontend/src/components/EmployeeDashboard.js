import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeList from "./EmployeeList";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees");
        setEmployees(res.data);
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error("Failed to delete employee", error);
    }
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <EmployeeList employees={employees} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeeDashboard;
