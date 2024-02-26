import "./styleSheet.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AddProfilePage = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    teacher: "",
    grade: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    setData((prevData) => [...prevData, formData]);
    axios.post("/createprofile", formData);
    alert("A profile has been added successfully!");
    navigate("/addprofile");

    setFormData({
      firstName: "",
      lastName: "",
      teacher: "",
      grade: "",
    });
  };

  const tableData = [
    {
      TeacherLastName: "Portis",
    },
    {
      TeacherLastName: "Miller",
    },
    {
      TeacherLastName: "Thompson",
    },
    {
      TeacherLastName: "Fox",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  /* Disables confirm button until all fields are filled */
  const isFieldFull = () => {
    return Object.values(formData).some((value) => value === "");
  };
  
  const cancel = () => {
    navigate("/welcome");
  };

  const navigate = useNavigate();

  return (
    <div class="outer-container">
      <div class="middle-container">
        <div class="inner-container">
          <form onSubmit={handleSubmit}>
            <h1>Add A New Kid's Profile</h1>
            <div>
              First Name
              <br />
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
              <br />
              Last Name
              <br />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
              <br />
              Grade
              <br />
              <input
                type="number"
                min={0}
                max={12}
                name="grade"
                placeholder="Grade"
                value={formData.grade}
                onChange={handleChange}
              />
              <br />
              Classroom Teacher
              <br />
              <select
                id="dropdown"
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
              >
                <option value="" hidden>
                  -- Select A Teacher--
                </option>
                {/* Create  a dropdown for every teacher in database */}
                {tableData.map((data, index) => (
                  <option key={index}>{data.TeacherLastName}</option>
                ))}
              </select>
            </div>
            <br />
            <br />
            <input type="submit" value="Confirm" disabled={isFieldFull()} />
            &nbsp;&nbsp;
            <div>
              <button onClick={cancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
