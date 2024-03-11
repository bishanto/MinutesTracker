import './styleSheet.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
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
        <div class="outer-container">
            <div class="middle-container">
                <div class="inner-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Login to Dragon Minutes</h1>
                        <div>
                            E-mail:<br/>
                            <input type="email" placeholder="E-mail" name="email" onChange={handleInput}/><br/><br/>
                            Password:<br/>
                            <input type="password" placeholder="Password" name="password" onChange={handleInput}/><br/><br/>
                        </div>
                        <br/>
                        <input type="submit" value="Login"/>
                    </form>
                </div>
            </div>
        </div>
    )
}
