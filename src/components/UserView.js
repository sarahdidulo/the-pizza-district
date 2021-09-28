import React, {useState, useEffect, useContext} from 'react';

import {Container, Card, Button} from 'react-bootstrap';

import UserContext from './../UserContext';

import swal from 'sweetalert';

export default function UserView(){

let [products, setProducts] = useState([]);
let token = localStorage.getItem('token');
// const [countItems, setCountItems] = useState(0);
const {user, setUser} = useContext(UserContext);
const {countItems, setCountItems} = useContext(UserContext);
// const {getCount} = props;
// let [qty, setQty] = useState('');
// let qty = [];

	let fetchAllProducts = () => {
		fetch("https://serene-dawn-74407.herokuapp.com/api/products", {
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

			// console.log("result", result);
			setProducts(productsArr);
			console.log("fetched products", products);

	})

	}

	// let setQuantity = (id, qty) =>{
	// 	let arrProd = [];
	// 	arrProd.filter((element)=> )
	// 	arr.push({id: id, quantity: qty});
	// }

	const addToCart = (e, id, qty) => {
		console.log("value of qty", qty);
		console.log("value of id", id);
		e.preventDefault();
		fetch(`https://serene-dawn-74407.herokuapp.com/api/orders/${id}/add-to-cart`, {
			method: "POST",
			headers: {
				"Authorization" : `Bearer ${token}`,
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({
				quantity: qty
			})
		}).then(result=>result.json())
		.then(result=>{
			if(result == true){
				getCount();
				swal("",`Product was successfully added`,"success");
			}
		})
	}


	const getCount = () => {

		fetch("https://serene-dawn-74407.herokuapp.com/api/users/get-profile",{
			method: "GET",
			headers: {
				"Authorization" : `Bearer ${token}`,
				"Content-Type": "application/json"
			}}).then(result=>result.json())
			.then(result=>{

				setUser({
					id: result._id,
					isAdmin: result.isAdmin,
					name: result.firstName
				});
			})

		if(token != null && user.id != null){

			fetch("https://serene-dawn-74407.herokuapp.com/api/orders/current-order", {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Content-Type": "application/json"
				}
			}).then(result=>result.json())
			.then(result=>{
				if(result != false){
					let count = 0;
					console.log("cart", result);
				  	result.products.forEach((element)=>{
						count += element.quantity;
					})
					setCountItems(count);
				}
			})

		} else {
			setCountItems(0);
		}
	}

	useEffect(()=>{ 

		fetchAllProducts();
		console.log("value of counItems", countItems);
		getCount();
		console.log("these are the products", products);

	}, []);

	// console.log("value of counItems", countItems);


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
		    <Card.Title className="cardTitle m-0" key = {element._id}>{element.name}</Card.Title>
	      <Card.Text className="cardText d-flex m-0">
		      <p className="desc">{element.description}</p>
		      
		    <div className="price text-right">
		      <p>Php {element.price}</p>
		     </div>
		    </Card.Text>
		    
		   		{(user.id != null) ?
		   		<div className="cart-add text-center d-flex justify-content-center">
				    <Button className = "btn mr-auto rounded-0" variant="dark" elementId = {element._id} onClick={(e)=>{addToCart(e, element._id, document.getElementById(element._id).value)}}>Add to Cart</Button>
				    <p className="qty mr-2 p-0 d-block align-self-end">Qty:</p><input className="form-control text-center" id = {element._id} type="number" placeholder="0" min="0"/>
		  	    </div>
			    : null
				}
			    
		  </Card.Body>
		</Card>  
		  	
		
		</div> //end of mapping html


		) 
	});

	return(
		<Container fluid>
		
		<div className="row text-center">
			<div className="col-12">
				<h1 className="userView-title">MENU</h1>
				{mappedProducts}
			</div>
		</div>
		</Container>
	);
}