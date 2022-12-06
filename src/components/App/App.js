/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* global chrome */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setUrl } from '../../../app.slice';
import {
  chromeConnexion,
  createUser,
  getPassword,
  getUser,
  getUsers,
} from '../../../asyncChunkApp';
import { auth } from '../../firebase.config';
import PasswordLabel from '../PasswordLabel/PasswordLabel';
import PasswordPresent from '../PasswordPresent';
import PswField from '../PswField/PswField';
import RegistrationControls from '../RegistrationControls/RegistrationControls';
import UrlComponent from './UrlComponent';

const AppContainer = styled.div`
  position: relative;
  width: 400px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;
const ContentContainer = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
const Title = styled.h1`
  width: 100%;
  font-size: 2em;
  text-align: center;
  margin-top: 20px;
`;

function App() {
  const dispatch = useDispatch();
  const {
    users,
    password,
    data,
    url,
    currentPasswordObject,
    isMemorizePassword,
  } = useSelector((state) => state.app);
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };
    chrome.tabs && chrome.tabs.query(queryInfo, (tabs) => {
      const { url } = tabs[0];
      const pathArray = url.split('/');
      const host = pathArray[2];
      dispatch(setUrl(host));
    });
  }, []);
  useEffect(() => {
    dispatch(chromeConnexion());
    if (chromeConnexion) {
      dispatch(getUsers());
    }
  }, [chromeConnexion]);
  useEffect(() => {
    if (users.length !== 0 && data.length === 0) {
      if (users.some((element) => element.id === auth.currentUser.uid)) {
        dispatch(getUser());
      }
      else dispatch(createUser());
    }
  }, [users, data]);
  useEffect(() => {
    if (data.length !== 0 && url) {
      if (data.some((element) => element.data.url === url)) {
        const passwordObject = data.find((element) => element.data.url === url);
        dispatch(getPassword(passwordObject.id));
      }
    }
  }, [data, url]);
  useEffect(() => {
    if (isMemorizePassword) {
      dispatch(getUser());
    }
  }, [isMemorizePassword]);
  return (
    <AppContainer>
      <Header>
        <img
          src="/padlocker.png"
          alt="lock"
          style={{
            width: '48px',
            height: '48px',
            opacity: '0.6',
          }}
        />
        <Title>PadLocker</Title>
      </Header>
      <ContentContainer>
        {users.length !== 0 && (
        <PasswordLabel />
        )}
        {users.length !== 0 && !currentPasswordObject && (
        <div>
          <UrlComponent />
          <PswField />
          {password.value && (
          <RegistrationControls />
          )}
        </div>
        )}
        {currentPasswordObject && (
        <PasswordPresent />
        )}
        {!users.length === 0 && (
        <p>Vous devez être connecté à votre compte google</p>
        )}
      </ContentContainer>
    </AppContainer>
  );
}

export default App;
