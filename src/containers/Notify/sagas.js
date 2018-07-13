import { takeLatest, call, put } from 'redux-saga/effects';
import { POST_ABSENCE_REQUEST, POST_ABSENCE_SUCCESS, POST_ABSENCE_FAILURE } from './constants';
import API from '../../lib/API/api';

function* postAbsenceFlow(action) {
  try {
    const response = yield call(API.postAbsenceApi, action.payload);
    yield put({type: POST_ABSENCE_SUCCESS, payload: response});

  } catch(error) {
    yield put({type: POST_ABSENCE_FAILURE, payload: error});
  }
}

export default function* postAbsenceFlowWatcher() {
  //takeLatest will take the latest call of that action and run it
  yield takeLatest(POST_ABSENCE_REQUEST, postAbsenceFlow);
}