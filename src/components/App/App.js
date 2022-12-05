/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* global chrome */
import { collection, getDocs } from '@firebase/firestore';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../../firebase.config';
import PasswordLabel from '../PasswordLabel/PasswordLabel';
import PswField from '../PswField/PswField';
import RegistrationControls from '../RegistrationControls/RegistrationControls';
import UrlComponent from './UrlComponent';

const AppContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background: #000;
  color: white;
  padding-bottom: 40px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;
const Title = styled.h1`
  width: 100%;
  height: 20%;
  font-size: 2em;
  text-align: center;
`;

function App() {
  console.log('App');
  const [password, setpassword] = useState({ value: '', copied: false });
  const [ifPasswordExist, setifPasswordExist] = useState(false);
  const userCollectionRef = collection(db, 'users');
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(data.docs);
  };
  useEffect(() => {
    if (users.length === 0) {
      console.log('connexion');
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError || !token) {
          alert(`chrome get token error : ${JSON.stringify(chrome.runtime.lastError)}`);
          return;
        }
        signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
          .then((res) => {
            getUsers();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }, [users]);
  return (
    <AppContainer>
      <Header>
        <img src="/lock-48.png" alt="lock" />
        <Title>PadLocker</Title>
      </Header>
      {users.length !== 0 && (
      <div>
        <UrlComponent />
        <PasswordLabel ifPasswordExist={ifPasswordExist} />
        <PswField password={password} setpassword={setpassword} ifPasswordExist={ifPasswordExist} />
        {password.value && (
        <RegistrationControls userCollectionRef={userCollectionRef} users={users} />
        )}
      </div>
      )}
      {!users.length === 0 && (
        <p>Vous devez être connecté à votre compte google</p>
      )}
    </AppContainer>
  );
}

export default App;
