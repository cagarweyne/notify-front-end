import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import SideBar from '../../containers/SideBar/SideBar';
import Main from '../Main/Main';
import Signup from '../../containers/Signup/Signup';
import Signin from '../../containers/Signin/Signin';
import Header from '../Header/Header';
import LandingPage from '../LandingPage/LandingPage';

class App extends Component {
  state = {
    sideBarLg: true,
    sideBarMob: false
  }

  toggleSideBar = () => {
    this.setState({sideBarLg: !this.state.sideBarLg, sideBarMob: false});
  };

  toggleMobile = () => {
    this.setState({sideBarMob: !this.state.sideBarMob});
  }

  logout = () => {
    //remove localStorage item
    localStorage.removeItem('access_token');
    // //redirect to /signin
    this.props.history.push('/signin');
  }

  render() {
    return (
      <div className={"app header-fixed sidebar-fixed aside-menu-fixed " +
      (this.state.sideBarLg? 'sidebar-lg-show ' : '') +
      (this.state.sideBarMob ? ' sidebar-show' : '')}>
        <Route exact path ='/' render={() => {
          return (
            <div className='justify-content-center'>
              <LandingPage />
            </div>
          );
        }} />
        <Route path='/signup' component={Signup} />
        <Route path='/signin' component={Signin} />
        <Route path ='/app' render={() => {
          return (
            <div>
              <Header toggleMobile={this.toggleMobile}
                      toggleSideBar={this.toggleSideBar}
                      logout={this.logout}/>

              <div className='app-body'>
                <SideBar />
                <Main />
              </div>
            </div>
          );
        }} />
      </div>
    );
  }
}

export default withRouter(App);
