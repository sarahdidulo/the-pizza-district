import React from 'react';

export default function Order(props){

	const {order} = props;
	let productList;
	productList = order.products.map((product)=>{
			return(
			<tr>
				<td>{product.name}</td>
				<td>Php {product.price}</td>
				<td>{product.quantity}</td>
				<td>Php {product.subtotal}</td>
			</tr>
			)
		})
	return productList;
}