import io from 'socket.io-client';
import { eventChannel, delay } from 'redux-saga';
import { take, call, put, fork, race, cancelled } from 'redux-saga/effects';
import {
  GET_PROFILE,
  STOP_CHANNEL,
  CHANNEL_ON,
  CHANNEL_OFF,
  SERVER_ON,
  SERVER_OFF,
  START_CHANNEL
} from './constants';

const socketServerURL = 'http://localhost:3090';
let socket;
const connect = () => {
  socket = io(socketServerURL);
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  })
};

const disconnect = () => {
  socket = io(socketServerURL);
  return new Promise((resolve) => {
    socket.on('disconnect', () => {
      resolve(socket);
    });
  });
};

const reconnect = () => {
  socket = io(socketServerURL);
  return new Promise((resolve) => {
    socket.on('reconnect', () => {
      resolve(socket);
    });
  });
};

// This is how channel is created
const createSocketChannel = socket => eventChannel((emit) => {
  const handler = (data) => {
    emit(data);
  };
  socket.on('newAbsence', handler);
  return () => {
    socket.off('newAbsence', handler);
  };
});

// connection monitoring sagas
const listenDisconnectSaga = function* () {
  while (true) {
    yield call(disconnect);
    yield put({type: SERVER_OFF});
  }
};

const listenConnectSaga = function* () {
  while (true) {
    yield call(reconnect);
    yield put({type: SERVER_ON});
  }
};

// Saga to switch on channel.
const listenServerSaga = function* () {
  try {
    yield put({type: CHANNEL_ON});
    const {timeout} = yield race({
      connected: call(connect),
      timeout: delay(2000),
    });
    if (timeout) {
      yield put({type: SERVER_OFF});
    }
    const socket = yield call(connect);
    const socketChannel = yield call(createSocketChannel, socket);
    yield fork(listenDisconnectSaga);
    yield fork(listenConnectSaga);
    yield put({type: SERVER_ON});

    while (true) {
      const payload = yield take(socketChannel);
      yield put({type: GET_PROFILE, payload});
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
      yield put({type: CHANNEL_OFF});
    }
  }
};

// saga listens for start and stop actions
export const startStopChannel = function* () {
  while (true) {
    yield take(START_CHANNEL);
    yield race({
      task: call(listenServerSaga),
      cancel: take(STOP_CHANNEL),
    });
  }
};
