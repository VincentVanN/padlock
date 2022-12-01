/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* global chrome */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PasswordLabel from '../PasswordLabel/PasswordLabel';
import PswField from '../PswField/PswField';
import RegistrationControls from '../RegistrationControls/RegistrationControls';

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
  const [url, setUrl] = useState('');
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };
    chrome.tabs && chrome.tabs.query(queryInfo, (tabs) => {
      const { url } = tabs[0];
      const pathArray = url.split('/');
      const host = pathArray[2];
      setUrl(host);
    });
  }, []);
  console.log(url);
  return (
    <AppContainer>
      <img src="/lock-48.png" alt="lock" />
      <Title>PadLocker</Title>
      <Url>
        URL: {url}
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
