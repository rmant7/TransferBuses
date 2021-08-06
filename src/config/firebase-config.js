import firebase from 'firebase';

// var firebaseConfig = {
//     apiKey: `${process.env.REACT_APP_FIREBASE_APIKEY}`,
//     authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
//     projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
//     storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
//     messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
//     appId: `${process.env.REACT_APP_FIREBASE_ID}`
//   };
var firebaseConfig = {
    apiKey: 'AIzaSyAIUNvdpgFHgU0eVhMoEtDLCBpAfSUuEiA',
    authDomain: "transfer-buses.firebaseapp.com",
    projectId: "transfer-buses",
    storageBucket: "transfer-buses.appspot.com",
    messagingSenderId: "931946718227",
    appId: "1:931946718227:web:4873f29ebbdd23ba484be6"
  };

  export const fb = firebase.initializeApp(firebaseConfig);