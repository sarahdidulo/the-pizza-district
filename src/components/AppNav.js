
import React, {Fragment, useContext} from 'react';

import  {Link, NavLink, useHistory} from 'react-router-dom';
import {Nav, Navbar, Container} from 'react-bootstrap';
import UserContext from './../UserContext';

export default function AppNav() {

	const {user, setUser} = useContext(UserContext);

	// console.log("from Navbar", user);

	let history = useHistory();

	// let navLinks;

	const logOut = () => {
		//insert swal for confirmation to log out

		localStorage.clear();
		setUser({
			id: null,
			isAdmin: null,
			name: null
		})

		history.push("/login");
	}

	let checkUser = (user.id !== null)?
			 
				<Fragment>
					<Nav.Link href="/products">Menu</Nav.Link>
					<Nav.Link onClick={logOut}>Log Out</Nav.Link>
				</Fragment>
			
				:
			// console.log("hello hello");

				<Fragment>
				<Nav.Link href="/login">Login</Nav.Link>
				<Nav.Link href="/register">Register</Nav.Link>
				</Fragment>

	return(
		/*
		<Fragment>
	        <Nav.Link as={NavLink} to="/com1">Com1 </Nav.Link>
	        <Nav.Link as={NavLink} to = "/com2">Com2</Nav.Link>
      	</Fragment>
      	*/

      	<Navbar id= "thisNav" expand="lg" variant="dark" className="d-flex" fixed="top">
      	  <Container>
      	    <Navbar.Brand id="navbrand" href="/home">THE PIZZA DISTRICT</Navbar.Brand>
      	    <Navbar.Toggle aria-controls="basic-navbar-nav" />
      	    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-lg-end">
      	      <Nav className="me-auto">
      	        <Nav.Link href="/home">Home</Nav.Link>
      	       {checkUser}
      	      </Nav>
      	    </Navbar.Collapse>
      	  </Container>
      	</Navbar>

	)

}