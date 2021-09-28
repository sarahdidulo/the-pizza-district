import React , {useState, useEffect, useContext} from 'react';

import {
	Form,
	Container,
	Button
} from 'react-bootstrap';

import {Redirect, useHistory} from 'react-router-dom';

import UserContext from './../UserContext';

import swal from 'sweetalert';

export default function Register(e){

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [mobileNo, setMobileNo] = useState(''); //UNCOMMENT AFTERWARDS
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [disabled, setDisabled] = useState(true);
	const {user, setUser} = useContext(UserContext);

	let history = useHistory();

	if(user.id != null){
		history.push('/home');
	}

	const registerUser = (e) => {

		e.preventDefault();
		if(password != password2){
			swal("Please re-enter again your password");
		} else {

			fetch("https://serene-dawn-74407.herokuapp.com/api/users/check-email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: email
				})
			}).then(result=>result.json())
			.then(result=>{
				if(result == false){ //email is unique and can be used to register

					fetch("https://serene-dawn-74407.herokuapp.com/api/users/register", {
						method: "POST",
						headers: {
							"Content-Type" : "application/json"
						},
						body: JSON.stringify({
							firstName: firstName,
							lastName: lastName,
							mobileNo: mobileNo,
							email: email,
							password: password
						})
					}).then(result=>result.json())
					.then(result=>{
						// console.log(result); //if return is true then use is successfully registered.
						if(result == true){
							swal("","You successfully registered!","success");	
							history.push("/login");
						} else {
							swal("Not registered, please try again.");
						}
						
						// <Redirect to="/login" />
					})

				} else {
					swal('Email is already in use');
				}
			})	

		}

		
	}


	useEffect(()=>{

		// console.log(firstName)
		// console.log()
		if(firstName != '' && lastName != '' && email != '' && mobileNo != '' && password != '' && password2 != ''){ //include mobileNo afterwards
			setDisabled(false);
		} else {
			setDisabled(true);
		}

	}, [firstName, lastName, email, mobileNo, password, password2]); //include mobileNo afterwards

	return(

		<Container fluid>
				<div className = "row">
					<div className = "col-12 col-md-6 p-0">
						<div className = "bg-register">
							<div className="d-flex d-block d-md-none justify-content-center">
								
									<Form className="loginFormSmall rounded pb-5" onSubmit={(e)=>{registerUser(e)}} > 
									<div className = "home-brand text-center">
										<h3>THE</h3>
										<h1>PIZZA DISTRICT</h1>
										{/*<img className="arrows mt-3" src="images/arrows.png"/>*/}
										<img className="road" src="images/road.png"/>
									</div>
									{/*<h4 className = "text-center mt-3">Sign Up</h4>*/}
									  <Form.Group className="mb-3" controlId="formBasicEmail">
									    <Form.Label>First Name:</Form.Label>
									    <Form.Control type="text" placeholder="Enter First Name" onChange={(e)=>{setFirstName(e.target.value)}}/>
									  </Form.Group>

									  <Form.Group className="mb-3" controlId="formBasicEmail">
									    <Form.Label>Last Name:</Form.Label>
									    <Form.Control type="text" placeholder="Enter Last Name" onChange={(e)=>{setLastName(e.target.value)}}/>
									  </Form.Group>

									  <Form.Group className="mb-3" controlId="formBasicEmail">
									    <Form.Label>Mobile Number</Form.Label>
									    <Form.Control type="text" placeholder="Enter Mobile number" onChange={(e)=>{setMobileNo(e.target.value)}}/>
									  </Form.Group>

									  <Form.Group className="mb-3" controlId="formBasicEmail">
									    <Form.Label>Email address: </Form.Label>
									    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
									  </Form.Group>

									  <Form.Group className="mb-3" controlId="formBasicPassword">
									    <Form.Label>Password: </Form.Label>
									    <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
									  </Form.Group>

									  <Form.Group className="mb-3" controlId="formBasicPassword">
									    <Form.Label>Re-enter Password: </Form.Label>
									    <Form.Control type="password" placeholder="Verify Password" onChange={(e)=>{setPassword2(e.target.value)}}/>
									  </Form.Group>

									  <Button variant="outline-dark" type="submit" disabled = {disabled}>
									    Sign Up
									  </Button>
									</Form>

							</div>
						</div>
					</div>
					<div className = "col-12 col-md-6 p-0 ">
					<div className="d-none d-md-block">
						<div className = "register-brand text-center">
							<h3>THE</h3>
							<h1>PIZZA DISTRICT</h1>
							{/*<img className="arrows mt-3" src="images/arrows.png"/>*/}
							<img className="road" src="images/road.png"/>
							{/*<h4 className = "text-center mt-3">Sign Up</h4>*/}
						</div>
						{/*<h1 className="text-center">Login Page</h1>*/}
						<div className="d-flex justify-content-center">
							{/*<h1 className = "text-center">Register</h1>
*/}								<Form className="loginForm pb-5" onSubmit={(e)=>{registerUser(e)}} > 
								  <Form.Group className="mb-3" controlId="formBasicEmail">
								    <Form.Label>First Name:</Form.Label>
								    <Form.Control className="inputForm" type="text" placeholder="Enter First Name" onChange={(e)=>{setFirstName(e.target.value)}}/>
								  </Form.Group>

								  <Form.Group className="mb-3" controlId="formBasicEmail">
								    <Form.Label>Last Name:</Form.Label>
								    <Form.Control className="inputForm" type="text" placeholder="Enter Last Name" onChange={(e)=>{setLastName(e.target.value)}}/>
								  </Form.Group>

								  <Form.Group className="mb-3" controlId="formBasicEmail">
								    <Form.Label>Mobile Number</Form.Label>
								    <Form.Control className="inputForm" type="text" placeholder="Enter Mobile number" onChange={(e)=>{setMobileNo(e.target.value)}}/>
								  </Form.Group>

								  <Form.Group className="mb-3" controlId="formBasicEmail">
								    <Form.Label>Email address: </Form.Label>
								    <Form.Control className="inputForm" type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
								  </Form.Group>

								  <Form.Group className="mb-3" controlId="formBasicPassword">
								    <Form.Label>Password: </Form.Label>
								    <Form.Control className="inputForm" type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
								  </Form.Group>

								  <Form.Group className="mb-3" controlId="formBasicPassword">
								    <Form.Label>Re-enter Password: </Form.Label>
								    <Form.Control className="inputForm" type="password" placeholder="Verify Password" onChange={(e)=>{setPassword2(e.target.value)}}/>
								  </Form.Group>

								  <Button variant="outline-dark" type="submit" disabled = {disabled}>
								    Sign Up
								  </Button>
								</Form>

						</div>
					</div>

						{/*<a href="https://www.vecteezy.com/free-vector/crossed-arrows">Crossed Arrows Vectors by Vecteezy</a>*/}
					</div>
				</div>
					
						
				
				</Container>

	);

}