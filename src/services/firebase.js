import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDzBwWcz0GBhivtQ-aTMaDtl4i7OeHLMpI',
  authDomain: 'vgbc-tracker.firebaseapp.com',
  databaseURL: 'https://vgbc-tracker.firebaseio.com',
  projectId: 'vgbc-tracker',
  storageBucket: 'vgbc-tracker.appspot.com',
  messagingSenderId: '221426422910'
};

const firebaseApp = firebase.initializeApp(config);

export const loginProvider = new firebase.auth.FacebookAuthProvider();

export default firebaseApp;
