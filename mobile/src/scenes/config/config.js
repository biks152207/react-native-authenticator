import React, { Component } from 'react';
import update from 'react-addons-update';
import { View, Text, TextInput, Button, ScrollView, TouchableHighlight, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { ProgressIndicator } from '../common-scenes/progress';
import { Styles } from '../../app/common/styles';
import { AUTH } from '../../app/common/enums';
import { alert } from '../../app/common/alert';
import { asyncStorage } from '../../app/common/helper';
import { InputBox } from './inputComponent';


export default class ConfigComponent extends Component{
  constructor(){
    super();

    this.state = {
      formObject: {
        APIURL: '',
        MongodbURL: '',
        FacebookAppID: '',
        FacebookClientSecret: '',
        FacebookDisplayName: '',
        Platform: Platform.OS
      },
      errors:{
        APIError: '',
        FacebookError: '',
        MongodbError: ''
      },
      test:{
        API: false,
        Facebook: false,
        MongoDB: false
      },
      processFacebook: false,
      processMongoDb: false,
      processAPI: false
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.apiHandler = this.apiHandler.bind(this);
    this.facebookHandler = this.facebookHandler.bind(this);
    this.mongodbHandler = this.mongodbHandler.bind(this);
    this.updateState = this.updateState.bind(this);
  };

  handleFormSubmit() {
    if (this.state.test.Facebook) {
      fetch(AUTH.CONFIG, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.formObject)
      })
      .then((response) => response.json())
      .then((responseData) => {
        asyncStorage('config', this.state.formObject)
        .then((result) =>{
          Actions.login();
          alert(responseData.message);
        });
      });
    }
	};

  mongodbHandler(){
    this.setState({processMongoDb: false})
    var errors;
    if (!this.state.formObject.MongodbURL){
      errors = update(this.state.errors, {
        'MongodbError':{
          $set: 'Enter your mongodb connection string'
        }
      });
    }else{
      errors = update(this.state.errors, {
        'MongodbError':{
          $set: ''
        }
      });
    }
    this.setState({errors})
    if (this.state.formObject.MongodbURL){
      this.setState({processMongoDb: true})
      fetch('http://localhost:3000/auth/mongodb/test',{
        method: 'POST',
  			headers: {
  		    'Accept': 'application/json',
  		    'Content-Type': 'application/json',
  		  },
  			body: JSON.stringify({
          MongodbURL: this.state.formObject.MongodbURL
        })
      })
      .then((response) => response.json())
      .then((responseData) =>{
        let test = Object.assign({}, this.state.test, { MongoDB: true})
        this.setState({test})
      })
      .catch((err) =>{
        let test = Object.assign({}, this.state.test, { MongoDB: false})
        this.setState({test})

      })
    }
  }

  facebookHandler(){
    var errors;
    this.setState({processFacebook: false})
    if (!this.state.formObject.FacebookAppID || !this.state.formObject.FacebookDisplayName ){
      errors = update(this.state.errors, {
        'FacebookError':{
          $set: 'Enter both facebook app id and facebook display name'
        }
      });
    }else{
      errors = update(this.state.errors, {
        'FacebookError':{
          $set: ''
        }
      })
    }
    this.setState({errors})
    if (this.state.formObject.FacebookAppID
      && this.state.formObject.FacebookDisplayName
      && this.state.formObject.FacebookClientSecret){
      this.setState({processFacebook: true})
      fetch(AUTH.GRAPH,{
        method: 'POST',
  			headers: {
  		    'Accept': 'application/json',
  		    'Content-Type': 'application/json',
  		  },
  			body: JSON.stringify({
          FacebookAppID: this.state.formObject.FacebookAppID,
          FacebookDisplayName: this.state.formObject.FacebookDisplayName,
          FacebookClientSecret: this.state.formObject.FacebookClientSecret
        })
      })
        .then((result) => result.json())
        .then((responseData) => {
          let test = Object.assign({}, this.state.test, { Facebook: true});
          this.setState({test});
        })
        .catch((error) => {
          let test = Object.assign({}, this.state.test, { Facebook: false});
          this.setState({test});
        })
    }
  };

  apiHandler() {
    let { APIURL } = this.state.formObject;
    if(APIURL) {
      this.setState({processAPI: true});
      fetch(APIURL, {
        method: 'HEAD'
      })
      .then(() => {
        let test = Object.assign({}, this.state.test, { API: true });
        this.setState({test});
      })
      .catch((error) => {
        let test = Object.assign({}, this.state.test, { API: false });
        this.setState({test});
      })
    }
  };

  updateState(id, text) {
    let newValues = update(this.state.formObject, {
      [id]: {
          $set: text
      }
    })
    this.setState({formObject: newValues})
  };

  render(){
    return(
      <ScrollView style={Styles.container}>
        <View style={Styles.innerView}>
          <InputBox id="APIURL" placeholder="API URL" title="API URL" updateState={this.updateState}/>
          {(this.state.test.API && this.state.processAPI) && <Text style={{color: 'green'}}>Test passed</Text>}
          {(!this.state.test.API && this.state.processAPI) && <Text  style={{color: 'red'}}>Test Failed</Text>}
          <TouchableHighlight  style={Styles.button} onPress={this.apiHandler}>
            <Text style={Styles.buttonText}>Test API</Text>
          </TouchableHighlight>
        </View>
        <View style={Styles.innerView}>
          <InputBox id="MongodbURL" placeholder="Mongodb URL" title="Mongodb Configuration" updateState={this.updateState}/>
          <Text style={{color: 'red'}}>{this.state.errors.MongodbError}</Text>
          {(this.state.test.MongoDB && this.state.processMongoDb) && <Text style={{color: 'green'}}>Test passed</Text>}
          {(!this.state.test.MongoDB && this.state.processMongoDb) && <Text  style={{color: 'red'}}>Test Failed</Text>}
          <TouchableHighlight  style={Styles.button} onPress={this.mongodbHandler}>
            <Text style={Styles.buttonText}>Test Mongodb</Text>
          </TouchableHighlight>
        </View>
        <View style={Styles.innerView}>
          <InputBox id="FacebookAppID" placeholder="Facebook Client ID" title="Facebook Configuration" updateState={this.updateState} />
          <InputBox id="FacebookClientSecret" placeholder="Facebook Client Secret" updateState={this.updateState} />
          <InputBox id="FacebookDisplayName" placeholder="Facebook Display Name" updateState={this.updateState} />
          <Text style={{color: 'red'}}>{this.state.errors.FacebookError}</Text>
          {(this.state.test.Facebook && this.state.processFacebook) && <Text style={{color: 'green'}}>Test passed</Text>}
          {(!this.state.test.Facebook && this.state.processFacebook) && <Text  style={{color: 'red'}}>Test Failed</Text>}
          <TouchableHighlight  style={Styles.button} onPress={this.facebookHandler}>
            <Text style={Styles.buttonText}>Test facebook</Text>
          </TouchableHighlight>
        </View>
        <View>
          {this.state.test.MongoDB && this.state.test.Facebook &&   <TouchableHighlight style={Styles.button} onPress={this.handleFormSubmit} underlayColor='#99d9f4'>
              <Text style={Styles.buttonText}>Submit</Text>
            </TouchableHighlight> }
        </View>
      </ScrollView>
    )
  }
}
