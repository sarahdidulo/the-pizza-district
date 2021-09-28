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

						<div className="px-5">
						<div className="history">
						<h1>OUR HISTORY</h1>
						<img src="images/pizza-icon.png"/>
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
						<h1>VISIT US!</h1>
						<h1></h1>
						<p>Address: 1st Floor, Marina 101 - Dubai - United Arab Emirates</p>
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.382582344899!2d55.146381014843115!3d25.088907483946656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b5a98c576ef%3A0x12ca6648f27e99f5!2sMarina%20101!5e0!3m2!1sen!2sph!4v1631494344326!5m2!1sen!2sph" width="350" height="300" style={{border:0}} allowfullscreen="" loading="lazy"></iframe>
						
						</div>
						</div>

						<footer>
						<Container>
							<div className="row">
								<div className="col-12 d-flex flex-wrap justify-content-between p-3">
									<div className="col-12 col-md-4">
									<img className="quotes" src="images/quoteLeft.png"/><p className="d-inline px-3 quote">The pieces would fit altogether, like slices of pizza.</p><img className="quotes" src="images/quoteRight.png"/>
									</div>
									<div className="col-12 col-md-4 pt-2 pr-5 w-30">
									<p>Follow Us!</p>
									<a href="#"><img className="iconfb" src="images/fb.png"/></a>
									<a href="#"><img className="iconig" src="images/ig.png"/></a>
									</div>
									<div className="col-12 col-md-4 pt-2">
									<p>Contact Numbers:</p>
									<p>0917-762-5393</p>
									<p>0960-819-3516</p>
									</div>
									
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<div>
										<div><small>Icons by <a className="iconsRef" href="https://icons8.com/">Icons 8</a></small></div>
										<small>Terms of Service | Privacy Policy | © 2017 - 2021 Zuitt. All Rights Reserved</small>
									</div>
								</div>
							</div>
							</Container>
						</footer>
					</div>
				</div>
			</div>
		</Container>
	);

}