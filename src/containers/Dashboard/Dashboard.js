import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from "../../actions/actions";
import CardProfile from '../../components/CardProfile/CardProfile';

class Dashboard extends Component{
  componentDidMount() {
    this.props.getProfile();
  }

  renderChildren = () => {

    const { children, role } = this.props.profile;

    if(children.length === 0) {
      return null
    }

    const childrenList = children.map((child, i) => {
      return <CardProfile role={role} child={child} key={i} />
    });

    return childrenList;
  }

  render() {

    if(this.props.profile.role === 'admin') {
      console.log(this.props.profile)
      let absenteesNo = 0;
        this.props.profile.parents.forEach(parent => {
        absenteesNo += parent.absences.length;
      });

      return (
        <div>
          <div className="card" style={{maxWidth: '600px'}}>
            <div className="card-header">
              <i className="fa fa-align-justify"></i> Welcome: { this.props.profile.fullName }
            </div>
            <div className="card-body">
              Welcome, please choose a link from the left to get started.
            </div>
          </div>
          <div className="card" style={{maxWidth: '600px'}}>
            <div className="card-header">
              <i className="fa fa-align-justify"></i> Absentees
            </div>
            <div className="card-body">
              There are { absenteesNo } absentees.
            </div>
          </div>
        </div>
      );
    }
    if(!this.props.profile.children || !this.props.profile.absences) {
      return null;
    }
    const { fullName, children, absences } = this.props.profile;
    if(this.props.profileError.error) {
      return (
        <div className="card">
          <div className="card-header">
            <i className="fa fa-align-justify"></i> Dashboard
          </div>
          <div className="card-body">
          Error - Unable to load profile.
          </div>
        </div>
      );
    }
    return (
      <div className='' >
        <div><h1>Profile</h1></div>
        <div className="card" style={{maxWidth: '600px'}}>
          <div className="card-header">
            <i className="fa fa-align-justify"></i> Welcome: { fullName }
          </div>
          {
            children.length === 0 ?
              <div className="card-body">
                Please add a child to your account
              </div>
              :
              <div className="card-body">
                Welcome, please choose a link from the left to get started.
              </div>
          }
        </div>
        <div className="card" style={{maxWidth: '600px'}}>
          {
            absences.length === 0 ?
              <div className="card-body">
                No reported absences
              </div>
              :
              <div className="card-body">
                You have reported: { absences.length } absence
              </div>
          }
        </div>
        <div><h1>Children</h1></div>

        <div className='row'>

          {
            this.renderChildren()
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profileError: state.profileErrorReducer,
    profile: state.parentInfo
  }
}

Dashboard.propTypes = {
  profileError: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { getProfile })(Dashboard);
