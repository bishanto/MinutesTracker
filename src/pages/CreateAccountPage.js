import './LoginStyle.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Card } from "react-bootstrap"; 
import { useNavigate } from 'react-router-dom';

export const CreateAccountPage = () => {

	const [values, setValues] = useState({
		fname: '',
		lname: '',
		email: '',
		password: '',
		password_confirm: ''
	});

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

	const handleInput = (event) => {
		setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if(String(values.password) === String(values.password_confirm)) {
			axios.post('http://localhost:8081/createaccount', values)
			.then(res => {
				if (res.data === "createSuccess") {
					alert("Account Created");
					navigate('/signin');
				}
				else if (res.data === "emailError") {
					alert("Error: An account with this email address has already been created");
				}
			}).catch(err => console.log(err));
		} else {
			document.getElementsByName("password_confirm").forEach((value) => {
				value.style.boxShadow = "0 0 5px 1px red";
			});
		}
	}

	const navigate = useNavigate();

	return (
		<Container fluid style={{paddingLeft: 0, paddingRight: 0}}> 
			<Row className="justify-content-center"> 
				<Col xs={12} md={6} lg={4}>
					<a href="/"><img class="dragonimg" src="/images/dragonLogo.png" alt="Dragon_Logo"></img></a>
					<Card style={{borderRadius:30, marginTop: 15}}>
						<Card.Body>
							<form onSubmit={handleSubmit}>
							<Card.Title style={{fontSize:30}}>Create a Dragon Minutes Account</Card.Title> 
							<Card.Text> 
								First Name<br/><input type="text" name="firstname" placeholder="First Name" onChange={handleInput}/><br/>
								Last Name<br/><input type="text" name="lastname" placeholder="Last Name" onChange={handleInput}/><br/>
								E-mail<br/><input type="email" name="email" placeholder="E-mail" onChange={handleInput}/><br/>
								Create Password<br/><input class="password" type="password" name="password" placeholder="Create Password" onChange={handleInput}/><br/>
								Confirm Password<br/><input class="password" type="password" name="password_confirm" placeholder="Confirm Password" onChange={handleInput}/><br/>
								<input type="checkbox" name="checkbox" required />
								<label for="checkbox">I agree with the Safety Policies</label><br/><br/>
								<input type="submit" value="Create Account"></input>
							</Card.Text> 
							</form>
						</Card.Body> 
					</Card> 
				</Col>
			</Row>
		</Container>
	);
}
