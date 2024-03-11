import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Card } from "react-bootstrap"; 
import axios from 'axios';
import NavbarComponent from "../components/NavbarComponent/NavbarComponent.js";

import './LoginStyle.css';

export const ChangePassword = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
                current_password:'',
		password: '',
		password_confirm: ''
	});

    const handleInput = (event) => {
		setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    const cancel = () => {
    navigate("/settings");
    };

    const handleSubmit = (event) => {
	event.preventDefault();
	if(String(values.password) === String(values.password_confirm)) {
		axios.post('/ChangePassword', values)
		.then(res => {
			if(res.data === "Success") {
				alert("password changes!");
				navigate('/welcome');
			}
			else if (res.data === "Incorrect Password") {
				alert("please input the correct current password!");
			}
		}).catch(err => console.log(err));
	} else {
		document.getElementsByName("password_confirm").forEach(value => {
				value.style.boxShadow = "0 0 5px 1px red";
			});
	}
    }

    useEffect(() => {
		if(String(values.password) === String(values.password_confirm)) {
			document.getElementsByName("password_confirm").forEach(value => {
				value.style.boxShadow = "none";
				value.setCustomValidity("");
			});
		} else {
			document.getElementsByName("password_confirm").forEach(value => {
				value.style.boxShadow = "0 0 5px 1px red";
				value.setCustomValidity("Passwords don't match");
			});
		}
	}, [values.password, values.password_confirm]);

    return (
        <Container fluid style={{paddingLeft: 0, paddingRight: 0}}> 
			<NavbarComponent/>
			<Row className="justify-content-center"> 
				<Col xs={12} md={6} lg={4}>
					<Card style={{borderRadius:30, marginTop: 15}}>
						<Card.Body>
							<form onSubmit={handleSubmit}>
							<Card.Title style={{fontSize:30}}>Change Password</Card.Title> 
							<Card.Text> 
							   Current Password:<br/>
								<input type="password" name="current_password" placeholder="Current Password" onChange={handleInput}/><br/>
								Password:<br/>
								<input type="password" name="password" placeholder="Password" onChange={handleInput}/><br/>
								Confirm Password:<br/>
								<input type="password" name="password_confirm" placeholder="Confirm Password" onChange={handleInput}/><br/>
								<br/>
								<input type="submit" value="Confirm"/>&nbsp;&nbsp;
								<button onClick={cancel}>Cancel</button>
							</Card.Text> 
							</form>
						</Card.Body> 
					</Card> 
				</Col>
			</Row>
		</Container>
    );
}