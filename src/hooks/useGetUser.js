/* eslint-disable max-len */
import {
  doc, setDoc,
} from 'firebase/firestore';
import { collection, getDocs } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase.config';

/* eslint-disable import/prefer-default-export */
export const useGetUser = (userCollectionRef, users) => {
  const [data, setdata] = useState([]);
  const getUser = async () => {
    const urlCollectionRef = collection(db, `users/${auth.currentUser.uid}/urlData`);
    const currentData = await getDocs(urlCollectionRef);
    currentData.docs.map((element) => setdata([...data, element.data()]));
  };
  const createUser = async () => {
    await setDoc(doc(userCollectionRef, auth.currentUser.uid), { email: auth.currentUser.email, name: auth.currentUser.displayName });
    getUser();
  };
  useEffect(() => {
    if (users.length !== 0 && auth.currentUser) {
      if (users.some((element) => element.id === auth.currentUser.uid)) {
        getUser();
      }
      else createUser();
    }
  }, [users, auth]);
  return data;
};
