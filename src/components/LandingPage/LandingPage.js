import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="col-sm-12 " style={{maxWidth: '60%', margin: '0 auto'}}>
      <div className="card">
        <div className="card-header">
          <i className="fa fa-align-justify"></i> Notify
          <div className="card-header-actions">
            <a  className="card-header-action">
              <small className="text-muted"> </small>
            </a>
          </div>
        </div>
        <div className="card-body">
          <div className="jumbotron">
            <h1 className="display-3">Notify</h1>
            <p className="lead">Notify is a student absence notification system for the 21st Century. Instead of
              calling into school in the morning and waiting to report your child's absence, you can do it in an
              instant with Notify. You simply sign up, add your child(ren) and send the notification - all in a few clicks!</p>
            <hr className="my-4" />
            <p>Get started right away by signing up:</p>
            <p className="lead">
              <Link className="btn btn-primary btn-lg" to='/signup'>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
