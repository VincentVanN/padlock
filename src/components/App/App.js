import { useState } from 'react';
import styled from 'styled-components';
import PswField from '../PswField/PswField';

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
  font-family: 'Montserrat', sans-serif;
`;
const Title = styled.h1`
  width: 100%;
  height: 20%;
  font-size: 2em;
  text-align: center;
`;
function App() {
  const [password, setpassword] = useState({ value: '', copied: false });
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
      <PswField password={password} setpassword={setpassword} />
    </AppContainer>
  );
}

export default App;
