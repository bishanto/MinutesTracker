import './styleSheet.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Card } from "react-bootstrap"; 
import { useNavigate } from 'react-router-dom';


export const LoginPage = () => {

    const [values,setValues] = useState({

		email: '',
		password: ''

	})

	const handleInput = (event) => {

		setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))

	}

	// Check if user has logged in (user JSON object exists in localstorage) and send them to welcome account page instead of needing to login again
	useEffect(() => {
		
		let lsJSON = localStorage.getItem("userJSON");
		
		if (lsJSON) {
			
			navigate('/welcome');
		
		}
		
	}, []);

	const handleSubmit = (event) => {

		event.preventDefault();
		axios.post('http://localhost:8081/login', values)
		.then(res => {

	    // If login is successful, store user id, first name, and last name in localstorage
            if(JSON.stringify(res.data.success) === '["yes"]') {

                const objJSON = JSON.stringify(res.data);
		localStorage.setItem("userJSON", objJSON);
		alert("Login Successful!");
                navigate('/welcome');

            }

            else if(res.data === "Incorrect Login") {

                alert("There is no created account with that email");

            }
			
	    else if(res.data === "Incorrect Password") {

                alert("Incorrect Password");

            }

		})

		.catch(err => console.log(err))
        
	}

    const navigate = useNavigate();
    
    return(
        <Container fluid style={{paddingLeft: 0, paddingRight: 0}}> 
			<Row className="justify-content-center"> 
				<Col xs={12} md={6} lg={4}>
					<a href="/"><img class="dragonimg" src="/images/dragonLogo.png" alt="Dragon_Logo"></img></a>
					<Card style={{borderRadius:30, marginTop: 15}}>
						<Card.Body>
							<form onSubmit={handleSubmit}>
							<Card.Title style={{fontSize:30}}>Login to Dragon Minutes</Card.Title> 
							<Card.Text> 
								<br/>E-mail:<br/>
								<input type="email" placeholder="E-mail" name="email" onChange={handleInput}/><br/><br/>
								Password:<br/>
								<input type="password" placeholder="Password" name="password" onChange={handleInput}/><br/><br/>
								
								<input type="submit" value="Login"/>	
							</Card.Text> 
							</form>
						</Card.Body> 
					</Card> 
				</Col>
			</Row>
		</Container>
    )
}
