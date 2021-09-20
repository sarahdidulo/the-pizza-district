import React, {Fragment, useState} from 'react';

import {
	BrowserRouter,
	Switch,
	Route
} from 'react-router-dom';

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
	const [user, setUser] = useState({
								id: null,
								isAdmin: null
							});

	const unsetUser = () => {
		return true;
	}

	return (

		<UserContext.Provider value = {{user, setUser, unsetUser}}>
			<BrowserRouter>
				<AppNav/>
				<Switch>	
					{/*<Route exact path = "/com1" component={Component1}/>
					<Route exact path= "/com2" component={Component2}/>*/}
					<Route exact path="/register" component={Register}/>
					<Route exact path="/login" component={Login}/>
					<Route exact path="/products" component={Products}/>
					<Route exact path="/home" component={Home}/>
				</Switch>
			</BrowserRouter>
		</UserContext.Provider>

	);
}