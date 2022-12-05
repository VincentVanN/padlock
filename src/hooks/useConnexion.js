/* eslint-disable no-unused-vars */
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { getDocs } from '@firebase/firestore';
import { auth } from '../firebase.config';
/* global chrome */
/* eslint-disable import/prefer-default-export */
export const useConnexion = (userCollectionRef) => {
  const [logged, setlogged] = useState(false);
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(data.docs);
  };
  useEffect(() => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        alert(`chrome get token error : ${JSON.stringify(chrome.runtime.lastError)}`);
        return;
      }
      signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
        .then((res) => {
          setlogged(true);
          getUsers();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);
  return [logged, users];
};
