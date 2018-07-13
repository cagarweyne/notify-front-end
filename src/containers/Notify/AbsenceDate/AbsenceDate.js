import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AbsenceDate extends Component {
  state = {
    todayIsWeekend: false,
    tomIsWeekend: false
  }

  componentWillMount() {
    //check to see if its weekend today or tomorrow
    const date = new Date();
    const today = date.getDay();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const todayIsWeekend = today === 0 || today === 6;
    const tomIsWeekend = tomorrow.getDay() === 0 || tomorrow === 6;
    this.setState({todayIsWeekend, tomIsWeekend});
  }

  render() {
    return (
      <div>
        <p>When will your child be absent?</p>
        <div>
          <button onClick={() => {this.props.handleButtonClick('today')}}
                  className='btn btn-primary'
                  disabled={this.state.todayIsWeekend}>
          Today</button>
        </div>
        <div>
          <button onClick={() => {this.props.handleButtonClick('tomorrow')}}
                  className='btn btn-primary'
                  disabled={this.state.tomIsWeekend}>
            Tomorrow
          </button>
        </div>
        <div>
          <button onClick={() => {this.props.handleBackClick()}}
                  className='btn btn-primary'>Back</button>
        </div>
      </div>
    );
  }
}

AbsenceDate.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  childId: PropTypes.string.isRequired
}
