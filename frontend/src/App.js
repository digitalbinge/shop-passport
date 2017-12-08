import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import decodeJWT from 'jwt-decode';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { api, setJwt } from './api/init';

class App extends Component {
  state = {
    token: localStorage.getItem('token'),
    loginError: null,
    register: false,
    registerError: null
  }

  handleSignIn = async (event) => {
    event.preventDefault()
    const form = event.target
    const elements = form.elements

    try {
      const response = await api.post('/auth', {
          email: elements.email.value,
          password: elements.password.value
      })

      this.setState({
        token: response.data.token
      })

      setJwt(response.data.token)

    } catch (error) {
      this.setState({
        loginError: error.message
      })
    }

  }

  handleRegisterForm = (event) => {
    event.preventDefault()
    this.setState({
      register: true
    })
    console.log(this.state)
  }

  handleRegisterSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const elements = form.elements

    if (elements.password.value === elements.confirmPassword.value) {
      try {
        
        const response = await api.post('/auth/register', {
            firstName: elements.firstName.value,
            lastName: elements.lastName.value,
            email: elements.email.value,
            password: elements.password.value
        })

        this.setState({
          token: response.data.token
        })

        setJwt(response.data.token)

      } catch (error) {
        this.setState({
          registerError: error.message
        })
      }

    } else {
      alert('Passwords must match!')
    }
    
  }

  render() {
    const tokesDeets = this.state.token && decodeJWT(this.state.token)
    let displayFormHTML = null
    if (!this.state.register) {
      displayFormHTML = <LoginForm loginError={this.state.loginError} handleSignIn={this.handleSignIn} handleRegisterForm={this.handleRegisterForm} />
    } else {
      displayFormHTML = <RegisterForm handleRegisterSubmit={this.handleRegisterSubmit} />
    }


    return (
      <div className="App">
        { this.state.token ? (
          <p>
            Welcome {tokesDeets.email} <br/>
            You logged in at {new Date(tokesDeets.iat * 1000).toLocaleString()}<br/>
            Your token expires {new Date(tokesDeets.exp * 1000).toLocaleString()}<br/>
          </p>
        ) : (
          displayFormHTML
        )}
      </div>
    );
  }

  componentDidMount () {
    this.state.token && setJwt(this.state.token)
  }
}

export default App;
