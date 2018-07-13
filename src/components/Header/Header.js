import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <header className="app-header navbar">
      <button
        onClick={props.toggleMobile}
        className="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show">
        <span className="navbar-toggler-icon"> </span>
      </button>
      <a className="navbar-brand">
        Notify
      </a>
      <button
        onClick={() => {props.toggleSideBar()}}
        className="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show">
        <span className="navbar-toggler-icon"> </span>
      </button>
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item ">
          <button
            onClick={props.logout}
            className="btn btn-primary"
            style={{marginRight: '10px'}}>
            Logout
          </button>
        </li>
      </ul>
    </header>
  );
};

Header.propTypes = {
  toggleMobile: PropTypes.func.isRequired,
  toggleSideBar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

export default Header;
