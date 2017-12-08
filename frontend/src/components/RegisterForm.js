import React from 'react';
import { Input, Control, Icon, Button, Container, Box, Title } from 'reactbulma';

const RegisterForm = () => (
	<Container>
		<Box>
			<Title>Login</Title>
			<form>
				 <Control hasIconsLeft>
				     <Input placeholder="first name"/>
				     <Icon right>
				       <i className="fa fa-envelope"/>
				     </Icon> <br /> <br />	     
				     <Input placeholder="last name"/>
				     <Icon right>
				       <i className="fa fa-envelope"/>
				     </Icon> <br /> <br />
				     <Input placeholder="email"/>
				     <Icon right>
				       <i className="fa fa-envelope"/>
				     </Icon> <br /> <br />	     
				     <Input placeholder="password"/>
				     <Icon right>
				       <i className="fa fa-envelope"/>
				     </Icon> <br /> <br />	
				   </Control>
				   <Button>Login</Button>
			</form>
		</Box>
	</Container>
)

export default RegisterForm;