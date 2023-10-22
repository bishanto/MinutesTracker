import './styleSheet.css';

export const LoginPage = () => {
    return(
        <div class="outer-container">
            <div class="middle-container">
                <div class="inner-container">
                    <form>
                        <h1>Login to Minutes Tracker</h1>
                        <div>
                            E-mail:<br/>
                            <input type="email" placeholder="E-mail" name="email" /><br/><br/>
                            Password:<br/>
                            <input type="password" placeholder="Password" name="password" /><br/><br/>
                        </div>
                        <br/>
                        <input type="submit" value="Login"/>
                    </form>
                </div>
            </div>
        </div>
    )
}