/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-alert */
/* global chrome */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from '@firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth, db } from './src/firebase.config';
import { encrypt } from './utils/crypt';

const userCollectionRef = collection(db, 'users');

export const chromeConnexion = createAsyncThunk(
  'app/chromeConnexion',
  (_, { rejectWithValue }) => chrome.identity.getAuthToken({ interactive: true }, (token) => {
    if (chrome.runtime.lastError || !token) {
      alert(`chrome get token error : ${JSON.stringify(chrome.runtime.lastError)}`);
      return;
    }
    try {
      signInWithCredential(auth, GoogleAuthProvider.credential(null, token));
    }
    catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }),
);
export const getUsers = createAsyncThunk(
  'app/getUsers',
  async () => {
    const data = await getDocs(userCollectionRef);
    return data.docs;
  },
);
export const createUser = createAsyncThunk(
  'app/createUser',
  async () => {
    await setDoc(doc(userCollectionRef, auth.currentUser.uid), { email: auth.currentUser.email, name: auth.currentUser.displayName });
    return true;
  },
);
export const getUser = createAsyncThunk(
  'app/getUser',
  async () => {
    const urlCollectionRef = collection(db, `users/${auth.currentUser.uid}/urlData`);
    const currentData = await getDocs(urlCollectionRef);
    return currentData.docs;
  },
);

export const memorizePassword = createAsyncThunk(
  'app/memorisePassword',
  async (_, { getState }) => {
    const memorizePasswordRef = collection(db, `users/${auth.currentUser.uid}/urlData`);
    await setDoc(doc(memorizePasswordRef), { password: encrypt(getState().app.password.value), url: getState().app.url });
    return true;
  },
);
export const getPassword = createAsyncThunk(
  'app/getPassword',
  async (passwordId) => {
    const passwordRef = doc(db, 'users', auth.currentUser.uid, 'urlData', passwordId);
    const currentData = await getDoc(passwordRef);
    return currentData;
  },
);
export const updatePassword = createAsyncThunk(
  'app/updatePassword',
  async (passwordId, { getState }) => {
    const passwordRef = doc(db, 'users', auth.currentUser.uid, 'urlData', passwordId);
    const currentData = await setDoc(passwordRef, { url: getState().app.url, password: encrypt(getState().app.password.value) });
    return currentData;
  },
);
