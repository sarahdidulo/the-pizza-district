import React, {useState, useEffect, useHistory, useContext} from 'react';

import {Container, Button} from 'react-bootstrap';

import UserContext from './../UserContext';

import Order from './../components/Order';
import swal from 'sweetalert';

export default function Profile(){

	const {user, setUser} = useContext(UserContext);
	let token = localStorage.getItem('token');
	const [orderHistory, setOrderHistory] = useState([]);
	let [name, setName] = useState('');
	let [price, setPrice] = useState('');
	let [quantity, setQuantity] = useState('');
	let [subtotal, setSubtotal] = useState('');

	let orders;
	

	const getOrderHistory = () => {
		fetch("https://serene-dawn-74407.herokuapp.com/api/orders/order-history", {
			method: "GET",
			headers: {
				"Authorization" : `Bearer ${token}`,
				"Content-Type" : "application/json"
			}
		}).then(result=>result.json())
		.then((result)=>{
			
			orders = result.map((element)=>{

				return element;
			})

			setOrderHistory(orders);
		})
	}
	
	useEffect(()=>{
		getOrderHistory();
	}, [])

	// console.log("orders: ", orderHistory);
	// let products;
	// const getProducts = (order) =>{
	// 	products = order.products.map((product)=>{
	// 		return(
	// 		<tr>
	// 			<td>{product.name}</td>
	// 			<td>{product.price}</td>
	// 			<td>{product.quantity}</td>
	// 			<td>{product.subtotal}</td>
	// 		</tr>
	// 		)
	// 	})
	// }

	// let productList;
	let orderList = orderHistory.map((order)=>{
		let productList;
		return(
			<table className="table">
				<thead>
					<tr>
					<td><strong>Order ID: {order._id}</strong></td>
					<td></td>
					<td></td>
					{/*<td><strong>Date of Purchase: {order.purchasedOn}</strong></td>*/}
					</tr>
					<tr className="cartHeader">
						<td>Product Name</td>
						<td>Price</td>
						<td>Quantity</td>
						<td>Subtotal</td>
					</tr>
				</thead>
					{ 
						/*
						order.products.forEach((product)=>{

							 <tr>
								<td>{product.name}</td>
								<td>{product.price}</td>
								<td>{product.quantity}</td>
								<td>{product.subtotal}</td>
							</tr>
						})*/
						
						<Order order={order}/>
					}
				<tr>
					<td><strong>TOTAL</strong></td>
					<td></td>
					<td></td>
					<td><strong>Php {order.totalAmount}</strong></td>
				</tr>
			</table>
		)
	})

	return(
		<Container fluid>
			<div className="row">
				<div className="cart col-12 col-md-6 offset-md-3">
					<h1 className="profilePage">Hey, {user.firstName}! Welcome back :)</h1>
					{

						(orderHistory.length != 0) ?
							<div>
								<h2>See your order history below:</h2>
								{orderList}
							</div>
						:
							<h2>See our full menu! We prepared the best for you :-) </h2>
					}
					
				</div>
			</div>
		</Container>
	)
}