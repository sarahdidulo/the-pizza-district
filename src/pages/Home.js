import React from 'react';

import {Container, Carousel, Button} from 'react-bootstrap';

export default function Home(){



	return(

		<Container fluid>
			<div className = "row">
				<div className = "col-12 text-center p-0">
					<div className = "home-pizza">
						<Carousel>
						  <Carousel.Item className="pizzas">
						    <img
						      className="d-block w-100"
						      src="images/pizza1.jpg"
						      alt="First slide"
						    />
						    <Carousel.Caption>
						    <div className="text-left">
						      <h2>Supreme Pizza</h2>
						      <Button href="/products" className="btn rounded-0 pizzaButton">See the Full Menu</Button>
						     </div>
						      {/*<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
						      
						    </Carousel.Caption>
						  </Carousel.Item>
						  <Carousel.Item className="pizzas">
						    <img
						      className="d-block w-100"
						      src="images/pizza2.jpg"
						      alt="Second slide"
						    />

						    <Carousel.Caption>
						     <div className="text-left">
						      <h2>Vegetable Pizza</h2>
						      <Button href="/products" className="btn rounded-0 pizzaButton">See the Full Menu</Button>
						     </div>
						    {/*  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
						    </Carousel.Caption>
						  </Carousel.Item>
						  <Carousel.Item className="pizzas">
						    <img
						      className="d-block w-100"
						      src="images/pizza3.jpg"
						      alt="Third slide"
						    />

						    <Carousel.Caption>
						      <div className="text-left">
						      <h2>Pepperoni Pizza</h2>
						      <Button href="/products" className="btn rounded-0 pizzaButton">See the Full Menu</Button>
						     </div>
						     {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>*/}
						    </Carousel.Caption>
						  </Carousel.Item>
						</Carousel>

						<div className="history">
						<h1>OUR HISTORY</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						</div>

						<div className="contact">
						<h1>CONTACT US</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
						cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);

}