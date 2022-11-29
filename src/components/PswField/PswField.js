import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { generator } from '../../../utils/generator';

const PswFieldContainer = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  font-weight: 600;
`;
const Title = styled.h2`
  color: rgba(255,255,255,0.8);
  text-align: center;
  margin-top: 10px;
  &:hover{
    color: #3260a8;
    cursor: pointer;
    };
`;
const PswdContainer = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.2em;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CopiedSpan = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.9em;
  font-weight: 400;
`;
const ClipBoardIcon = styled.div`
margin-left: 20px;
font-size: 1.2em;
  &:hover{
    color: #3260a8;
    cursor: pointer;
    };
`;
function PswField({ password, setpassword }) {
  const handleClick = useCallback(() => {
    setpassword({ ...password, value: generator() });
  }, []);
  useEffect(() => {
    if (password.copied) {
      setTimeout(() => {
        setpassword({ ...password, copied: false });
      }, 3000);
    }
  }, [password]);
  return (
    <PswFieldContainer>
      <Title
        onClick={handleClick}
      >Générer un mot de passe
      </Title>
      {password.value && (
        <PswdContainer>
          <p>{password.value}</p>
          <CopyToClipboard
            text={password.value}
            onCopy={() => setpassword({ ...password, copied: true })}
          >
            <ClipBoardIcon>
              <ion-icon name="copy-outline" />
            </ClipBoardIcon>
          </CopyToClipboard>
          {password.copied ? <CopiedSpan>copié!</CopiedSpan> : null}
        </PswdContainer>
      )}

    </PswFieldContainer>
  );
}
PswField.propTypes = {
  password: PropTypes.object.isRequired,
  setpassword: PropTypes.func.isRequired,
};
export default PswField;
