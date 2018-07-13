import { all } from 'redux-saga/effects';
//import all individual sagas first
import SignupSaga from './containers/Signup/sagas';
import SignInSaga from './containers/Signin/sagas';
import ProfileSaga from './actions/profile-saga';
import AddchildSaga from './containers/AddChild/sagas';
import AddAbsenceSaga from './containers/Notify/sagas';
import {startStopChannel} from './actions/websocket-saga';

export default function* IndexSaga() {
  yield all([
    //call each imported saga
    SignupSaga(),
    SignInSaga(),
    ProfileSaga(),
    AddchildSaga(),
    AddAbsenceSaga(),
    startStopChannel()
  ])
}
