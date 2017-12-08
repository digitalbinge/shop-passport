import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import decodeJWT from 'jwt-decode';
import LoginForm from './components/LoginForm';
import { api, setJwt } from './api/init';

class App extends Component {
  state = {
    token: localStorage.getItem('token'),
    loginError: null 
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

  render() {
    const tokesDeets = this.state.token && decodeJWT(this.state.token)

    return (
      <div className="App">
        { this.state.token ? (
          <p>
            Welcome {tokesDeets.email} <br/>
            You logged in at {new Date(tokesDeets.iat * 1000).toLocaleString()}<br/>
            Your token expires {new Date(tokesDeets.exp * 1000).toLocaleString()}<br/>
          </p>
        ) : (
          <LoginForm loginError={this.state.loginError} handleSignIn={this.handleSignIn} />
        )}
      </div>
    );
  }

  componentDidMount () {
    this.state.token && setJwt(this.state.token)
  }
}

export default App;
