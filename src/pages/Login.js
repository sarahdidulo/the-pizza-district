import React, {useState, useContext} from 'react';

import {Redirect, useHistory} from 'react-router-dom';

import {
	Container,
	Form,
	Button
} from 'react-bootstrap';

import UserContext from './../UserContext';

import swal from 'sweetalert';

export default function Login(){

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const {user, setUser} = useContext(UserContext);

	// console.log("from login", user);

	let history = useHistory();

	if(user.id != null){
		history.push('/home');
	}

	const loginUser = (e) => {

		e.preventDefault();

		fetch("https://serene-dawn-74407.herokuapp.com/api/users/login", {
			method: "POST",
			headers: {
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		}).then(result=>result.json())
		.then(result=>{

			if(result != false){
				// console.log("access token", result.access);
				localStorage.setItem('token', result.access);

				let token = localStorage.getItem('token');

				fetch("https://serene-dawn-74407.herokuapp.com/api/users/get-profile", {
					method: "GET",
					headers: {
						"Authorization" : `Bearer ${token}`,
						"Content-Type" : "application/json"
					}
				}).then(result=>result.json())
				.then(result=>{
					
					// console.log(result);

					setUser({
						id: result._id,
						isAdmin: result.isAdmin,
						name: result.firstName
					});

					// alert('You are logged in successfully'); //remove after?

					history.push('/home');

				})

			} else {

				swal('Unable to login. Kindly try again.')
			}

		})

	}

	console.log(user);

	return (
		<Container fluid>
		<div className = "row">
			<div className = "col-12 col-md-6 p-0">
				<div id = "bg-home">
					<div className="d-flex d-block d-md-none justify-content-center">
						<Form className="loginFormSmall rounded pb-5" onSubmit={(e)=>{loginUser(e)}}>
							<div className = "home-brand text-center">
								<h3>THE</h3>
								<h1>PIZZA DISTRICT</h1>
								{/*<img className="arrows mt-3" src="images/arrows.png"/>*/}
								<img className="road" src="images/road.png"/>
							</div>
						  <Form.Group className="mb-3" controlId="formBasicEmail">
						    <Form.Label>Email address:</Form.Label>
						    <Form.Control className="inputForm" type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} />
						  </Form.Group>

						  <Form.Group className="mb-3" controlId="formBasicPassword">
						    <Form.Label>Password:</Form.Label>
						    <Form.Control className="inputForm" type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
						  </Form.Group>

						  <Button variant="outline-dark" type="submit">
						    Log In
						  </Button>
						  <small className="ml-2">Not yet a member? <a href="/register">Sign up here</a></small>
						</Form>

					</div>
				</div>
			</div>
			<div className = "col-12 col-md-6 p-0 ">
			<div className="d-none d-md-block">
				<div className = "home-brand text-center">
					<h3>THE</h3>
					<h1>PIZZA DISTRICT</h1>
					{/*<img className="arrows mt-3" src="images/arrows.png"/>*/}
					<img className="road" src="images/road.png"/>
				</div>
				{/*<h1 className="text-center">Login Page</h1>*/}
				<div className="d-flex justify-content-center">
					<Form className="loginForm" onSubmit={(e)=>{loginUser(e)}}>
					  <Form.Group className="mb-3" controlId="formBasicEmail">
					    <Form.Label>Email address:</Form.Label>
					    <Form.Control className="inputForm" type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} />
					  </Form.Group>

					  <Form.Group className="mb-3" controlId="formBasicPassword">
					    <Form.Label>Password:</Form.Label>
					    <Form.Control className="inputForm" type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
					  </Form.Group>

					  <Button variant="outline-dark" type="submit">
					    Log In
					  </Button>
					  <small className="ml-2">Not yet a member? <a href="/register">Sign up here.</a></small>
					</Form>

				</div>
			</div>

				{/*<a href="https://www.vecteezy.com/free-vector/crossed-arrows">Crossed Arrows Vectors by Vecteezy</a>*/}
			</div>
		</div>
			
				
		
		</Container>

	)

}