import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { resetNotifyProps } from '../../actions/actions';
import './SideBar.css';

class SideBar extends Component {
  state = {
    dashboard: '',
    addChild: '',
    notify: '',
    absentees: ''
  }

  componentDidMount() {
    switch(this.props.location.pathname) {
      case '/app':
        return this.setState({dashboard: 'active'});
      case '/app/add-child':
        return this.setState({addChild: 'active'});
      case '/app/notify':
        return this.setState({notify: 'active'});
      case '/app/absentees':
        return this.setState({absentees: 'active'});
      default:
        return;
    }
  }

  setActive = (link) => {
    const newState = {
      dashboard: '',
      addChild: '',
      notify: '',
      absentees: ''
    }

    newState[link] = 'active';

    this.setState(newState);
  }

  onHandleLinkClick = (link) => {
    this.props.history.push(link);
  }

  onProfileClick = () => {
    this.props.history.push('/app/profile');
  }

  onNotifyClick = () => {
    this.props.resetNotifyProps();
    this.props.history.push('/app/notify');
  }

  render() {
    return (


        <div className="sidebar">
          <nav className="sidebar-nav">
            <ul className="nav">
              <li className="nav-item">
                <a className={"nav-link " + this.state.dashboard }
                   onClick={() => {
                     this.onHandleLinkClick('/app');
                      this.setActive('dashboard');
                   }}>
                  Dashboard
                </a>
              </li>
              <li className={"nav-item " + (this.props.profile.role === 'admin' ? 'd-none' : '')}>
                <a className={"nav-link " + this.state.addChild }
                   onClick={() => {
                     this.onHandleLinkClick('/app/add-child');
                     this.setActive('addChild');
                   }}>
                  Add Child
                </a>
              </li>
              <li className={"nav-item " + (this.props.profile.role === 'admin' ? 'd-none' : '')}>
                <a className={"nav-link " + this.state.notify }
                   onClick={() => {
                     this.onNotifyClick();
                     this.setActive('notify');
                   }}>
                  Notify
                </a>
              </li>
              <li className={"nav-item " + (this.props.profile.role === 'admin' ? '' : 'd-none')}>
                <a className={"nav-link " + this.state.absentees }
                   onClick={() => {
                     this.onHandleLinkClick('/app/absentees');
                     this.setActive('absentees');
                   }}>
                  Absentees
                </a>
              </li>
            </ul>
          </nav>
        </div>


    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.parentInfo
  }
}

SideBar.propTypes = {
  profile: PropTypes.object.isRequired,
  resetNotifyProps: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { resetNotifyProps })(withRouter(SideBar));
