import React, { Component } from 'react';
import Navigation from './navigation';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  render() {
    return (
    	<MuiThemeProvider muiTheme={getMuiTheme()}>
    	  <div>
	        <Navigation />
	        {this.props.children}
	      </div>
 		</MuiThemeProvider>
    );
  }
}
