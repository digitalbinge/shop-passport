import React from 'react';
import { Input, Control, Icon, Button, Container, Box, Title } from 'reactbulma';
// import axios from 'axios';

export default ({ handleSignIn, loginError }) => (
	
	<Container>
		<div>{ loginError && loginError }</div>
		<Box>
			<Title>Login</Title>
			<form onSubmit={handleSignIn}>
				<Control hasIconsLeft>
			    <Input placeholder="email" name="email" type="email" />
			    <Icon left>
			      <i className="fa fa-envelope"/>
			    </Icon> <br />	 
				</Control> 
				<Control hasIconsLeft>   
		     	<Input placeholder="password" name="password" type="password" />
		     	<Icon left>
		       	<i className="fa fa-key"/>
		     	</Icon> <br /> <br />	
				</Control> 
				<Button>Login</Button>
			</form>
		</Box>
	</Container>
)

