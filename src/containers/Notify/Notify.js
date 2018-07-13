import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AbsenceDate from './AbsenceDate/AbsenceDate';
import ChildSelect from './ChildSelect/ChildSelect';
import { getProfile } from '../../actions/actions';
import { notifyAbsence } from './actions';

class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childSelected: false,
      today: false,
      tomorrow: false,
      childId: '',
      date: '',
      duplicate: false
    }
  }

  componentDidMount() {
    this.props.getProfile();
  }

  handleButtonClick = (btn) => {
    const today = new Date();
    if(btn === 'today') {
      //generate the date of today and format it accordingly
      const date = {
        d: today.getDate(),
        m: today.getMonth(),
        y: today.getFullYear()
      };

      this.setState({today: true, date});
    } else {
      //generate the date of tomorrow and format it accordingly
      const date = {
        d: today.getDate() + 1,
        m: today.getMonth(),
        y: today.getFullYear()
      };
      this.setState({tomorrow: true, date});
    }
  }

  handleChildSelect = (value) => {
    this.setState({childSelected: true, childId: value.child})
  }

  handleBackClick = () => {
    //reset everything
    this.setState({
      childSelected: false,
      today: false,
      tomorrow: false,
      childId: '',
      date: '',
      duplicate: false
    });
  }

  handleNotify = () => {
    //get child details and parent details from store
    //then initiate action request to send data to the API
    const notification = {
      childId: this.state.childId,
      date: this.state.date
    }

    console.log(notification);
    if(!this.absenceRecordedPrev(this.state.date)) {
      //call action creator to send notification
      this.props.notifyAbsence(notification);
    } else {
      this.setState({duplicate: true});
    }
  }

  absenceRecordedPrev = (date) => {
    let dateRecorded = false;
    const absences = this.props.profile.absences;
    const childId = this.state.childId;
    //loop over absences array
    absences.forEach(absence => {
      if(absence.childId === childId) {
        //check the date obj today recorded previously
        if(absence.date.d === date.d && absence.date.m === date.m && absence.date.y === date.y) {
          return dateRecorded = true;
        }

      }
    });

    return dateRecorded;
  }

  displayNotificationdetails = () => {
    const child = this.props.profile.children.find(child => child.id === this.state.childId);
    return (
      <div>
        You have selected {child.fullName} to be absent
      </div>
    );
  }

  render() {
    console.log(this.props.profile)
    const { postAbsenceRequest, postAbsenceSuccess, postAbsenceFailure } = this.props.absence;
    const { children } = this.props.profile;
    const displayed = postAbsenceRequest || postAbsenceSuccess || postAbsenceFailure;
    if(this.props.profileError.error) {
      return (
        <div>Error. Unable to retrieve profile</div>
      );
    }
    if(!children) {return null}
    if(this.props.profile.children.length === 0) {
      return (
        <div>
          <p>Please add a child(ren) to your profile.</p>
        </div>
      );
    }
    return (
      <div className='container'>
        <div className={'notify-container ' + (displayed ? 'd-none' : '')}>
          <div className={this.state.childSelected && (this.state.today || this.state.tomorrow) ? 'd-none': ''}>
            <h1>Select Child</h1>
            <div className={this.state.childSelected ? 'd-none' : ''}>
              <ChildSelect handleChildSelect={this.handleChildSelect} />
            </div>
            <div className={this.state.childSelected ? '' : 'd-none'}>
              <AbsenceDate handleButtonClick={this.handleButtonClick}
                           handleBackClick={this.handleBackClick}
                           profile={this.props.profile}
                           childId={this.state.childId} />
            </div>
          </div>
          <div className={this.state.childSelected && (this.state.today || this.state.tomorrow) ? '': 'd-none'}>
            <h1>Details of child absence</h1>
            {
              this.state.childSelected && (this.state.today || this.state.tomorrow) ?
              this.displayNotificationdetails() : ''
            }
            <div>
              <button className='btn btn-primary' onClick={this.handleNotify}>
                Notify
              </button>
            </div>
            <div>
              <button onClick={() => {this.handleBackClick()}}
                      className='btn btn-primary'>Cancel</button>
            </div>
          </div>
        </div>
        <div className={'requesting-absence-post ' + (postAbsenceRequest && !postAbsenceSuccess ? '' : 'd-none')}>
          <p>Posting absence - hold tight...</p>
        </div>
        <div className={'absence-recorded ' + (postAbsenceSuccess ? '' : 'd-none')}>
          <p>Absence has been recorded. Thank you.</p>
        </div>
        <div className={'absence-failure ' + (postAbsenceFailure ? '' : 'd-none')}>
          <p>Error! Unable to send absence.</p>
        </div>
        <div className={'error-absence-recorded alert alert-danger ' + (this.state.duplicate ? '' : 'd-none')}>
          <p>Absence has already been recorded for the date and child selected!</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.parentInfo,
    profileError: state.profileErrorReducer,
    absence: state.absenceReducer
  }
}

Notify.propTypes = {
  profile: PropTypes.object.isRequired,
  profileError: PropTypes.object.isRequired,
  absence: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  notifyAbsence: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getProfile, notifyAbsence })(Notify);

