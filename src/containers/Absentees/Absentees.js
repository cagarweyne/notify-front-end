import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile, startWebSocket } from "../../actions/actions";
import CardProfile from '../../components/CardProfile/CardProfile';

class Absentees extends Component {
  componentDidMount() {
    this.props.getProfile();
    //start the action to start the webs socket connection
    this.props.startWebSocket();
  }

  showAbsences = () => {
    const children = [];
    const { role } = this.props.profile;
    this.props.profile.parents.forEach(parent => {
      parent.children.forEach(child => {
        parent.absences.forEach(absence => {
          if(child.id === absence.childId) {
            if(!child.absences) {
              child.absences = [];
              child.absences.push(absence);
            } else {
              child.absences.push(absence);
            }
          }
        });
        children.push(child);
      });
    });

    const filteredChildren = children.filter(child => {
      return child.absences;
    });

    const absences = filteredChildren.map(child => {
      return (
        <CardProfile role={role} key={child.id} child={child}/>
      );
    });

    return absences;
  };

  render() {
    if(this.props.profile.parents) {
      return (
        <div>
          <div><h1>Absentees:</h1></div>
           <div className='row'>
             {this.showAbsences()}
           </div>
        </div>
      );
    }
    return (
      <div>Absentees...</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.parentInfo
  }
}

Absentees.propTypes = {
  profile: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getProfile, startWebSocket })(Absentees)

