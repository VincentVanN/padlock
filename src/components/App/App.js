/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  chromeConnexion,
  createUser,
  getUser,
  getUsers,
} from '../../../asyncChunkApp';
import { auth } from '../../firebase.config';
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
  const dispatch = useDispatch();
  const users = useSelector((state) => state.app.users);
  const password = useSelector((state) => state.app.password);
  const data = useSelector((state) => state.app.data);
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
  return (
    <AppContainer>
      <Header>
        <img src="/lock-48.png" alt="lock" />
        <Title>PadLocker</Title>
      </Header>
      {users.length !== 0 && (
      <div>
        <UrlComponent />
        <PasswordLabel />
        <PswField />
        {password.value && (
        <RegistrationControls />
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
