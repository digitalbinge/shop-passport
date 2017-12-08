import React from 'react';
import { Input, Control, Icon, Button, Container, Box, Title } from 'reactbulma';
// import axios from 'axios';

export default ({ handleRegisterSubmit, handleRegisterForm }) => (
	
	<Container>
		<Box>
			<Title>Login</Title>
			<form onSubmit={handleRegisterSubmit} >
				<Control hasIconsLeft>
			    <Input placeholder="First Name" name="firstName" type="text" />
			    <Icon left>
			      <i className="fa fa-user"/>
			    </Icon> 
				</Control> 
				<Control hasIconsLeft>   
		     	<Input placeholder="Last Name" name="lastName" type="text" />
		     	<Icon left>
		       	<i className="fa fa-user"/>
		     	</Icon>
				</Control> 
				<Control hasIconsLeft>   
		     	<Input placeholder="email" name="email" type="email" />
		     	<Icon left>
		       	<i className="fa fa-envelope"/>
		     	</Icon>
				</Control> 
				<Control hasIconsLeft>   
		     	<Input placeholder="password" name="password" type="password" />
		     	<Icon left>
		       	<i className="fa fa-key"/>
		     	</Icon>
				</Control>  
				<Control hasIconsLeft>   
		     	<Input placeholder="confirm password" name="confirmPassword" type="password" />
		     	<Icon left>
		       	<i className="fa fa-key"/>
		     	</Icon>
				</Control> 
				<Button>Register</Button>
				<Button onClick={handleRegisterForm}>Go To Login</Button>
			</form>
		</Box>
	</Container>
)

