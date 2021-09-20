import React, {Fragment, useState} from 'react';
import {Button, Container} from 'react-bootstrap';

export default function Component1(){
	// console.log("hello");
	const [count, setCount] = useState(0);

	return(
		<Container>
		<h1>COMPONENT 2</h1>
		<h1>Count: {count}</h1>
		<Button className="btn btn-primary" onClick={()=>{setCount(count + 1)}}>Test</Button>
		{/*<Button className = "btn btn-primary" onClick={setCount(count + 1)}> Add Count </Button>*/}
		</Container>
	);		
	
}