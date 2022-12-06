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
      // getUsers();
      // return result.data;
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
    try {
      const data = await getDocs(userCollectionRef);
      return data.docs;
    }
    catch (error) {
      return error;
    }
  },
);
export const createUser = createAsyncThunk(
  'app/createUser',
  async () => {
    try {
      await setDoc(doc(userCollectionRef, auth.currentUser.uid), { email: auth.currentUser.email, name: auth.currentUser.displayName });
      return true;
    }
    catch (error) {
      return error;
    }
  },
);
export const getUser = createAsyncThunk(
  'app/getUser',
  async () => {
    try {
      const urlCollectionRef = collection(db, `users/${auth.currentUser.uid}/urlData`);
      const currentData = await getDocs(urlCollectionRef);
      return currentData.docs;
    }
    catch (error) {
      return error;
    }
  },
);

export const memorizePassword = createAsyncThunk(
  'app/memorisePassword',
  async (_, { getState }) => {
    try {
      const memorizePasswordRef = collection(db, `users/${auth.currentUser.uid}/urlData`);
      await setDoc(doc(memorizePasswordRef), { password: encrypt(getState().app.password.value), url: getState().app.url });
      return true;
    }
    catch (error) {
      return error;
    }
  },
);
export const getPassword = createAsyncThunk(
  'app/getPassword',
  async (passwordId) => {
    try {
      const passwordRef = doc(db, 'users', auth.currentUser.uid, 'urlData', passwordId);
      const currentData = await getDoc(passwordRef);
      return currentData;
    }
    catch (error) {
      return error;
    }
  },
);
export const updatePassword = createAsyncThunk(
  'app/updatePassword',
  async (passwordId, { getState }) => {
    try {
      const passwordRef = doc(db, 'users', auth.currentUser.uid, 'urlData', passwordId);
      const currentData = await setDoc(passwordRef, { url: getState().app.url, password: encrypt(getState().app.password.value) });
      return currentData;
    }
    catch (error) {
      return error;
    }
  },
);
