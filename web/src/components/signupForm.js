import React from 'react';
import {Link, hashHistory} from 'react-router';
import {Card, CardTitle, CardText, RaisedButton, TextField} from 'material-ui';
import axios from 'axios';

class SignUp extends React.Component {

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
      this.processForm = this.processForm.bind(this);
    }

	processForm(event) {
		event.preventDefault();
		
		// create a string for an HTTP body message
		let user = JSON.stringify({
					name: this.refs.name.getValue(),
				 	email: this.refs.email.getValue(),
				    password: this.refs.password.getValue(),
				    role: 'admin'
				});

		axios('http://localhost:3000/auth/signup', {
			method: 'POST',
			data: {
				name: this.refs.name.getValue(),
			 	email: this.refs.email.getValue(),
			    password: this.refs.password.getValue(),
			    role: 'admin'
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
		        hashHistory.push('/home');
	      	}
	     }).catch((error) => {
			this.setState({
        		errorMessage: error.response.data.message,
        		errors: error ? error.response.data.errors : {}
        	});
		});
	}

	render() {
		return (
			<Card className="container">
				<form action="/" onSubmit={this.processForm}>
					<h2 className="card-heading">Sign Up</h2>

					<CardTitle title="Sign Up With Email" />

					{this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}


					<div className="field-line">
						<TextField ref="name" floatingLabelText="Name"
						errorText={this.state.errors.name} />
					</div>

					<div className="field-line">
						<TextField ref="email" floatingLabelText="Email"
						errorText={this.state.errors.email} />
					</div>

					<div className="field-line">
						<TextField ref="password" floatingLabelText="Password"
						errorText={this.state.errors.password} />
					</div>

					<div className="button-line">
						<RaisedButton type="submit" label="Create New Account"
						primary={true} />
					</div>

					<CardText>Already have an account? <Link to={'/login'}>Log In</Link></CardText>
				</form>
			</Card>
		);
	}
};

export default SignUp;