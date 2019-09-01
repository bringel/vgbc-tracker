//@flow
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export function initializeFirebase() {
  if (process.env.NODE_ENV === 'development') {
    const config = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || '',
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || ''
    };

    const app = firebase.initializeApp(config);
    return Promise.resolve(app);
  } else {
    return fetch('/__/firebase/init.json').then((response) => {
      return response.json().then((res) => {
        const app = firebase.initializeApp(res);
        return app;
      });
    });
  }
}

export const usersCollection = () => firebase.firestore().collection('users');
export const gamesCollection = () => firebase.firestore().collection('games'); // holds the game of the month from each month
export const codesCollection = () => firebase.firestore().collection('codes');
export const suggestionsCollection = () => firebase.firestore().collection('suggestions');

export const getCurrentUserToken = () => {
  const user = firebase.auth().currentUser;
  return user ? user.getIdToken() : Promise.resolve('');
};

export default firebase;
