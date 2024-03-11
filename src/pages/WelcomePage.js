import "./WelcomePageStyle.css";
import { Container, Row, Col, Card } from "react-bootstrap"; 

export const WelcomePage = () => {
    return(
        <Container fluid style={{paddingLeft: 0, paddingRight: 0}}> 
			<Row className="justify-content-center"> 
				<Col xs={12} md={6} lg={4}>
					<a href="/"><img class="dragonimg" src="/images/dragonLogo.png" alt="Dragon_Logo"></img></a>
					<Card style={{borderRadius:30, marginTop: 15}}>
						<Card.Body>
							<form>
							<Card.Title style={{fontSize:40}}>Dragon Minutes</Card.Title> 
							<Card.Text> 
								<br/><h3> <a href='#/signin'>Sign-in</a> </h3><br/>
								<h3> <a href='#/createaccount'>Create An Account</a> </h3><br/>
								<h3> <a href='#/ForgetPassword'>Forget Password</a> </h3><br/>
							</Card.Text> 
							</form>
						</Card.Body> 
					</Card> 
				</Col>
			</Row>
		</Container>
    )
}
