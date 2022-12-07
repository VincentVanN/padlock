/* eslint-disable import/no-cycle */
import { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setLoading, setpassword, setUpdatedPassword } from '../../app.slice';
import { getPassword, updatePassword } from '../../asyncChunkApp';
import { decrypt } from '../../utils/crypt';
import { ClickText, StyledDiv, StyledDivButton } from './PswField';
import { Input } from './RegistrationControls';

const PasswordPresentContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
`;
export const Message = styled.div`
  position: absolute;
  bottom: 25px;
  margin: auto;
`;
function PasswordPresent() {
  const dispatch = useDispatch();
  const { currentPasswordObject, updatedPassword, password } = useSelector((state) => state.app);
  const [isHidden, setisHidden] = useState(true);
  const [isPasswordHidden, setisPasswordHidden] = useState(true);
  const [modify, setModify] = useState(false);
  const [message, setmessage] = useState('');
  const passwordToDisplay = decrypt(currentPasswordObject.data.password);
  const ref = useRef(null);
  const handleModify = () => {
    if (!ref.current.value) {
      setmessage('vous devez saisir un mot de passe');
    }
    else {
      dispatch(setpassword({ value: ref.current.value, copied: false }));
      dispatch(updatePassword(currentPasswordObject.id));
      setModify(false);
      dispatch(setLoading(true));
    }
  };
  useEffect(() => {
    if (updatedPassword) {
      dispatch(getPassword(currentPasswordObject.id));
      dispatch(setUpdatedPassword());
    }
  }, [updatedPassword]);
  useEffect(() => {
    if (password.copied) {
      setTimeout(() => {
        dispatch(setpassword({ ...password, copied: false }));
      }, 3000);
    }
  }, [password]);
  return (
    <PasswordPresentContainer>
      {isPasswordHidden
        ? (
          <StyledDivButton
            onClick={() => setisPasswordHidden(!isPasswordHidden)}
          >afficher
          </StyledDivButton>
        )
        : (
          <div
            style={{
              display: 'flex',
              alignItem: 'center',
              justifyContent: 'center',
            }}
          >
            <StyledDiv>
              {passwordToDisplay}
            </StyledDiv>
            <CopyToClipboard
              text={passwordToDisplay}
              onCopy={() => dispatch(setpassword({ ...password, copied: true }))}
            >
              <ClickText>
                {!password.copied ? 'Copier?' : 'Copié!'}
              </ClickText>
            </CopyToClipboard>
          </div>
        )}
      {modify && (
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
              onFocus={() => setmessage('')}
              placeholder="Entrez votre mdp"
              autofocus
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
              onClick={handleModify}
            >
              valider
            </ClickText>
          </div>
        </div>
      )}
      {!modify && (
        <StyledDivButton
          onClick={() => setModify(true)}
        >
          modifier
        </StyledDivButton>
      )}
      {message && (
      <Message>
        {message}
      </Message>
      )}

    </PasswordPresentContainer>
  );
}

export default PasswordPresent;
