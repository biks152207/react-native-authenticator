import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { UNAUTH_USER } from '../actions/types';
import { bindActionCreators } from 'redux';
import { signOutAction } from '../actions';

class SignOut extends React.Component {
  componentWillMount() {
  	this.processForm();
  }
  render() {
    return <div>User has been logged out.</div>;
  }

  processForm() {
		localStorage.removeItem('token');
	  localStorage.removeItem('user');
    this.props.signOut();
    browserHistory.push('/');
  }

}

//export default connect()(SignOut);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signOut: signOutAction
  }, dispatch);
}
export default connect(null, mapDispatchToProps)(SignOut) ;
