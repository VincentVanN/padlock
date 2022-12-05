/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import { collection } from '@firebase/firestore';
import { useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase.config';
import { useConnexion } from '../../hooks/useConnexion';
import useUrl from '../../hooks/useUrl';
import PasswordLabel from '../PasswordLabel/PasswordLabel';
import PswField from '../PswField/PswField';
import RegistrationControls from '../RegistrationControls/RegistrationControls';
import { useGetUser } from '../../hooks/useGetUser';

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
const Url = styled.div`
font-size: 0.9em;
text-align: center;
margin-bottom: 20px;
`;
function App() {
  const [password, setpassword] = useState({ value: '', copied: false });
  const [ifPasswordExist, setifPasswordExist] = useState(false);
  const url = useUrl();
  const userCollectionRef = collection(db, 'users');
  const [logged, users] = useConnexion(userCollectionRef);
  const data = useGetUser(userCollectionRef, users);

  return (
    <AppContainer>
      <Header>
        <img src="/lock-48.png" alt="lock" />
        <Title>PadLocker</Title>
      </Header>
      <Url>
        Hôte: {url}
      </Url>
      <PasswordLabel ifPasswordExist={ifPasswordExist} />
      <PswField password={password} setpassword={setpassword} ifPasswordExist={ifPasswordExist} />
      {password.value && (
        <RegistrationControls />
      )}
    </AppContainer>
  );
}

export default App;
