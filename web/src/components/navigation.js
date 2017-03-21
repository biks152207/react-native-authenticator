import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navigation extends Component {
	render() {
		return (
			<div className="frame">
				<h1 className="bit-2">Journey into React</h1>
				<ul className="bit-2">
					<li><Link to="/dashboard"><span>dashboard</span></Link></li>
					<li><Link to="/login"><span>Login</span></Link></li>
					<li><Link to="/home"><span>Home</span></Link></li>
					<li><Link to="/configure"><span>Configure</span></Link></li>
					<li><Link to="/signup"><span>Sign Up</span></Link></li>
					<li><Link to="/signout"><span>Sign Out</span></Link></li>
				</ul>
			</div>
		);
	}
}
