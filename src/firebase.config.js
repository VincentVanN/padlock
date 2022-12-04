/* eslint-disable import/prefer-default-export */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app);

// const getGoogleAuthCredential = () => new Promise()((resolve, reject) => {
//   chrome.identity.getAuthToken({ interactive: true }, (token) => {
//     if (chrome.runtime.lastError) {
//       console.error(chrome.runtime.lastError);
//       reject(chrome.runtime.lastError);
//     }
//     const credential = GoogleAuthProvider.credential(null, token);
//     resolve(credential);
//   });
// });
// const signIn = async () => {
//   try {
//     const credential = await getGoogleAuthCredential();
//     const result = await signInWithCredential(auth, credential);
//     return result.user;
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// };
// console.log(signIn());
