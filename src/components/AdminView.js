import React, {useEffect, useState, Fragment} from 'react';
import {Card, Button, Container, Form, Modal} from 'react-bootstrap';


export default function AdminView(){

	const [products, setProducts] = useState([]);
	let token = localStorage.getItem('token');

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [imgURL, setImgURL] = useState('');

	const [show, setShow] = useState(false);
	const [modalProd, setModalProd] = useState('');

	const handleClose = () => setShow(false);
	const handleShow = (id) => {setModalProd(id); setShow(true)};

	const fetchAllProducts = () => {
		fetch("https://serene-dawn-74407.herokuapp.com/api/products/all-products", {
			method: "GET",
			headers: {
				"Authorization" : `Bearer ${token}`,
				"Content-Type" : "application/json"
			}
		}).then(result=>result.json())
		.then(result=>{


			let productsArr = result.map((product)=> {

				return product;

			});

			console.log("result", result);
			setProducts(productsArr);
			console.log("fetched products", products);
	})

	}

	const archiveProduct = (id) => {
		console.log(id);
		fetch(`https://serene-dawn-74407.herokuapp.com/api/products/${id}/archive`, {
				method: "PUT",
				headers: {
					"Authorization": `Bearer ${token}`,
				}
			}).then(result=>result.json())
			.then(result=>{
				// console.log(result);
				if(result==true){
					fetchAllProducts();
					alert("Product was successfully archived")
				} else {
					alert(`Product was not archived. Please try again`);
				}
			})

			
	}

	const unarchiveProduct = (id) => {

		fetch(`https://serene-dawn-74407.herokuapp.com/api/products/${id}/unarchive`, {
				method: "PUT",
				headers: {
					"Authorization": `Bearer ${token}`,
				}
			}).then(result=>result.json())
			.then(result=>{
				console.log(result);
				if(result==true){
					fetchAllProducts();
					alert(`Product was successfully unarchived`);
				} else {
					alert(`Product was not unarchived. Please try again`);
				}
		})
	}

	const editProduct = (e, id) => {
		fetch(`http://localhost:3000/api/products/${id}/edit`, {
			method: "PUT",
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
			console.log(result);
			if(result==true){
				fetchAllProducts();
				alert("Product edited successfully");
			} else {
				alert(`Product was not updated. Please try again`);
			}
		})

	}

	useEffect(()=>{ 

		fetchAllProducts();
	
		console.log("these are the products", products);

	}, []);

	let mappedProducts = products.map((element)=>{
		return (
		
		// {<h1>{element.name}</h1>}
		<div className = "d-inline-block p-4">
		<Card style={{ width: '18rem' }} >
		  <Card.Img className= "pizzaPic" variant="top" src={element.imgURL} />
		  <Card.Body className="text-left">
		    <Card.Title key = {element._id}>{element.name}</Card.Title>
		    <Card.Text>
		      <p>{element.description}</p>
		      <p>Php {element.price}</p>
		    </Card.Text>
		    <Button className = "btn editBtn" variant="primary" onClick={()=>{handleShow(element._id)}}>Edit Product</Button>
		    {
		    	(element.isActive == true) ?

		    	<Button className = "btn archiveBtn" variant="info" onClick={()=>{archiveProduct(element._id)}}>Archive</Button> :
		    	<Button className = "btn unarchiveBtn" variant="success" onClick={()=>{unarchiveProduct(element._id)}}>Unarchive</Button>
		    }
		    
		  </Card.Body>
		</Card>

		 {/* <Button variant="primary" >
		    Launch demo modal
		  </Button>*/}

		  {
		  	(element._id === id) ? setMobileProd //continue to check if id is the same as the state body -> if yes, set HandleShow(true)
		  }

		  <Modal show={show} onHide={handleClose}>
		    <Modal.Header closeButton>
		      <Modal.Title>Edit Product</Modal.Title>
		    </Modal.Header>
		    <Modal.Body>
		    	<Form onSubmit={(e)=>{editProduct(e, element._id)}} > 
			    	<Form.Group className="mb-3" controlId="formBasicEmail">
			    	  <Form.Label>Name:</Form.Label>
			    	  <Form.Control type="text" placeholder={element.name} onChange={(e)=>{setName(e.target.value)}}/>
			    	</Form.Group>

			    	<Form.Group className="mb-3" controlId="formBasicEmail">
			    	  <Form.Label>Description:</Form.Label>
			    	  <Form.Control type="text" placeholder={element.description} onChange={(e)=>{setDescription(e.target.value)}}/>
			    	</Form.Group>

			    	<Form.Group className="mb-3" controlId="formBasicEmail">
			    	  <Form.Label>Price: </Form.Label>
			    	  <Form.Control type="number" placeholder={element.price} onChange={(e)=>{setPrice(e.target.value)}}/>
			    	</Form.Group>

			    	<Form.Group className="mb-3" controlId="formBasicEmail">
			    	  <Form.Label>imgURL </Form.Label>
			    	  <Form.Control type="text" placeholder={element.imgURL} onChange={(e)=>{setImgURL(e.target.value)}}/>
			    	</Form.Group>
			    	<Button variant="secondary" onClick={handleClose}>
			    	  Close
			    	</Button>
			    	<Button variant="primary" onClick={handleClose}>
			    	  Save Changes
			    	</Button>
		    	</Form>
		    </Modal.Body>
		    <Modal.Footer>
		    </Modal.Footer>
		  </Modal>
		</div>


		)
	});
	// fetchAllProducts();
	// console.log("these are the products", products);
	// products.forEach((element)=>console.log(element.name))
	return (
		<Container fluid>
			<div className = "row d-flex flex-wrap text-center">
				<div className = "col-12">
					{mappedProducts}
				</div>
			</div>
		</Container>
		
	);	

}