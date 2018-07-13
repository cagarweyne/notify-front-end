import * as Yup from "yup";

export const AddChildSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z ]*$/, { message: 'Alphabet characters only', excludeEmptyString: true })
    .required('Required'),
  lastName: Yup.string()
    .matches(/^[a-zA-Z ]*$/, { message: 'Alphabet characters only', excludeEmptyString: true })
    .required('Required'),
  yearGroup: Yup.string()
    .test('yearGroup', 'Choose a year group', yearGroup => yearGroup !== 'Select')
    .required('Required')
});

export const SelectChildSchema = Yup.object().shape({
  child: Yup.string()
    .test('child', 'Please select a child', child => child !== 'Select')
    .required('Required')
});

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  firstName: Yup.string()
    .matches(/^[a-zA-Z ]*$/, { message: 'Alphabet characters only', excludeEmptyString: true })
    .required('Required'),
  lastName: Yup.string()
    .matches(/^[a-zA-Z ]*$/, { message: 'Alphabet characters only', excludeEmptyString: true })
    .required('Required'),
  password: Yup.string()
    //.test('password', 'Choose topic', password => password.length > 6)
    .required('Required')
});

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
  //.test('password', 'Choose topic', password => password.length > 6)
    .required('Required')
});