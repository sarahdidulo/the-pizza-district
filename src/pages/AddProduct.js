import React, {useState, useContext} from 'react';

import {Form, Button, Container} from 'react-bootstrap';

import {Redirect, useHistory} from 'react-router-dom';

import UserContext from './../UserContext';

import swal from 'sweetalert';


export default function AddProduct(){

let history = useHistory();
let token = localStorage.getItem('token');

let [name, setName] = useState('');
let [description, setDescription] = useState('');
let [price, setPrice] = useState('');
let [imgURL, setImgURL] = useState('');
const {user, setUser} = useContext(UserContext);

if(user.isAdmin == "false"){
		localStorage.clear();
		setUser({
			id: null,
			isAdmin: null,
			name: null
		})
		history.push('/');

	}

const addProduct = (e) => {
	e.preventDefault();
	fetch("https://serene-dawn-74407.herokuapp.com/api/products/create-product", {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: name,
			description: description,
			price: price,
			imgURL: imgURL
		})

	}).then(result=>result.json())
	.then(result=>{
		if(result == true){
			swal("","Product was successfully created","success");
			history.push('/products');
			// handleCloseAdd();
			// fetchAllProducts();
		} else {
			swal("Product was not added - kindly try again.")
		}
	})
}

	return (
		<Container>
			<div className="row">
				<div className="col-12 col-md-6 offset-md-3">
					<div className="addProductPage">
						<div className="headerAddProd text-center">
							<h1>Add a Product</h1>
							<img src="images/pizza-icon.png"/>
						</div>
					    	<Form onSubmit={(e)=>{addProduct(e)}} > 
						    	<Form.Group className="mb-3" controlId="formBasicEmail">
						    	  <Form.Label>Name:</Form.Label>
						    	  <Form.Control className="rounded-0" type="text" onChange={(e)=>{setName(e.target.value)}}/>
						    	</Form.Group>

						    	<Form.Group className="mb-3" controlId="formBasicEmail">
						    	  <Form.Label>Description:</Form.Label>
						    	  <Form.Control className="rounded-0" type="text" onChange={(e)=>{setDescription(e.target.value)}}/>
						    	</Form.Group>

						    	<Form.Group className="mb-3" controlId="formBasicEmail">
						    	  <Form.Label>Price: </Form.Label>
						    	  <Form.Control className="rounded-0" type="number" onChange={(e)=>{setPrice(e.target.value)}}/>
						    	</Form.Group>

						    	<Form.Group className="mb-3" controlId="formBasicEmail">
						    	  <Form.Label>Image URL:</Form.Label>
						    	  <Form.Control className="rounded-0" type="text" onChange={(e)=>{setImgURL(e.target.value)}}/>
						    	</Form.Group>
						    	<Button className="rounded-0" variant="dark" type="submit">
						    	  Save Changes
						    	</Button>
						    </Form>
				    </div>
			    </div>
		    </div>
		 </Container>
		)
}