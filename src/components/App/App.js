import { useState } from 'react';
import styled from 'styled-components';
import PasswordLabel from '../PasswordLabel/PasswordLabel';
import PswField from '../PswField/PswField';
import RegistrationControls from '../RegistrationControls/RegistrationControls';

const AppContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background: #000;
  color: white;
  border-radius: 20px;
  padding-bottom: 40px;
  box-shadow: 2px 8px 11px -5px rgba(0,0,0,0.75);
  
`;
const Title = styled.h1`
  width: 100%;
  height: 20%;
  font-size: 2em;
  text-align: center;
`;
function App() {
  const [password, setpassword] = useState({ value: '', copied: false });
  const [ifPasswordExist, setifPasswordExist] = useState(false);
  return (
    <AppContainer>
      <ion-icon
        name="lock-closed-outline"
        style={{
          fontSize: '48px',
          marginTop: '20px',
        }}
      />
      <Title>PadLocker</Title>
      <PasswordLabel ifPasswordExist={ifPasswordExist} />
      <PswField password={password} setpassword={setpassword} ifPasswordExist={ifPasswordExist} />
      {password.value && (
        <RegistrationControls />
      )}
    </AppContainer>
  );
}

export default App;
