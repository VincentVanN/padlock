import styled from 'styled-components';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { memorizePassword } from '../../../asyncChunkApp';
import { StyledDiv, StyledDivButton } from '../PswField/PswField';

const RegistationControlsContainer = styled.div`
width: 100%;
height: 65%;
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-around;
`;
const Input = styled.input`
  width: 100%;
  background: transparent;
  border: none;
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
  const ref = useRef();
  const registrationHandler = () => {
    setisManualPassword(false);
    dispatch(memorizePassword());
  };
  return (
    <RegistationControlsContainer>
      <StyledDivButton
        onClick={registrationHandler}
      >
        {isMemorizePassword ? 'Mot de passe enregistré!' : 'Enregistrer le mot de passe généré'}
      </StyledDivButton>
      <StyledDivButton
        onClick={() => setisManualPassword(true)}
      >
        enregistrement manuel
      </StyledDivButton>
      {isManualPassword && (
      <StyledDiv>
        <Input
          ref={ref}
          type={isHidden ? 'password' : 'text'}
          placeholder="Entrez votre mot de passe"
        />
        <ion-icon
          name={`eye-${!isHidden ? 'off-' : ''}outline`}
          onClick={() => setisHidden(!isHidden)}
          style={{
            fontSize: '24px',
            marginLeft: '5px',
            marginTop: '5px',
          }}
        />
      </StyledDiv>
      )}
    </RegistationControlsContainer>
  );
}

export default RegistrationControls;
