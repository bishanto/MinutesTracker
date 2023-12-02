import './styleSheet.css';
import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


export const LoginPage = () => {

    const [values,setValues] = useState({

		email: '',
		password: ''

	})

	const handleInput = (event) => {

		setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))

	}

	const handleSubmit = (event) => {

		event.preventDefault();
		axios.post('http://localhost:8081/login', values)
		.then(res => {

            if(res.data === "Success") {

                navigate('/welcome');
                alert("Login Successful!");

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
                        <h1>Login to Minutes Tracker</h1>
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
