import { takeLatest, call, put } from 'redux-saga/effects';
import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE } from './constants';
import API from '../../lib/API/api';
import TOKEN_API from '../../lib/API/helpers';

function* signinFlow(action) {
  try {
    const response = yield call(API.signinApi, action.payload);
    //call setToken function and add token to the storage
    TOKEN_API.setAccessToken(response.data.token);
    yield put({type: SIGNIN_SUCCESS, payload: response});

  } catch(error) {
    yield put({type: SIGNIN_FAILURE, payload: error});
  }
}

export default function* signinWatcher() {
  //takeLatest will take the latest call of that action and run it
  yield takeLatest(SIGNIN_REQUEST, signinFlow);
}