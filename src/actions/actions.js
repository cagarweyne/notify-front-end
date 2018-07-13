import { GET_PROFILE, RESET_NOTIFY_PROPS, START_CHANNEL } from './constants';

export const resetNotifyProps = () => {
  return {
    type: RESET_NOTIFY_PROPS
  }
}

export const getProfile = () => {
  return {
    type: GET_PROFILE
  }
}

export const startWebSocket = () => {
  return {
    type: START_CHANNEL
  }
}
