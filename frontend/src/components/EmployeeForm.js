import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../util/config";
import "./styles/EmployeeForm.css";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("HR");
  const [gender, setGender] = useState("M");
  const [courses, setCourses] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      errors.name = "Name can only contain letters and spaces";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email format is invalid";
    }

    if (!mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile)) {
      errors.mobile = "Mobile number must be 10 digits";
    }

    if (courses.length === 0) {
      errors.courses = "Please select at least one course";
    }

    if (!image) {
      errors.image = "Image is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    if (e.target.checked) {
      setCourses([...courses, selectedCourse]);
    } else {
      setCourses(courses.filter((course) => course !== selectedCourse));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("designation", designation);
    formData.append("gender", gender);
    courses.forEach((course) => formData.append("courses", course));
    formData.append("image", image);

    try {
      await axios.post(`${BASE_URL}/api/employees`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message ||
            "Registration failed. Please try again."
        );
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMobile("");
    setDesignation("HR");
    setGender("M");
    setCourses([]);
    setImage(null);
    setImagePreview(null);
    setValidationErrors({});
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>Employee Registration</h2>
      {error && <p className="error">{error}</p>}

      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {validationErrors.name && (
          <p className="error">{validationErrors.name}</p>
        )}
      </div>

      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {validationErrors.email && (
          <p className="error">{validationErrors.email}</p>
        )}
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Mobile No"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        {validationErrors.mobile && (
          <p className="error">{validationErrors.mobile}</p>
        )}
      </div>

      <div className="form-group">
        <select
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          required
        >
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      <div className="form-group">
        <label>
          <input
            type="radio"
            value="M"
            checked={gender === "M"}
            onChange={(e) => setGender(e.target.value)}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="F"
            checked={gender === "F"}
            onChange={(e) => setGender(e.target.value)}
          />
          Female
        </label>
      </div>

      <div className="form-group">
        <label>
          <input type="checkbox" value="MCA" onChange={handleCourseChange} />
          MCA
        </label>
        <label>
          <input type="checkbox" value="BCA" onChange={handleCourseChange} />
          BCA
        </label>
        <label>
          <input type="checkbox" value="BSC" onChange={handleCourseChange} />
          BSC
        </label>
        {validationErrors.courses && (
          <p className="error">{validationErrors.courses}</p>
        )}
      </div>

      <div className="form-group">
        <input type="file" onChange={handleImageChange} />
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Image Preview" />
          </div>
        )}
        {validationErrors.image && (
          <p className="error">{validationErrors.image}</p>
        )}
      </div>

      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
