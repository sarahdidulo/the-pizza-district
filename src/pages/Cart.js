import React, {useState, useEffect, useContext} from 'react';

import {Container, Button} from 'react-bootstrap';

import {useHistory} from 'react-router-dom';

import UserContext from './../UserContext';

import swal from 'sweetalert';

export default function Cart(){

let token = localStorage.getItem('token');
let [cartProducts, setCartProducts] = useState([]);
let [cartTotal, setCartTotal] = useState('');
let [cartId, setCartId] = useState('');
let currentCart;
let history = useHistory();
let {countItems, setCountItems} = useContext(UserContext);

const onlinePayment = (e, id) => {
	e.preventDefault();

	swal({
	  title: "Are you sure?",
	  text: "Please confirm payment.",
	  icon: "warning",
	  buttons: true
	})
	.then((willDelete) => {
	  if (willDelete) {
	  	fetch(`https://serene-dawn-74407.herokuapp.com/api/orders/${id}/checkout`, {
			method: "PUT",
			headers: {
				"Authorization": `Bearer ${token}`,
			}
		}).then(result=>result.json())
		.then(result=>{
			console.log(result);
			if(result==true){
				//alert(`Order is successfully paid`);
				setCountItems(0);
				swal("Thank you for choosing our products! :-)", {
				  icon: "success",
				});

				window.setTimeout(function() {
				    history.push('/home');
				}, 2000);
			} else {
				swal(`Encountered an error. Please try again.`);
			}
		})

	    
	  } else {
	    swal("Order is not paid yet");
	    // window.location.replace('./currentOrder.html');
	  }
	});

}



	const getCart = () => {
		fetch("https://serene-dawn-74407.herokuapp.com/api/orders/current-order", {
			method: "GET",
			headers: {
				"Authorization" : `Bearer ${token}`,
				"Content-Type" : "application/json"
			}
		}).then(result=>result.json())
		.then((result)=>{
			
			console.log("result", result);
			setCartTotal(result.totalAmount);
			setCartId(result._id);
			if(result != false){
				currentCart = result.products.map((element)=>{

					return element;
				})

				setCartProducts(currentCart);
			} 
			
		})
	}
	
	useEffect(()=>{
		getCart();
	}, [])

	console.log("current cart", cartProducts);


	
		let cartItems = cartProducts.map((element)=>{
			return(
				<tr>	
					<td>{element.name}</td>
					<td>Php {element.price}</td>
					<td>{element.quantity}</td>
					<td>Php {element.subtotal}</td>
				</tr>
			)
		})
	
	return(
		<Container fluid>
			<div className="row">
				<div className="cart col-12 col-md-6 offset-md-3">

				{

					(cartProducts.length != 0) ? //check if there are no items in the cart array
					<div>
						<h1 className="cartHeader">Your Cart</h1>
							<table className="table">
								<thead>
									<tr>
										<th scope="col">Product Name</th>
										<th scope="col">Price</th>
										<th scope="col">Quantity</th>
										<th scope="col">Subtotal</th>
									</tr>
								</thead>
									{cartItems}
								<tr>
									<td><strong> TOTAL </strong></td>
									<td></td>
									<td></td>
									<td><strong>Php {cartTotal}</strong></td>
								</tr>
							</table>
							<div className="d-flex justify-content-end">
								<Button className="btn onlinePayment" onClick={(e)=>{onlinePayment(e, cartId)}}>Proceed to Checkout</Button>
							</div>
						</div>
						:

						<h2 className="displayNoItems">No Items yet. See our Full Menu <a href="/products">here!</a></h2>
					
				}

				</div>
			</div>
		</Container>
	)
}