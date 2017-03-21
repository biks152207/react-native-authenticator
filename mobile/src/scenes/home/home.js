import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOutAction } from './home.actions';
import { handleFacebookLogout } from '../../app/common/helper';

import { View, Button, AsyncStorage, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
// Custom modules here
import { Styles } from '../../app/common/styles';

class SignOut extends React.Component {

  constructor(props) {
  	super(props);
  	this.handleSignOut = this.handleSignOut.bind(this);
  };

  handleSignOut() {
  	AsyncStorage.removeItem('token');
  	AsyncStorage.removeItem('user');
    this.props.signOut();
    if (this.props.profile.social.facebook.id){
      handleFacebookLogout();
    }
    Actions.login();
  }

  render() {
    return (
    	<View style={Styles.container}>
        <Text></Text>
    		<Button title="Sign Out"
				    onPress={this.handleSignOut} />
        <Text onPress={Actions.login}>Go to login</Text>
		  </View>
	)
  };
}

//export default connect()(SignOut);
function mapStateToProps(state) {
	return {
		profile: state.login.profile
	};
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signOut: signOutAction
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SignOut) ;
