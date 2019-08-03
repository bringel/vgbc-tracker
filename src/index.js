//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { getCurrentUserToken } from './services/firebase';

import { initializeFirebase } from './services/firebase';

import 'bootstrap/dist/css/bootstrap.css';

initializeFirebase().then(() => {
  axios.interceptors.request.use((config) => {
    return getCurrentUserToken().then((token) => {
      config.headers.common['Authorization'] = `Bearer ${token}`;
      return config;
    });
  });

  ReactDOM.render(<App />, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/2vJdu84
serviceWorker.unregister();
