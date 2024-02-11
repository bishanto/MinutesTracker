import './styleSheet.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

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
		let userStoreObject = localStorage.getItem("user")

		if (lsJSON) {
			navigate('/welcome');
            
		} else if (userStoreObject) {
            navigate('/welcome');
        }
		
	}, []);

	const handleSubmit = (event) => {

		event.preventDefault();
		axios.post('/login', values)
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

     // *** Google Login ***

    // Storing user being logged in  || Will want to use something else in the future. ("Global" state, redux)
    const [ user, setUser ] = useState({});

    // Callback for google login
  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true; // Hides sign in button when logged in.

     // Creates an object formatted for storage
     let userStoreObject = { 
        given_name : userObject.given_name,
        family_name : userObject.family_name,
        name : userObject.name,
        email : userObject.email
      }

      localStorage.setItem("user", JSON.stringify(userStoreObject));
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden = false; // Show sign in button on logged out.
  } 

  // Backend for google login + signin button 
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "686063767700-8qjoop6tdui297ss2pqk63fp2i484ea7.apps.googleusercontent.com", //This is my client id -Marc
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
    
    // Pop up side windows for alternative login
    google.accounts.id.prompt();

    // Store userinfo
    
  }, []);
  
   // *** Google Login END***

    const navigate = useNavigate();
    
    return(        
        <div class="outer-container">
            <div class="middle-container">
                <div class="inner-container"> <div id="signInDiv"></div>
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
