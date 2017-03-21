import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Button, TextInput, AsyncStorage, ScrollView , TouchableHighlight} from 'react-native';
// Third party modules here
import { Actions } from 'react-native-router-flux';
import t from 'tcomb-form-native';

// Custom modules
import { processSignupForm } from './signup.action';
import { emailValidator, passwordValidator } from '../../app/common/validations';
import { Styles } from '../../app/common/styles';
import { ProgressIndicator } from '../common-scenes/progress';


let Email = t.refinement(t.String, emailValidator);
Email.getValidationErrorMessage = function (value, path, context) {
  return 'Your email must be valid.';
};

let Password = t.refinement(t.String, passwordValidator);
Password.getValidationErrorMessage = function(value, path, context){
  return 'Your password must be at least 8 characters.';
}

const Form = t.form.Form;
const formModel = t.struct({
  name: t.String,
  email: Email,
  password: Password
});
let options = {
  fields: {
    email: {
      error: 'Your email must be valid.',
      autoCapitalize: 'none'
    },
    name:{
      error: 'Your name is required.',
      autoCapitalize: 'none'
    },
    password:{
      password: true,
      secureTextEntry: true,
      autoCapitalize: 'none'
    }
  }
};

class Signup extends Component{

  constructor() {
    super();

    // set the initial component state
    this.state = {
      errorMessage: '',
      errors: {},
      authenticated: false,
      admin_privileges: false,
      name: '',
      email: '',
      password: ''
    };
    this.handleSignupFormSubmit = this.handleSignupFormSubmit.bind(this);
  }

  handleSignupFormSubmit(){
    var value = this.refs.signup.getValue();
    if (value){
      this.props.processSignupForm({ name: value.name, email: value.email, password: value.password});
    }
  }
  render(){
    return(
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={Styles.container}>
          <Form
          ref="signup"
          type={formModel}
          options={options}
        />
        <TouchableHighlight style={Styles.button} onPress={this.handleSignupFormSubmit} underlayColor='#99d9f4'>
          <Text style={Styles.buttonText}>Signup</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={Actions.login} style={Styles.button} underlayColor='#99d9f4'>
          <Text  style={Styles.buttonText}>
            Go to login
          </Text>
        </TouchableHighlight>

        </View>
        <View style={Styles.progress} >
        {
          this.props.progress ? (<ProgressIndicator style={{justifyContent: 'center',alignItems: 'center'}} />):(<Text></Text>)
        }
        </View>
      </ScrollView>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    processSignupForm: processSignupForm
	}, dispatch);
};

function mapStateToProps(state) {
	return {
		errors: state.login.errors,
    progress: state.login.progress
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
