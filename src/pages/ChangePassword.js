import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
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
    navigate("/welcome");
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
        <div class="outer-container">
            <div class="middle-container">
            <NavbarComponent />
                <div class="inner-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Change Password</h1>
                        <div>
                            Current Password:<br/>
                            <input type="password" name="current_password" placeholder="Current Password" onChange={handleInput}/><br/>
                            Password:<br/>
                            <input type="password" name="password" placeholder="Password" onChange={handleInput}/><br/>
                            Confirm Password:<br/>
                            <input type="password" name="password_confirm" placeholder="Confirm Password" onChange={handleInput}/><br/>
                        </div>
                        <br/><br/>
                        <input type="submit" value="Confirm"/>&nbsp;&nbsp;
                        <button onClick={cancel}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}