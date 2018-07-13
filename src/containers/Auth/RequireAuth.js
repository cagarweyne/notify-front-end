import React, { Component }  from 'react';
import TOKEN_API from '../../lib/API/helpers';

export default function(ComposedComponent) {
  class Authentication extends Component {

    isLoggedIn() {
      const token = TOKEN_API.getAccessToken();
      return token === null || TOKEN_API.isTokenExpired(token);
    }

    componentWillMount() {
      //check for existence of token, if no token or token expired redirect
      if(this.isLoggedIn()) {
        this.props.history.push('/signin')
      }
    }

    componentWillUpdate() {
      if(TOKEN_API.getAccessToken === null || TOKEN_API.isTokenExpired(TOKEN_API.getAccessToken)) {
        this.props.history.push('/signin')
      }
    }

    render() {
      if(this.isLoggedIn()) {
        return null; 
      }
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  return Authentication;
}