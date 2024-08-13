const mongoose = require("mongoose");

// Define the Employee schema
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    enum: ["HR", "Manager", "Sales"],
    required: true,
  },
  gender: {
    type: String,
    enum: ["M", "F"],
    required: true,
  },
  courses: [
    {
      type: String,
      enum: ["MCA", "BCA", "BSC"],
    },
  ],
  image: {
    type: String,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
