import { useNavigate } from "react-router-dom";

import './LoginStyle.css';

export const ChangePasswordLogin = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/changepassword');
    };

    return (
        <div class="outer-container">
            <div class="middle-container">
                <div class="inner-container">
                    <form onSubmit={() => {navigate('/changepassword')}}>
                        <h1>Login to change password</h1>
                        <div>
                            E-mail:<br/>
                            <input type="email" name="email" placeholder="E-mail" /><br/>
                            Password:<br/>
                            <input type="password" name="password" placeholder="Password" /><br/>
                        </div>
                        <br/><br/>
                        <input type="submit" value="Login"/>&nbsp;&nbsp;
                        <button onClick={handleClick}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}