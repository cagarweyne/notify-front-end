import { POST_ABSENCE_REQUEST } from './constants';

export function notifyAbsence(absence) {
  return {
    type: POST_ABSENCE_REQUEST,
    payload: absence
  }
}