export const CreateAccountPage = () => {
	return (
		<div class="outer-container">
			<div class="middle-container">
				<form>
					<div class="inner-container">
						<h1>Create a Minutes Tracker Account</h1>
						<div>
							First Name<br/>
							<input type="text" name="firstname" placeholder="First Name" /><br/>
							Last Name<br/>
							<input type="text" name="lastname" placeholder="Last Name"/><br/>
							E-mail<br/>
							<input type="email" name="email" placeholder="E-mail"/><br/>
							Create Password<br/>
							<input type="password" name="password" placeholder="Create Password"/><br/>
							Confirm Password<br/>
							<input type="password" name="password_confirm" placeholder="Confirm Password"/><br/>
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