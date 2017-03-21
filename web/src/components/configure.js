import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react';
import t from 'tcomb-form';
import { Actions, browserHistory } from 'react-router';

// import { ProgressIndicator } from '../common-scenes/progress';
import { Styles } from '../common/styles';
import { AUTH } from '../common/enums';
// import { alert } from '../../app/common/alert';
// import { asyncStorage } from '../../app/common/helper';


const Form = t.form.Form;
const formModel = t.struct({
  FacebookAppID: t.String,
  FacebookDisplayName: t.String,
  mongodb:t.String,
});

let options = {
  fields: {
    FacebookAppID: {
      label: "FacebookAppID"
    }
  }
}

/*
class ConfigComponent extends Component{
  constructor(){
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  };

  handleFormSubmit() {
    let value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      const { FacebookAppID,  mongodb, FacebookDisplayName} = value;

      fetch('http://localhost:3000/auth/config', {
  			method: 'POST',
  			headers: {
  		    'Accept': 'application/json',
  		    'Content-Type': 'application/json',
  		  },
  			body: JSON.stringify({
          mongodb: mongodb,
          FacebookAppID: FacebookAppID,
          FacebookDisplayName: FacebookDisplayName
        })
  		})
      .then((response) => response.json())
      .then((responseData) =>{
          console.log("Trying to login");
      })
    }
	};
  render(){
    return(
      <View style={Styles.container}>
          <Form
          ref="form"
          type={formModel}
          options={options}
        />
        <TouchableHighlight style={Styles.button} onPress={this.handleFormSubmit} underlayColor='#99d9f4'>
          <Text style={Styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
*/

let style = {
    container: {
        marginTop: 0,
        padding: 20,
        backgroundColor: '#fff',
    },
};

class Configure extends Component {
    submit(event){
        event.preventDefault();
        /*
            console.dir(this);
        console.dir(this.refs);
        */
        /*
        console.dir(this.refs.form);
        const value = this.refs.form.getValue();
        console.log("value is " + value);
        console.dir(value);
        */

        /*
        console.log('hello');
        console.dir(formModel);
        */
        const value = this.refs.form.getValue();

        const { FacebookAppID,  mongodb, FacebookDisplayName} = value;

        fetch(AUTH.CONFIG, {
  			method: 'POST',
  			headers: {
  		    'Accept': 'application/json',
  		    'Content-Type': 'application/json',
  		  },
  			body: JSON.stringify({
          mongodb: mongodb,
          FacebookAppID: FacebookAppID,
          FacebookDisplayName: FacebookDisplayName
        })
  		})
        .then((response) => response.json())
        .then((responseData) =>{
                console.log("logged in");
                browserHistory.push('/home');
        })

    }

    render(){
        return <div style={style.container}>
                <form onSubmit={this.submit.bind(this)}>
                          <Form
                          ref="form"
                          type={formModel}
                          options={options}
                        />
                        <button type="submit">Save</button>
                </form>
              </div>
    }
}

export default Configure
