import React from 'react';
import PropTypes from 'prop-types';

const CardProfile =  (props) => {
  const { fullName, yearGroup, absences } = props.child;
  let absentDates;
  if(props.child.absences) {
    absentDates = absences.map((absence, i) => {
      //console.log(absence)
      const { d, m, y } = absence.date;
      return (
        <p key={i}>
          { d +'/'+ (m + 1) + '/'+ y }
        </p>
      );
    });
  }
  return (
    <div className="col-sm-6 col-md-4">
      <div className="card">
        <div className="card-header">{fullName}</div>
        <div className="card-body">
          <p>Year Group: { yearGroup }</p>
          {
            props.role === 'admin' ?
              <div>
                <h5>Absences Dates</h5>
                {absentDates}
              </div>
              : <div> </div>
          }
        </div>
      </div>
    </div>
  );
};

CardProfile.propTypes = {
  child: PropTypes.object.isRequired
};

export default CardProfile;

