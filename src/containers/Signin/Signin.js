import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { SignInSchema } from '../../lib/Schema/Yup-user-schema';
import { signInRequest } from './actions';
import { Link } from 'react-router-dom';
import TOKEN_API from "../../lib/API/helpers";

class Signin extends Component {

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
    this.props.signInRequest(user);
  }

  componentDidUpdate(prevProps) {
    if(this.props.signin.successfulSignIn) {
      this.props.history.push('/app');
    }
  }

  render() {
    const { errors, requestingSignin } = this.props.signin;
    if(requestingSignin) {
      return <div>Signing...</div>
    }
    return (
      <div className='app flex-row align-items-center  pace-done'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-4'>
              <div className='card-group'>
                <div className='card p-4'>
                  <div>
                    <h1>Sign In</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <Formik
                      initialValues={{
                        email: '',
                        password: ''
                      }}
                      validationSchema={SignInSchema}
                      onSubmit={this.handleSubmit}
                      render={({ errors, touched }) => (
                        <Form className='form-group'>
                          <div className='input-group mb-3'>
                            <Field name="email" type="email"
                                   placeholder='Email Address'
                                   className={'form-control ' + (errors.email && touched.email ? 'error' : '')}/>
                            {errors.email &&
                            touched.email && <span className="field-error">{errors.email}</span>}
                          </div>
                          <div className='input-group mb-3'>

                            <Field name="password" type="password"
                                   placeholder='Password'
                                   className={'form-control ' + (errors.password && touched.password ? 'error' : '')}/>
                            {errors.password &&
                            touched.password && <span className="field-error">{errors.password}</span>}
                          </div>
                          <div className='row'>
                            <div className='col-6'>
                              <button type="submit" className='btn btn-primary px-4'>Submit</button>
                            </div>
                            <div className='col-6'>
                              <Link to='/signup' className="btn btn-link px-0" >Sign Up</Link>
                            </div>
                          </div>

                        </Form>
                      )}
                    />
                    <div className={errors !== '' ? 'alert alert-danger' : 'd-none'}>
                      <p>Wrong user name or email address</p>
                    </div>
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
    signin: state.signin
  }
}

Signin.propTypes = {
  signin: PropTypes.object.isRequired,
  signInRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { signInRequest })(Signin);
