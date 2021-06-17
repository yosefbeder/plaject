import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAU42JDuiKZ0FumSc1gaPBbgF8imSuyxKg',
  authDomain: 'plaject.firebaseapp.com',
  projectId: 'plaject',
  storageBucket: 'plaject.appspot.com',
  messagingSenderId: '738988967156',
  appId: '1:738988967156:web:0e9ee57c89ace98f874aa1',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();
