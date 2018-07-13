import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { SelectChildSchema } from '../../../lib/Schema/Yup-user-schema';

class ChildSelect extends Component {

  renderChildren = () => {
    return this.props.profile.children.map(child => {
      return <option key={child.id} value={child.id}>{child.fullName}</option>
    });
  }
  render() {
    const { children } = this.props.profile;
    if(!children) {return null}
    return (
      <div>
        <div>
          <Formik
            initialValues={{
              child: 'Select'
            }}
            validationSchema={SelectChildSchema}
            onSubmit={this.props.handleChildSelect}
            render={({ errors, touched }) => (
              <Form>
                <div className='form-group child-select'>
                  <label htmlFor="yearGroup">Select Child</label>
                  <Field component="select"
                         style={{maxWidth: '400px'}}
                         name="child"
                         className={'form-control ' + (errors.child && touched.child ? 'error' : '')}>
                    <option value='Select'>Select</option>
                    {this.renderChildren()}
                  </Field>
                  {errors.child &&
                  touched.child && <span className="field-error">{errors.child}</span>}
                </div>
                <div>
                  <button type="submit" className='btn btn-primary'>Next</button>
                </div>
              </Form>
            )}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.parentInfo
  }
}

ChildSelect.propTypes = {
  profile: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(ChildSelect);

