import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addChildRequest } from './actions';
import { getProfile } from '../../actions/actions';
import { Formik, Field, Form } from 'formik';
import { AddChildSchema } from '../../lib/Schema/Yup-user-schema';
import './AddChild.css';

class AddChild extends Component {
  state = {
    addAnother: false,
    duplicate: false
  };

  componentDidMount() {
    if(Object.keys(this.props.profile).length === 0) {
      this.props.getProfile();
    }
  }

  handleSubmit = (child, { resetForm }) => {
    console.log(child);

    if(!this.checkDuplicateChild(child)) {
      this.props.addChildRequest(child);
      this.setState({addAnother: false});
      resetForm();
    } else {
      this.setState({duplicate: true});
    }

  }

  checkDuplicateChild = (child) => {
    child.fullName = `${child.firstName} ${child.lastName}`;
    let duplicate = false;
    this.props.profile.children.forEach(profileChild => {
      if(child.fullName === profileChild.fullName && child) {
        duplicate = true;
      }
    });

    return duplicate;
  };

  handleAnotherAdd = ()=> {
    this.setState({addAnother: true});
  }

  render() {
    console.log(this.props.profile);
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className={'col-md-6 ' + (this.props.child.successfulChildAdd && !this.state.addAnother ? 'd-none' : '')}>
            <div className='card mx-4'>
              <div className='card-body p-4'>
                <h1>Add Child</h1>
                <Formik
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    yearGroup: 'Select'
                  }}
                  validationSchema={AddChildSchema}
                  onSubmit={this.handleSubmit}
                  render={({ errors, touched }) => (

                    <Form>
                      <div className='form-group'>
                        <label htmlFor="firstName">First Name</label>
                        <Field name="firstName" placeholder="Jane" type="text"
                               className={'form-control ' + (errors.firstName && touched.firstName ? 'error' : '')} />

                        {errors.firstName && touched.firstName && (
                          <span className="field-error">{errors.firstName}</span>
                        )}
                      </div>
                      <div>
                        <label htmlFor="lastName">Last Name</label>
                        <Field name="lastName" placeholder="Doe" type="text"
                               className={'form-control ' + (errors.lastName && touched.lastName ? 'error' : '')}/>

                        {errors.lastName &&
                        touched.lastName && (
                          <span className="field-error">{errors.lastName}</span>
                        )}
                      </div>
                      <div className='form-group'>
                        <label htmlFor="yearGroup">Year Group</label>
                        <Field component="select"
                               name="yearGroup"
                               className={'form-control ' + (errors.yearGroup && touched.yearGroup ? 'error' : '')}>
                          <option value='Select'>Select</option>
                          <option value="Nursery">Nursery</option>
                          <option value="Reception">Reception</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </Field>
                        {errors.yearGroup &&
                        touched.yearGroup && <span className="field-error">{errors.yearGroup}</span>}
                      </div>
                      <div>
                        <button className='btn btn-block btn-success' type="submit">Add Child</button>
                      </div>
                    </Form>
                  )}
                />
              </div>
              <div className={'alert alert-danger ' + (this.state.duplicate? '' : 'd-none')}>
                Child already in your account
              </div>

            </div>

          </div>
          <div className={this.props.child.successfulChildAdd && !this.state.addAnother ? '' : 'd-none'}>
            <p>You have successfully added a child to your profile.</p>
            <button onClick={this.handleAnotherAdd}>Add Another Child</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    child: state.addChildReducer,
    profile: state.parentInfo
  }
}

AddChild.propTypes = {
  child: PropTypes.object.isRequired,
  addChildRequest: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { addChildRequest, getProfile })(AddChild);
