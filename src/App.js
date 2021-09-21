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

	// const unsetUser = () => {
	// 	return true;
	// }
	
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
						name: result.firstName
					});
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


	return (

		<UserContext.Provider value = {{user, setUser}}>
			<BrowserRouter>
				<AppNav/>
				<Switch>	
					{/*<Route exact path = "/com1" component={Component1}/>
					<Route exact path= "/com2" component={Component2}/>*/}
					<Route exact path="/home" component={Home}/>
					<Route exact path="/products" component={Products}/>
					<Route exact path="/register" component={Register}/>
					<Route exact path="/login" component={Login}/>
					{/*<Route exact path="/logout" component={Logout}/>*/}
				</Switch>
			</BrowserRouter>
		</UserContext.Provider>

	);
}