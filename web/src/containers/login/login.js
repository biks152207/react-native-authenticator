import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Card, CardTitle, CardText, RaisedButton, TextField, FloatingActionButton } from 'material-ui';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signInAction, setAdminPrevilegeAction, signInErrorAction } from './login.action';


class AllFields extends Component {
    constructor(props){
        super();
        /*
        console.log("Fields is ");
        console.dir(props);
        */
        this.state = {fields: props.fields};
    }

    render(){
        console.dir(this.state.fields);
        return <div>{this.state.fields.map((field, index) =>
                        <TextField key={field.key} value={field.name} floatingLabelText={field.label}
                            onChange={event => this.props.parent.saveData(index, event.target.value)}
                        />)}
              </div>
    }
}

export class Login extends Component {

	constructor() {
	    super();
	    this.state = {
            emailName: 'Email',
            passwordName: 'Password',
            edit: false,
	    	email: '',
	    	password: '',
            lastField: 3,
            fields: [{name: '1', label: 'Number', key: 1},
                     {name: 'hi', label: 'Good', key: 2}]
	    };
	    this.processForm = this.processForm.bind(this);
	};

	processForm(event) {
		event.preventDefault();
		
		axios('http://localhost:3000/auth/login', {
			method: 'POST',
			data: { 
				email: this.state.email,
	            password: this.state.password
	        }
		}).then((response) => {

		    if (response.status == 200) {
		        // success
				this.props.signIn();
				this.props.adminPrevilege();
		       
		        localStorage.setItem('token', response.data.token);
		       	localStorage.setItem('user', JSON.stringify(response.data.userData));

		        browserHistory.push('/home');
		        
		    }
		}).catch((errors) => {
        	// change the component state
        	this.props.setErrors(errors);
		});
	}

    doEdit(event){
        event.preventDefault();
        var old_edit = this.state.edit;
        console.log("do edit " + old_edit);
        this.setState({edit: !old_edit});
        // this.refs.edit.innerText = old_edit ? 'Stop Editing' : 'Edit';
        console.dir(event.target);
        // event.target.innerText = "Stop Editing";
    }

    getEdit(){
        if (this.state.edit){
            return "Stop Editing";
        }
        return "Edit";
    }

    saveData(field, value){
        var fields = this.state.fields;
        fields[field].name = value;
        this.setState({fields: fields});
    }

    addItem(){
        let newField = {'name': 'x', label: 'Field', key: this.state.lastField};
        let fields = this.state.fields;
        fields.push(newField);
        this.setState({fields: fields, lastField: this.state.lastField + 1});
    }

	render() {
		return (
			<Card class="container">
				<form action="/" onSubmit={this.processForm}>
					<h2 className="card-heading">Log In</h2>

					<CardTitle title="Login with Email" />

                    <button ref='edit' id='edit' type='button' onClick={this.doEdit.bind(this)}>{this.getEdit()}</button>

					<p className="error-message"></p>

                    {
                      function (){
                        if (this.state.edit){
                            return <div>
                                        <TextField value={this.state.emailName} floatingLabelText="Name"
                                           onChange={(event) => this.setState({emailName: event.target.value})} />
                                        <TextField value={this.state.passwordName} floatingLabelText="Name"
                                           onChange={(event) => this.setState({passwordName: event.target.value})} />
                                        <FloatingActionButton id='add' type='button' onClick={this.addItem.bind(this)}>+</FloatingActionButton>
                                   </div>

                        }
                      }.bind(this)()
                    }

					<div className="field-line">
						<TextField value={this.state.email} floatingLabelText={this.state.emailName}
						errorText={ (this.props.errors) ? this.props.errors : '' }
						onChange={(event) => this.setState({ email: event.target.value})} />
					</div>

					<div className="field-line">
						<TextField value={this.state.password} floatingLabelText={this.state.passwordName}
						errorText={ (this.props.errors) ? this.props.errors : '' } 
						onChange={(event) => this.setState({ password: event.target.value})}/>
					</div>

                    <AllFields parent={this} fields={this.state.fields} />

					<div className="button-line">
						<RaisedButton type="submit" label="Login" primary={true} />
					</div>
					<a href="http://localhost:3000/auth/facebook">Login with Facebook</a>	
					<CardText>Dont have an account?<Link to={`/signup`}>Create One</Link></CardText>
				</form>
			</Card>
		);
	};
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signIn: signInAction,
    adminPrevilege: setAdminPrevilegeAction,
    setErrors: signInErrorAction
  }, dispatch);
};

function mapStateToProps(state) {
	return {
		errors: state.login.errors
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
