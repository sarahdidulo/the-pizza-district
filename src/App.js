import React, {Fragment, useState, useEffect} from 'react';

import {
	BrowserRouter,
	Switch,
	Route
} from 'react-router-dom';

import './Style.css';
import Component1 from './components/Component1';
import Component2 from './components/Component2';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import AddProduct from './pages/AddProduct';
// import Users from './pages/Users';
import AppNav from './components/AppNav';

import {Redirect} from 'react-router-dom';

import UserContext from './UserContext';

export default function App(){

	// const [count, setCount] = useState(0);
	// console.log("app here")

	let token = localStorage.getItem('token');
	const [user, setUser] = useState({
								id: null,
								isAdmin: null
							});
	const [countItems, setCountItems] = useState(0);
	

	// const unsetUser = () => {
	// 	return true;
	// }

	const checker = () =>{
		if(token != null && user.id == null){ //fetch for the first time if user was able to login (token was generated). This will set the user (UserContext) with the logged in user's details

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
						firstName: result.firstName,
						lastName: result.lastName
					});

					// getCount();
				})
		} 

		if(token == null && user.id != null){ //to be sure that user does not have a value if token is set to null (user was logged out)
			console.log("before setting to null", user);
			setUser({
				id: null,
				isAdmin: null,
				name: null
			});

		}

		if(token != null){

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
		checker();
	}, [])

	return (

		<UserContext.Provider value = {{user, setUser, countItems, setCountItems}}>
			<BrowserRouter>
				<AppNav/>
				<Switch>	
					{/*<Route exact path = "/com1" component={Component1}/>
					<Route exact path= "/com2" component={Component2}/>*/}
					<Route exact path="/home" component={Home}/>
					<Route exact path="/products" component={Products}/>
					<Route exact path="/register" component={Register}/>
					<Route exact path="/" component={Login}/>
					<Route exact path="/cart" component={Cart}/>
					<Route exact path="/profile" component={Profile}/>
					<Route exact path="/add-product" component={AddProduct}/>
					{/*<Route exact path="/users" component={Users}/>
*/}					{/*<Route exact path="/logout" component={Logout}/>*/}
				</Switch>
			</BrowserRouter>
		</UserContext.Provider>

	);
}