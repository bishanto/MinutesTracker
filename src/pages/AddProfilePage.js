import "./styleSheet.css";
import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent.js";

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

	<Container fluid style={{paddingLeft: 0, paddingRight: 0}}> 
		<NavbarComponent/>
		<Row className="justify-content-center"> 
			<Col xs={12} md={6} lg={4}>
				<Card style={{borderRadius:30, marginTop: 15}}>
					<Card.Body>
						<form onSubmit={handleSubmit}>
                        <Card.Title style={{fontSize:30}}>Add A New Kid's Profile</Card.Title> 
                        <Card.Text> 
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
							// Create  a dropdown for every teacher in database 
							{tableData.map((data, index) => (
							<option key={index}>{data.TeacherLastName}</option>
							))}
							</select>
							<br />
							<br />
							<input type="submit" value="Confirm" disabled={isFieldFull()} />
							&nbsp;&nbsp;
							<button onClick={cancel}>Cancel</button>
                        </Card.Text> 
						</form>
                    </Card.Body> 
                </Card> 
            </Col>
		</Row>
	</Container>

  );
};
