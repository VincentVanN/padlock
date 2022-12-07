import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { generator } from '../../utils/generator';
import { setpassword } from '../../app.slice';

const PswFieldContainer = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
export const ClickText = styled.div`
height: 100%;
font-size: 0.8em;
display: flex;
align-items: center;
justify-content: center;
  &:hover{
    cursor: pointer;
    color: black;
    font-weight: 600;
    };
`;
export const StyledDivButton = styled.div`
  width: 85%;
  display: flex;
  margin: 10px;
  align-items: center;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 20px 30px;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1px;
  border-radius: 40px;
  font-size: 0.8em;
  box-shadow: -2px -2px 8px rgba(255, 255, 255, 1), -2px -2px 12px rgba(255, 255, 255, 0.5), inset 2px 2px 4px rgba(255, 255, 255, 0.1), 2px 2px 8px rgba(0, 0, 0, 0.15)
  ;
  &:hover{
    cursor: pointer;
    box-shadow: inset -2px -2px 8px rgba(255, 255, 255, 1), inset -2px -2px 12px rgba(255, 255, 255, 0.5), inset 2px 2px 4px rgba(255, 255, 255, 0.1), inset 2px 2px 8px rgba(0, 0, 0, 0.15);
    & p{
      scale: 0.98;
    }
    };
`;
export const StyledDiv = styled.div`
  width: 85%;
  text-align: center;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 20px 30px;
  margin: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 40px;
  text-align: center;
  box-shadow: inset -2px -2px 8px rgba(255, 255, 255, 1), inset -2px -2px 12px rgba(255, 255, 255, 0.5), inset 2px 2px 4px rgba(255, 255, 255, 0.1), inset 2px 2px 8px rgba(0, 0, 0, 0.15);
 `;
function PswField() {
  const password = useSelector((state) => state.app.password);
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(setpassword({ ...password, value: generator() }));
  }, []);
  useEffect(() => {
    if (password.copied) {
      setTimeout(() => {
        dispatch(setpassword({ ...password, copied: false }));
      }, 3000);
    }
  }, [password]);
  return (
    <PswFieldContainer>
      {!password.value && (
        <StyledDivButton
          onClick={handleClick}
          style={{
            position: 'absolute',
            top: '50%',
            left: '17%',
            transform: 'translate(-50px, -50px)',
          }}
        >
          <p>Générer un mot de passe</p>
        </StyledDivButton>
      )}
      {password.value && (

        <div
          style={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'center',
          }}
        >
          <StyledDiv>
            <p>{password.value}</p>
          </StyledDiv>
          <div
            style={{
              margin: 'auto',
            }}
          >
            <CopyToClipboard
              text={password.value}
              onCopy={() => dispatch(setpassword({ ...password, copied: true }))}
            >
              <ClickText>
                {!password.copied ? 'Copier?' : 'Copié!'}
              </ClickText>
            </CopyToClipboard>
          </div>

        </div>

      )}
    </PswFieldContainer>
  );
}
export default PswField;
