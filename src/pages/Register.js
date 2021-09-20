import React , {useState, useEffect} from 'react';

import {
	Form,
	Container,
	Button
} from 'react-bootstrap';

import {Redirect, useHistory} from 'react-router-dom';

export default function Register(e){

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	// const [mobileNo, setMobileNo] = useState(''); //UNCOMMENT AFTERWARDS
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [disabled, setDisabled] = useState(true);

	let history = useHistory();

	const registerUser = (e) => {

		e.preventDefault();
		if(password != password2){
			alert("Please re-enter again your password");
		} else {

			fetch("https://pacific-falls-33363.herokuapp.com/api/users/check-email", {
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

					fetch("https://pacific-falls-33363.herokuapp.com/api/users/register", {
						method: "POST",
						headers: {
							"Content-Type" : "application/json"
						},
						body: JSON.stringify({
							firstName: firstName,
							lastName: lastName,
							// mobileNo: mobileNo,
							email: email,
							password: password
						})
					}).then(result=>result.json())
					.then(result=>{
						// console.log(result); //if return is true then use is successfully registered.
						if(result == true){
							alert("You successfully registered!");	
							history.push("/login");
						} else {
							alert("Not registered, please try again.");
						}
						
						// <Redirect to="/login" />
					})

				} else {
					alert('Email is already in use');
				}
			})	

		}

		
	}


	useEffect(()=>{

		console.log(firstName)
		console.log()
		if(firstName != '' && lastName != '' && email != '' && password != '' && password2 != ''){ //include mobileNo afterwards
			setDisabled(false);
		} else {
			setDisabled(true);
		}

	}, [firstName, lastName, email, password, password2]); //include mobileNo afterwards

	return(

		<Container fluid>
		<div className = "row">
			<div className = "col-12 col-md-8 offset-md-2 p-5">
			<h1 className = "text-center">Register</h1>
				<Form onSubmit={(e)=>{registerUser(e)}} > 
				  <Form.Group className="mb-3" controlId="formBasicEmail">
				    <Form.Label>First Name:</Form.Label>
				    <Form.Control type="text" placeholder="Enter First Name" onChange={(e)=>{setFirstName(e.target.value)}}/>
				  </Form.Group>

				  <Form.Group className="mb-3" controlId="formBasicEmail">
				    <Form.Label>Last Name:</Form.Label>
				    <Form.Control type="text" placeholder="Enter Last Name" onChange={(e)=>{setLastName(e.target.value)}}/>
				  </Form.Group>

				  {/*<Form.Group className="mb-3" controlId="formBasicEmail">
				    <Form.Label>Mobile Number</Form.Label>
				    <Form.Control type="text" placeholder="Enter Mobile number" onChange={(e)=>{setMobileNo(e.target.value)}}/>
				  </Form.Group>*/}

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

				  <Button variant="info" type="submit" disabled = {disabled}>
				    Submit
				  </Button>
				</Form>
			</div>
		</div>
		</Container>

	);

}