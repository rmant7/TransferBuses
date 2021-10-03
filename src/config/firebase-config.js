import firebase from 'firebase';

// var firebaseConfig = {
//     apiKey: `${process.env.REACT_APP_FIREBASE_APIKEY}`,
//     authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
//     projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
//     storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
//     messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
//     appId: `${process.env.REACT_APP_FIREBASE_ID}`
//   };

let firebaseConfig = {}

firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_APIKEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_ID}`
};
// if(process.env.REACT_APP_BUILD_MODE === 'prod'){
//   firebaseConfig = {
//     apiKey: `${process.env.REACT_APP_FIREBASE_APIKEY}`,
//     authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
//     projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
//     storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
//     messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
//     appId: `${process.env.REACT_APP_FIREBASE_ID}`
//   };
// } else {
//   firebaseConfig = {
//     apiKey: 'AIzaSyAIUNvdpgFHgU0eVhMoEtDLCBpAfSUuEiA',
//     authDomain: "transfer-buses.firebaseapp.com",
//     projectId: "transfer-buses",
//     storageBucket: "transfer-buses.appspot.com",
//     messagingSenderId: "931946718227",
//     appId: "1:931946718227:web:4873f29ebbdd23ba484be6"
//   };
// }

// DEV
// var firebaseConfig = {
//     apiKey: 'AIzaSyAIUNvdpgFHgU0eVhMoEtDLCBpAfSUuEiA',
//     authDomain: "transfer-buses.firebaseapp.com",
//     projectId: "transfer-buses",
//     storageBucket: "transfer-buses.appspot.com",
//     messagingSenderId: "931946718227",
//     appId: "1:931946718227:web:4873f29ebbdd23ba484be6"
//   };


// PROD
// const firebaseConfig = {
//   apiKey: "AIzaSyCgKLUOLllUaX4lXWam1uDKKbNGF4WcUZY",
//   authDomain: "transferbuses.firebaseapp.com",
//   projectId: "transferbuses",
//   storageBucket: "transferbuses.appspot.com",
//   messagingSenderId: "766106301817",
//   appId: "1:766106301817:web:f4eb8e224bbdcb7f17aba8",
//   // measurementId: "G-FS6TM7FPZS"
// };


export const fb = firebase.initializeApp(firebaseConfig);