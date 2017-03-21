import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class AdminAuthorization extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if ( (!this.props.authenticated) || (!this.props.admin_privileges) ) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if ( (!nextProps.authenticated) || (!this.props.admin_privileges) ) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, admin_privileges: state.auth.admin_privileges };
  }

  return connect(mapStateToProps)(AdminAuthorization);
}
