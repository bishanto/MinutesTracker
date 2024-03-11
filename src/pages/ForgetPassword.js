import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
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
        <div class="outer-container">
            <div class="middle-container">
                <div class="inner-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Forget Password</h1>
                        <div>
                            Email:<br/>
                            <input type="email" name="email" placeholder="Email" onChange={handleInput}/><br/>
                        </div>
                        <br/><br/>
                        <input type="submit" value="Confirm"/>&nbsp;&nbsp;
                        <button onClick={cancel}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}