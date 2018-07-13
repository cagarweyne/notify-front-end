import axios from 'axios';
import TOKEN_API from './helpers';

export default {
  signupApi(user) {
    const {firstName, lastName, email, password} = user;
    const url = 'http://localhost:3090/signup';
    return axios({
      method: 'post',
      url: url,
      data: {
        firstName,
        lastName,
        email,
        password
      }
    });
  },

  signinApi(user) {
    const {email, password} = user;
    const url = 'http://localhost:3090/signin';
    return axios({
      method: 'post',
      url: url,
      data: {
        email,
        password
      }
    });
  },

  getProfileApi() {
    const url = 'http://localhost:3090/profile';
    const token = TOKEN_API.getAccessToken();
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token }
    })
  },

  addChildApi(child) {
    const url = 'http://localhost:3090/add-child';
    const token = TOKEN_API.getAccessToken();

    return axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token },
      url: url,
      data: child
    });
  },

  postAbsenceApi(absence) {
    const url = 'http://localhost:3090/notify';
    const token = TOKEN_API.getAccessToken();

    return axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token },
      url: url,
      data: absence
    });
  },

}
