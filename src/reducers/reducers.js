import { combineReducers } from 'redux';
import parentInfo from './getParentProfile';
import signup from '../containers/Signup/reducer';
import signin from '../containers/Signin/reducer';
import profileErrorReducer from './profileErrorReducer';
import addChildReducer from '../containers/AddChild/reducer';
import absenceReducer from '../containers/Notify/reducer';

export default combineReducers({
  parentInfo,
  signup,
  signin,
  profileErrorReducer,
  addChildReducer,
  absenceReducer
});