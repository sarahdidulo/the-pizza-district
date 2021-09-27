import React, {useContext, useState} from 'react';

import UserContext from './../UserContext';

import AdminView from './../components/AdminView';

import UserView from './../components/UserView';

export default function Products(){

	const {user, setUser} = useContext(UserContext);
	// const [countItems, setCountItems] = useState(0);
	let token = localStorage.getItem('token');


	
	// console.log(user.isAdmin);
	return(
			
		(user.isAdmin == "true") ? <AdminView /> : <UserView/>
		
	);
}