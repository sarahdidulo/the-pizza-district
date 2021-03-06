import React, {useEffect, useState, Fragment} from 'react';
import {Card, Button, Container, Form, Modal} from 'react-bootstrap';
import swal from 'sweetalert';

export default function AdminView(){

	let [products, setProducts] = useState([]);
	let token = localStorage.getItem('token');

	let [name, setName] = useState('');
	let [description, setDescription] = useState('');
	let [price, setPrice] = useState('');
	let [imgURL, setImgURL] = useState('');
	let [identifier, setId] = useState('');
	let calledModal;
	let [displayBlockVal, setDisplayBlockVal] = useState('none');
	let [displayCardBlockVal, setDisplayCardBlockVal] = useState('inline-block');
	let [editId, setEditId] = useState('');


	let [show, setShow] = useState(false);
	let [showAdd, setShowAdd] = useState(false);
	// const [modalProd, setModalProd] = useState('');

	let handleClose = () => setShow(false);
	let handleCloseAdd = () => setShowAdd(false);
	// const handleShow = (id) => {setModalProd(id);};

	let fetchAllProducts = () => {
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
					swal({
					  title: "Are you sure you want to archive this?",
					  text: "",
					  icon: "warning",
					  buttons: true,
					  dangerMode: true,
					})
					.then((willDelete) => {
					  if (willDelete) {
					  		swal(`Product was archived.`);
					  		fetchAllProducts();	
					    } 
					});
				} else {
					swal(`Product was not archived. Please try again`);
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
					swal("","Product was successfully unarchived","success");
				} else {
					swal(`Product was not unarchived. Please try again`);
				}
		})
	}

	const editProduct = (e, id) => {
		fetch(`https://serene-dawn-74407.herokuapp.com/api/products/${id}/edit`, {
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
				swal("","Product edited successfully","success");
				handleClose();
			} else {
				swal(`Product was not updated. Please try again`);	
			}
		})

	}

	const showEditInput = (id) => {
		console.log("inside edit input");
		setEditId(id);
		// fetchAllProducts();
	}

	const displayBlock = () => {
		console.log("insde display block");
		setDisplayBlockVal('inline-block');
		setDisplayCardBlockVal('none');
	}

	const deleteProduct = (id) => {
		fetch(`https://serene-dawn-74407.herokuapp.com/api/products/${id}/delete`, {
			method: "DELETE",
			headers: {
				"Authorization" : `Bearer ${token}`,
				"Content-Type" : "application/json"
			}
		}).then(result=>result.json())
		.then(result=>{
			if(result==true){
				swal({
				  title: "Are you sure you want to delete this?",
				  text: "",
				  icon: "warning",
				  buttons: true,
				  dangerMode: true,
				})
				.then((willDelete) => {
				  if (willDelete) {
				  		swal(`Product was deleted`);
				  		fetchAllProducts();	
				    } 
				});
				
			} else{
				swal(`Product was not yet deleted`);
			}
		})
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
				handleCloseAdd();
				fetchAllProducts();
			} else {
				swal("Product was not added - kindly try again.")
			}
		})
	}

	const showAddModal = () => {
		setShowAdd(true);
	}

	const showModal = (id) => {
		console.log("inside showModal");
		fetch(`https://serene-dawn-74407.herokuapp.com/api/products/${id}`, {
			method: "GET",
			headers: {
				"Authorization" : `Bearer ${token}`,
				"Content-Type" : "application/json"
			}
		}).then(result=>result.json())
		.then(result=>{
			console.log(result);
			console.log(result.name);

			setName(result.name);
			setDescription(result.description);
			setPrice(result.price);
			setImgURL(result.imgURL);
			setId(result._id);
			setShow(true);
		})

		console.log("fetched name:", name);
		console.log("show state:", show);
		
	}

	// let calledModal = () => {

	// }

	useEffect(()=>{ 

		fetchAllProducts();
	
		console.log("these are the products", products);

	}, []);

	let mappedProducts = products.map((element)=>{
		return (
		
		// {<h1>{element.name}</h1>}

		<div className = "product d-inline-block p-4">
		<Card className="pizzaCard" style={{ width: '18rem' }} >
		<div className="pizzaPic">
		  <Card.Img variant="top" src={element.imgURL} />
		 </div>
		 {/*{(element._id == {editId}) ? (console.log("inside product html"), setDisplayBlockVal('inline-block'), setDisplayCardBlockVal('none')) : null
		 }*/}
		  <Card.Body className="text-left d-inline-block">

		  	<div className="d-flex">
		    <Card.Title className="cardTitle m-0 w-70" style={{display: `${displayCardBlockVal}`}} key = {element._id}>{element.name}</Card.Title>
		    <div className="form-group" style={{display: `${displayBlockVal}`}}>
		    	<input className="form-control" placeholder={element.name} type="text"/>
		    </div>
		  	<Button className = "btn editBtn align-items-right" onClick={()=>{showModal(element._id)}}><img src="images/pencil.png"/></Button>
		    </div>
		    	
		  
		    <Card.Text className="cardText d-flex m-0 pt-1">
		      <p className="desc" style={{display: `${displayCardBlockVal}`}}>{element.description}</p>
		      <div className="form-group" style={{display: `${displayBlockVal}`}}>
		    	<input className="form-control" placeholder={element.description}type="text"/>
		    </div>
		    <div className="price text-right">
		      <p style={{display: `${displayCardBlockVal}`}}>Php {element.price}</p>
		     </div>
		      <div className="form-group" style={{display: `${displayBlockVal}`}}>
		    	<input className="form-control" placeholder={element.description} type="text"/>
		   	 </div>
		    </Card.Text>
		    <div className="card-button text-center">
		    
		    {
		    	(element.isActive == true) ?

		    	
		    	<Button className = "btn archiveBtn mr-2 rounded-0" onClick={()=>{archiveProduct(element._id)}}>Archive</Button> :
		    	<Button className = "btn unarchiveBtn mr-2 rounded-0" variant="success" onClick={()=>{unarchiveProduct(element._id)}}>Unarchive</Button>
		    	
		    }
		    <Button className = "btn formatBtn rounded-0" variant="danger" onClick={()=>{deleteProduct(element._id)}}>Delete</Button>
		    </div>
		  </Card.Body>
		</Card>

		 {/* <Button variant="primary" >
		    Launch demo modal
		  </Button>*/}
		  {/*continue to check if id is the same as the state body -> if yes, set HandleShow(true) else apply as well HandleShow(false) to other elements*/}

		  		 
		  
		  	
		
		</div> //end of mapping html


		) 
	});
	// fetchAllProducts();
	// console.log("these are the products", products);
	// products.forEach((element)=>console.log(element.name))
	return (
		<Container fluid>
			<div className = "row">
				<div className = "col-12 text-center">
				<h1 className="adminpage-title">MENU</h1>
				<div className="addProd text-center">
					<Button className="btn add-button" variant="info" onClick={showAddModal}>Add a Product</Button>
				</div>
					{mappedProducts}

					{(show == true) ?
					<Modal show={show} onHide={handleClose}>
					    <Modal.Header closeButton>
					      <Modal.Title>Edit Product</Modal.Title>
					    </Modal.Header>
					    <Modal.Body>
					    	<Form onSubmit={(e)=>{editProduct(e, identifier)}} > 
						    	<Form.Group className="mb-3" controlId="formBasicEmail">
						    	  <Form.Label>Name:</Form.Label>
						    	  <Form.Control type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
						    	</Form.Group>

						    	<Form.Group className="mb-3" controlId="formBasicEmail">
						    	  <Form.Label>Description:</Form.Label>
						    	  <Form.Control type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
						    	</Form.Group>

						    	<Form.Group className="mb-3" controlId="formBasicEmail">
						    	  <Form.Label>Price: </Form.Label>
						    	  <Form.Control type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
						    	</Form.Group>

						    	<Form.Group className="mb-3" controlId="formBasicEmail">
						    	  <Form.Label>imgURL </Form.Label>
						    	  <Form.Control type="text" value={imgURL} onChange={(e)=>{setImgURL(e.target.value)}}/>
						    	</Form.Group>
						    	<Button className= "mr-1" variant="secondary" onClick={handleClose}>
						    	  Close
						    	</Button>
						    	<Button variant="info" onClick={(e)=>{editProduct(e, identifier)}}>
						    	  Save Changes
						    	</Button>
					    	</Form>
					    </Modal.Body>
					    <Modal.Footer>
					    </Modal.Footer>
					  </Modal>
					  : null
					}

					{(showAdd == true) ?
					<Modal show={showAdd} onHide={handleCloseAdd}>
					    <Modal.Header closeButton>
					      <Modal.Title>Add a Product</Modal.Title>
					    </Modal.Header>
					    <Modal.Body>
					    	<Form onSubmit={(e)=>{addProduct(e)}} > 
						    	<Form.Group className="mb-3" controlId="formBasicEmail">
						    	  <Form.Label>Name:</Form.Label>
						    	  <Form.Control type="text" onChange={(e)=>{setName(e.target.value)}}/>
						    	</Form.Group>

						    	<Form.Group className="mb-3" controlId="formBasicEmail">
						    	  <Form.Label>Description:</Form.Label>
						    	  <Form.Control type="text" onChange={(e)=>{setDescription(e.target.value)}}/>
						    	</Form.Group>

						    	<Form.Group className="mb-3" controlId="formBasicEmail">
						    	  <Form.Label>Price: </Form.Label>
						    	  <Form.Control type="number" onChange={(e)=>{setPrice(e.target.value)}}/>
						    	</Form.Group>

						    	<Form.Group className="mb-3" controlId="formBasicEmail">
						    	  <Form.Label>Image URL:</Form.Label>
						    	  <Form.Control type="text" onChange={(e)=>{setImgURL(e.target.value)}}/>
						    	</Form.Group>
						    	<Button className= "mr-1" variant="secondary" onClick={handleCloseAdd}>
						    	  Close
						    	</Button>
						    	<Button variant="info" type="submit">
						    	  Save Changes
						    	</Button>
					    	</Form>
					    </Modal.Body>
					    <Modal.Footer>
					    </Modal.Footer>
					  </Modal>
					  : null
					}	 
				</div>
			</div>
		</Container>
		
	);	

}