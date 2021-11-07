import firebase from 'firebase/compat/app'
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDnzPuvRD8fw5goAq9PboDPmcZg58yws4",
  authDomain: "digitalassetmanagement-b81f0.firebaseapp.com",
  projectId: "digitalassetmanagement-b81f0",
  storageBucket: "digitalassetmanagement-b81f0.appspot.com",
  messagingSenderId: "177800823673",
  appId: "1:177800823673:web:f184e4e853ecd0990565a8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage()