import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Card } from "react-bootstrap"; 
import axios from 'axios';
import './LoginStyle.css';

export const ForgetPassword = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({email:''});
    const handleInput = (event) => {setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));}
    const cancel = () => {navigate("/");};

    const handleSubmit = (event) => {
	event.preventDefault();
	axios.post('/forgetpassword', values).then(res => {
		if(res.data === "Success") {
			alert("You will receive an confirmation email!Please follow the instruction on the email!");
			navigate('/');
		}
		else if (res.data === "Incorrect Login") {
				document.getElementsByName("email").forEach(value => {value.style.boxShadow = "0 0 5px 1px red";});
				alert("please input the email!");
		}
	}).catch(err => console.log(err));
    }

    return (
        <Container fluid style={{paddingLeft: 0, paddingRight: 0}}> 
			<Row className="justify-content-center"> 
				<Col xs={12} md={6} lg={4}>
					<a href="/"><img class="dragonimg" src="/images/dragonLogo.png" alt="Dragon_Logo"></img></a>
					<Card style={{borderRadius:30, marginTop: 15}}>
						<Card.Body>
							<form onSubmit={handleSubmit}>
							<Card.Title style={{fontSize:30}}>Forget Password</Card.Title> 
							<Card.Text> 
								Email:<br/>
								<input type="email" name="email" placeholder="Email" onChange={handleInput}/><br/>
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
    )
}
