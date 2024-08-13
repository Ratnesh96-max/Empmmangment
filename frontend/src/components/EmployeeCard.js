import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../util/config";

const EmployeeCard = ({ employee, onDelete }) => {
  return (
    <div style={styles.card}>
      <h3>{employee.name}</h3>
      <p>Email: {employee.email}</p>
      <p>Mobile: {employee.mobile}</p>
      <p>Designation: {employee.designation}</p>
      <p>Gender: {employee.gender}</p>
      <p>Courses: {employee.courses.join(", ")}</p>
      {employee.image && (
        <img
          src={`${BASE_URL}/images/${employee.image}`} // Update path to match your backend
          alt={employee.name}
          style={styles.image}
        />
      )}
      <div style={styles.actions}>
        <Link to={`/employees/edit/${employee._id}`} style={styles.link}>
          Edit
        </Link>
        <button onClick={() => onDelete(employee._id)} style={styles.button}>
          Delete
        </button>
      </div>
    </div>
  );
};

// Inline styles for the component
const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "16px",
    margin: "16px 0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100px",
    height: "auto",
    borderRadius: "4px",
  },
  actions: {
    marginTop: "12px",
  },
  link: {
    marginRight: "8px",
    textDecoration: "none",
    color: "#007bff",
  },
  button: {
    backgroundColor: "#dc3545",
    border: "none",
    color: "white",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default EmployeeCard;
