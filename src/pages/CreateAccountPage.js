import './LoginStyle.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
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
			axios.post('/createaccount', values)
			.then(res => {
				if (res.data === "createSuccess") {
					alert("Account Created");
					navigate('/login');
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
		<div class="outer-container">
			<div class="middle-container">
				<form onSubmit={handleSubmit}>
					<div class="inner-container">
						<h1>Create a Minutes Tracker Account</h1>
						<div>
							First Name<br/><input type="text" name="firstname" placeholder="First Name" onChange={handleInput}/><br/>
							Last Name<br/><input type="text" name="lastname" placeholder="Last Name" onChange={handleInput}/><br/>
							E-mail<br/><input type="email" name="email" placeholder="E-mail" onChange={handleInput}/><br/>
							Create Password<br/><input class="password" type="password" name="password" placeholder="Create Password" onChange={handleInput}/><br/>
							Confirm Password<br/><input class="password" type="password" name="password_confirm" placeholder="Confirm Password" onChange={handleInput}/><br/>
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
