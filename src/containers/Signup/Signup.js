import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUpRequest } from './actions';
import { Formik, Field, Form } from 'formik';
import { SignUpSchema } from '../../lib/Schema/Yup-user-schema';
import { Link } from 'react-router-dom';
import TOKEN_API from "../../lib/API/helpers";

class Signup extends Component {

  isLoggedIn() {
    const token = TOKEN_API.getAccessToken();
    return token === null || TOKEN_API.isTokenExpired(token);
  }

  componentWillMount() {
    if(!this.isLoggedIn()) {
      this.props.history.push('/app')
    }
  }

  handleSubmit = (user) => {
    this.props.signUpRequest(user);
  };

  redirectToLogin = () => {
    this.props.history.push('/signin')
  };

  render() {
    const { successful, messages } = this.props.signup;
    return (
      <div className='app flex-row align-items-center  pace-done'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-6'>
              <div className='card mx-4'>
                <div className='card-body p-4'>
                  <div className={successful? 'd-none' : ''}>
                    <h1>Sign up</h1>
                    <p className="text-muted">Create your account</p>
                    <Formik
                      initialValues={{
                        email: '',
                        firstName: '',
                        lastName: '',
                        password: ''
                      }}
                      validationSchema={SignUpSchema}
                      onSubmit={this.handleSubmit}
                      render={({ errors, touched }) => (
                        <Form>
                          <div className='input-group mb-3'>
                            <Field name="firstName" placeholder="First Name" type="text"
                                   className={'form-control ' + (errors.firstName && touched.firstName ? ' error' : '')} />

                            {errors.firstName &&
                            touched.firstName && (
                              <span className="field-error">{errors.firstName}</span>
                            )}
                          </div>

                          <div className='input-group mb-3'>
                            <Field name="lastName" placeholder="Last Name" type="text"
                                   className={'form-control ' + (errors.lastName && touched.lastName ? 'error' : '')}/>

                            {errors.lastName &&
                            touched.lastName && (
                              <div className="field-error">{errors.lastName}</div>
                            )}
                          </div>

                          <div className='input-group mb-3'>
                            <Field name="email" placeholder="Email" type="email"
                                   className={'form-control ' +(errors.email && touched.email ? 'error' : '')}/>
                            {errors.email &&
                            touched.email && <div className="field-error">{errors.email}</div>}
                          </div>
                          <div className='input-group mb-3'>
                            <Field name="password" type="password"
                                   placeholder='Password'
                                   className={'form-control ' + (errors.password && touched.password ? 'error' : '')}/>
                            {errors.password &&
                            touched.password && <div className="field-error">{errors.password}</div>}
                          </div>
                          <button type="submit" className='btn btn-block btn-success'>Submit</button>
                          <div className='row '>
                            <div className='col-12'>
                              <p>Already have an account? <Link to='/signin' className="btn btn-link px-0" >Sign In</Link></p>
                            </div>
                          </div>
                        </Form>
                      )}
                    />
                  </div>
                  <div className={'alert alert-danger ' + (!successful && messages.length !== 0 ? '' : 'd-none')}>
                    <p>{ messages } </p>
                  </div>
                  <div className={successful? '' : 'd-none'}>
                    <p>You have successfully created an account. Please proceed to:</p>
                    <button className='btn btn-block btn-success' onClick={this.redirectToLogin}>Log In</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    signup: state.signup
  }
}

Signup.propTypes = {
  signup: PropTypes.object.isRequired,
  signUpRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {signUpRequest})(Signup);
