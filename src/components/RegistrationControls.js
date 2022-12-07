/* eslint-disable import/no-cycle */
import styled from 'styled-components';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { memorizePassword } from '../../asyncChunkApp';
import { ClickText, StyledDiv, StyledDivButton } from './PswField';
import { setLoading, setpassword } from '../../app.slice';
import { Message } from './PasswordPresent';

const RegistationControlsContainer = styled.div`
width: 100%;
height: 65%;
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-around;
`;
export const Input = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  font-family: 'Montserrat', sans-serif;
  &::placeholder { 
  color: #5a84a2;
  opacity: 0.8;
  font-family: 'Montserrat', sans-serif; 
}
`;

function RegistrationControls() {
  const dispatch = useDispatch();
  const { isMemorizePassword } = useSelector((state) => state.app);
  const [isManualPassword, setisManualPassword] = useState(false);
  const [isHidden, setisHidden] = useState(true);
  const [message, setmessage] = useState('');
  const ref = useRef();
  const registrationHandler = () => {
    setisManualPassword(false);
    dispatch(memorizePassword());
  };
  const handleClickManuel = () => {
    if (!ref.current.value) {
      setmessage('vous devez saisir un mot de passe');
    }
    else {
      dispatch(setpassword({ value: ref.current.value, copied: false }));
      dispatch(memorizePassword());
      dispatch(setLoading(true));
    }
  };
  return (
    <RegistationControlsContainer>
      <StyledDivButton
        onClick={registrationHandler}
      >
        {isMemorizePassword ? 'Mot de passe enregistré!' : 'Enregistrer le mot de passe généré'}
      </StyledDivButton>
      {!isManualPassword && (
      <StyledDivButton
        onClick={() => setisManualPassword(true)}
      >
        enregistrement manuel
      </StyledDivButton>
      )}

      {isManualPassword && (
      <div
        style={{
          display: 'flex',
          alignItem: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledDiv>
          <Input
            ref={ref}
            type={isHidden ? 'password' : 'text'}
            placeholder="Entrez votre mdp"
          />
        </StyledDiv>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <ClickText
            onClick={() => setisHidden(!isHidden)}
          >
            {isHidden ? 'Voir' : 'Cacher'}
          </ClickText>
          <ClickText
            onClick={handleClickManuel}
          >
            valider
          </ClickText>
        </div>
      </div>
      )}
      {message && (
      <Message>
        {message}
      </Message>
      )}
    </RegistationControlsContainer>
  );
}

export default RegistrationControls;
