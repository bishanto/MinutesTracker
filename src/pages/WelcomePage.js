import "./WelcomePageStyle.css";
export const WelcomePage = () => {
    return(
        <form>
	<img class="dragonimg" src="/images/dragonLogo.png" alt="Dragon_Logo"></img>
        <h1>Dragon Minutes</h1>
	<div class = "div1">
        <h3> <a href='#/signin'>Sign-in</a> </h3>
	</div>
	<div class ="div2">
        <h3> <a href='#/createaccount'>Create An Account</a> </h3>
	</div>
	<h3> <a href='#/ForgetPassword'>Forget Password</a> </h3>
    </form>
    )
}
