import React, {useContext} from 'react';

import UserContext from './../UserContext';

import AdminView from './../components/AdminView';

import UserView from './../components/UserView';

export default function Products(){

	const {user, setUser} = useContext(UserContext);

	// console.log(user.isAdmin);
	return(
			
		(user.isAdmin == "true") ? <AdminView/> : <UserView/>
		
	);
}