import firebase from 'firebase/app';
import 'firebase/firestore';

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
firebaseConfig = {
  apiKey: "AIzaSyCez9FnxSm3dO_VhCzu-VuD63cOLWh8U0M",
  authDomain: "cheaptrip-tim.firebaseapp.com",
  projectId: "cheaptrip-tim",
  storageBucket: "cheaptrip-tim.appspot.com",
  messagingSenderId: "552600711944",
  appId: "1:552600711944:web:01634ca1b8b75e392b72bd"
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
//     authDomain: "transferPage-buses.firebaseapp.com",
//     projectId: "transferPage-buses",
//     storageBucket: "transferPage-buses.appspot.com",
//     messagingSenderId: "931946718227",
//     appId: "1:931946718227:web:4873f29ebbdd23ba484be6"
//   };
// }

// DEV
// var firebaseConfig = {
//     apiKey: 'AIzaSyAIUNvdpgFHgU0eVhMoEtDLCBpAfSUuEiA',
//     authDomain: "transferPage-buses.firebaseapp.com",
//     projectId: "transferPage-buses",
//     storageBucket: "transferPage-buses.appspot.com",
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