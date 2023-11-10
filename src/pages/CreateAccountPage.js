import './styleSheet.css';
import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateAccountPage = () => {

	const [values,setValues] = useState({

		fname: '',
		lname: '',
		email: '',
		password: ''

	})

	const handleInput = (event) => {

		setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))

	}

	const handleSubmit = (event) => {

		event.preventDefault();
		axios.post('http://localhost:8081/createaccount', values)
		.then(res => {

			alert("Account Created");
			navigate('/login');

		})

		.catch(err => console.log(err))
		
	}

	const navigate = useNavigate();
	
	return (
		<div class="outer-container">
			<div class="middle-container">
				<form onSubmit={handleSubmit}>
					<div class="inner-container">
						<h1>Create a Minutes Tracker Account</h1>
						<div>
							First Name<br/>
							<input type="text" name="firstname" placeholder="First Name" onChange={handleInput}/><br/>
							Last Name<br/>
							<input type="text" name="lastname" placeholder="Last Name" onChange={handleInput}/><br/>
							E-mail<br/>
							<input type="email" name="email" placeholder="E-mail" onChange={handleInput}/><br/>
							Create Password<br/>
							<input type="password" name="password" placeholder="Create Password" onChange={handleInput}/><br/>
							Confirm Password<br/>
							<input type="password" name="password_confirm" placeholder="Confirm Password"/><br/>
						</div>
						<input type="checkbox" name="checkbox" required />
						<label for="checkbox">I agree with the <a href="/">Safety Policies</a></label><br/><br/>
						<input type="submit" value="Create Account"></input>
					</div>
				</form>
			</div>
		</div>
	);
}
