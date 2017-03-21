import React, { Component } from 'react';
import { testAction } from '../actions';
import { connect } from 'react-redux';

class Dashboard extends Component {
	render() {
		return (
			<div>
				This is the Dashboard
				<a onClick={this.handleClickHello.bind(this)}>Knock Knock</a>
				<h3>{this.props.auth.message}</h3>
			</div>
		);
	}

	handleClickHello() {
		this.props.testAction();
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, { testAction })(Dashboard);