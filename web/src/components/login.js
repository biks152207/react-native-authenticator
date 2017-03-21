import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Card, CardTitle, CardText, RaisedButton, TextField } from 'material-ui';
import axios from 'axios';
import { connect } from 'react-redux';

class Login extends Component {

	/**
   * Class constructor.
   */
  constructor() {
    super();

    // set the initial component state
    this.state = {
      errorMessage: '',
      errors: {},
      authenticated: false,
      admin_privileges: false
    };
    this.processForm = this.processForm.bind(this)
  }

	processForm(event) {
		event.preventDefault();
			let self = this;

			let state = {};

			axios('http://localhost:3000/auth/login', {
				method: 'POST',
				data: { 
					email: this.refs.email.getValue(),
		            password: this.refs.password.getValue()
		        }
			}).then((response) => {

			    if (response.status == 200) {
			        // success

			        this.setState({
					      errorMessage: '',
					      errors: {},
					      authenticated: true,
					      admin_privileges: true
					});
			       
			        localStorage.setItem('token', response.data.token);
			       	localStorage.setItem('user', JSON.stringify(response.data.userData));

			        browserHistory.push('/home');
			        
			    }
			}).catch((error) => {
	        	// change the component state
	        	this.setState({
	        		errorMessage: error.response.data.message,
	        		errors: error ? error.response.data.errors : {}
	        	});
			});
		
	}

	render() {
		return (
			<Card class="container">
				<form action="/" onSubmit={this.processForm}>
					<h2 className="card-heading">Log In</h2>

					<CardTitle title="Login with Email" />

					{this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}

					<div className="field-line">
						<TextField ref="email" floatingLabelText="Email" 
						errorText={this.state.errors.email}/>
					</div>

					<div className="field-line">
						<TextField ref="password" floatingLabelText="Password"
						errorText={this.state.errors.password} />
					</div>

					<div className="button-line">
						<RaisedButton type="submit" label="Login" primary={true} />
					</div>

					<CardText>Dont have an account?<Link to={`/signup`}>Create One</Link></CardText>
				</form>
			</Card>
		);
	}

	/*function mapStateToProps(state) {
    	return { authenticated: state.auth.authenticated, admin_privileges: state.auth.admin_privileges };
  	}

  	return connect(mapStateToProps)(Login);*/
}

export default Login;