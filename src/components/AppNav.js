
import React, {Fragment, useContext, useState, useEffect} from 'react';

import  {Link, NavLink, useHistory} from 'react-router-dom';
import {Nav, Navbar, Container} from 'react-bootstrap';
import UserContext from './../UserContext';

import swal from 'sweetalert';

export default function AppNav() {

	const {user, setUser} = useContext(UserContext);
	const {countItems, setCountItems} = useContext(UserContext);
	// const [countItems, setCountItems] = useState(0);
	let token = localStorage.getItem('token');
	// console.log("from Navbar", user);

	let history = useHistory();

	// let navLinks;

	const logOut = () => {
		//insert swal for confirmation to log out

		swal({
		  title: "Are you sure?",
		  text: "Logging out? Click ok to confirm.",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		  		localStorage.clear();
		  		setUser({
		  			id: null,
		  			isAdmin: null,
		  			name: null
		  		})
		    	history.push("/");
		    } 
		});

		
	}

	// useEffect(()=>{
	// 	if(token != null){
	// 		fetch("https://serene-dawn-74407.herokuapp.com/api/orders/current-order", {
	// 			method: "GET",
	// 			headers: {
	// 				"Authorization": `Bearer ${token}`,
	// 				"Content-Type": "application/json"
	// 			}
	// 		}).then(result=>result.json())
	// 		.then(result=>{
	// 			if(result != false){
	// 				let count = 0;
	// 				console.log("cart", result);
	// 			  	result.products.forEach((element)=>{
	// 					count += element.quantity;
	// 				})
	// 				setCountItems(count);
	// 			}
	// 		})

	// 	}

	// }, [])
	

	console.log(user)
	let checkUser = (user.id != null && user.isAdmin == "false") ?
					<Fragment>
						<Nav.Link className="link" href="/products">Menu</Nav.Link>
						<Nav.Link className="link" href="/profile">Profile</Nav.Link>
						<Nav.Link className="link" href="/cart"><img src="images/cart.png"/><span className="badge badge-pill badge-danger">{countItems}</span></Nav.Link>
						
						<Nav.Link className="link logOut pl-lg-3" onClick={logOut}>Log Out</Nav.Link>
					</Fragment>
					: (user.id != null && user.isAdmin == "true") ?	
					<Fragment>
						<Nav.Link className="link" href="/products">Menu</Nav.Link>
						<Nav.Link className="link" href="/add-product">Add Product</Nav.Link>
						{/*<Nav.Link className="link" href="/users">Users</Nav.Link>*/}
						<Nav.Link className="link logOut pl-lg-3" onClick={logOut}>Log Out</Nav.Link>
					</Fragment>
					: (user.id == null) ?
					<Fragment>
						<Nav.Link className="link" href="/products">Menu</Nav.Link>
						<Nav.Link className="link" href="/">Login</Nav.Link>
						<Nav.Link className="link" href="/register">Sign Up</Nav.Link>
					</Fragment>
					: null
			

	return(
		/*ss
		<Fragment>
	        <Nav.Link as={NavLink} to="/com1">Com1 </Nav.Link>
	        <Nav.Link as={NavLink} to = "/com2">Com2</Nav.Link>
      	</Fragment>
      	*/

      	<Navbar id= "thisNav" expand="lg" variant="dark" className="d-flex m-0" fixed="top">
      	  <Container>
      	    <Navbar.Brand id="navbrand" href="/home">THE PIZZA DISTRICT</Navbar.Brand>
      	    <Navbar.Toggle aria-controls="basic-navbar-nav" />
      	    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-lg-end">
      	      <Nav className="me-auto">
      	        <Nav.Link className="link" href="/home">Home</Nav.Link>
      	       {checkUser}
      	      </Nav>
      	    </Navbar.Collapse>
      	  </Container>
      	</Navbar>

	)

}