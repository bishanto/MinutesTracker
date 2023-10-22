import { useNavigate } from 'react-router-dom';

import './styleSheet.css';

export const ChangePassword = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }

    return (
        <div class="outer-container">
            <div class="middle-container">
                <div class="inner-container">
                    <form class="change-password-form">
                        <h1>Change Password</h1>
                        <div>
                            Password:<br/>
                            <input type="password" name="password" placeholder="Password" /><br/><br/>
                            Confirm Password:<br/>
                            <input type="password" name="password-confirm" placeholder="Confirm Password" /><br/>
                        </div>
                        <br/><br/>
                        <input type="submit" value="Confirm"/>&nbsp;&nbsp;
                        <button onClick={handleClick}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}