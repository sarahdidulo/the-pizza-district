import React, {useState, useContext} from 'react';

import {Redirect, useHistory} from 'react-router-dom';

import {
	Container,
	Form,
	Button
} from 'react-bootstrap';

import UserContext from './../UserContext';

export default function Login(){

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const {user, setUser} = useContext(UserContext);

	let history = useHistory();

	const loginUser = (e) => {

		e.preventDefault();

		fetch("https://pacific-falls-33363.herokuapp.com/api/users/login", {
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

				fetch("https://pacific-falls-33363.herokuapp.com/api/users/get-profile", {
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
						isAdmin: result.isAdmin
					})

					alert('You are logged in successfully'); //remove after?

					history.push('/home');

				})

			} else {

				alert('Unable to login. Kindly try again.')
			}

		})

	}

	return (
		<Container fluid>
			<div className = "row">
				<div className = "col-12 col-md-8 offset-md-2 p-5">
				<h1 className="text-center">Login Page</h1>
					<Form onSubmit={(e)=>{loginUser(e)}}>
					  <Form.Group className="mb-3" controlId="formBasicEmail">
					    <Form.Label>Email address</Form.Label>
					    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} />
					  </Form.Group>

					  <Form.Group className="mb-3" controlId="formBasicPassword">
					    <Form.Label>Password</Form.Label>
					    <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
					  </Form.Group>

					  <Button variant="primary" type="submit">
					    Submit
					  </Button>
					</Form>
				</div>
			</div>
		</Container>

	)

}