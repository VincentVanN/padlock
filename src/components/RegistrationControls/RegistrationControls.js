import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { memorizePassword } from '../../../asyncChunkApp';

const RegistationControlsContainer = styled.div`
width: 100%;
margin-top: 15px;
`;
const RegistrationControlsButtonContainer = styled.div`
display: flex;
align-items: center;
margin-top: 10px;
`;
const RegistrationControlsButton = styled(motion.button)`
margin-left: 10px;
width: 20px;
height: 20px;
-webkit-appearance: none;
border-radius: 50%;
border: 2px solid #666666;
background: ${({ ismanualpassword }) => (ismanualpassword ? '#4d4d4d' : 'black')};
`;
const RegistrationControlsButtonLabel = styled.p`
margin-left: 10px;
`;
const Form = styled.form`
display: flex;
justify-content: center;
align-items: center;
`;
const Input = styled.input`
border: solid 1px white;
background: black;
color: white;
border-radius: 5px;
margin-top: 10px;
font-family: 'Montserrat', sans-serif;
`;
const InputContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
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
      <RegistrationControlsButtonContainer>
        <RegistrationControlsButton
          type="button"
          whileTap={{ scale: 0.8 }}
          onClick={registrationHandler}
        />
        <RegistrationControlsButtonLabel>
          {isMemorizePassword ? 'Mot de passe enregistré!' : 'Enregistrer le mot de passe généré'}
        </RegistrationControlsButtonLabel>
      </RegistrationControlsButtonContainer>
      <RegistrationControlsButtonContainer>
        <RegistrationControlsButton
          type="button"
          whileTap={{ scale: 0.8 }}
          onClick={() => setisManualPassword(true)}
          ismanualpassword={isManualPassword}
        />
        <RegistrationControlsButtonLabel>
          enregistrement manuel
        </RegistrationControlsButtonLabel>
      </RegistrationControlsButtonContainer>
      {isManualPassword && (
        <Form
          ref={ref}
          // onSubmit={verifEmail}
        >
          <InputContainer>
            <Input type={isHidden ? 'password' : 'text'} />
            <ion-icon
              name={`eye-${!isHidden ? 'off-' : ''}outline`}
              onClick={() => setisHidden(!isHidden)}
              style={{
                fontSize: '24px',
                marginLeft: '5px',
                marginTop: '5px',
              }}
            />
          </InputContainer>
        </Form>
      )}
    </RegistationControlsContainer>
  );
}

export default RegistrationControls;
