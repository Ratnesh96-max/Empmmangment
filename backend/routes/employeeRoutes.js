const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

// Create a new employee with image upload
router.post("/employees", employeeController.createEmployee);

// Get all employees
router.get("/employees", employeeController.getEmployees);

// Get an employee by ID
router.get("/employees/:id", employeeController.getEmployeeById);

// Update an employee by ID with image upload
router.put("/employees/:id", employeeController.updateEmployee);

// Delete an employee by ID
router.delete("/employees/:id", employeeController.deleteEmployee);

module.exports = router;
