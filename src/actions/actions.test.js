import * as actions from './actions';
import { GET_PROFILE, RESET_NOTIFY_PROPS, START_CHANNEL } from './constants';

describe('actions', () => {
  it('should create an action to get the user profile', () => {
    const expectedAction = {
      type: GET_PROFILE
    };

    expect(actions.getProfile()).toEqual(expectedAction);
  });

  it('creates an action to reset props', () => {
    const expectedAction = {
      type: RESET_NOTIFY_PROPS
    };

    expect(actions.resetNotifyProps()).toEqual(expectedAction);
  });

  it('creates an action to start web socket channel', () => {
    const expectedAction = {
      type: START_CHANNEL
    };

    expect(actions.startWebSocket()).toEqual(expectedAction);
  });
});
