//import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { BrowserRouter } from 'react-router-dom';

//import index reducer and index sagas
import reducers from './reducers/reducers';
import IndexSagas from './index-sagas';

import './index.css';
import App from './components/App/App';

//setup the middleware to watch between the Reducers and the actions
const sagaMiddleware = createSagaMiddleware();

const logger = createLogger();
const store = createStore(reducers, applyMiddleware(sagaMiddleware, logger));

//start the Index Saga
sagaMiddleware.run(IndexSagas);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

