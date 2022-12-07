import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const PasswordManagementLabel = styled.div`
width: 100%;
height: 5%;
margin-top: 20px;
font-size: 1em;
text-align: center;
`;
const Present = styled.div`
  color: #0AC3A7;
`;
const Absent = styled.div`
  color: #576664;
`;
function PasswordLabel() {
  const { currentPasswordObject } = useSelector((state) => state.app);
  return (
    <PasswordManagementLabel>
      {currentPasswordObject ? <Present>Un mot de passe existe pour ce site</Present>
        : <Absent>Pas de mot de passe enregistré pour ce site</Absent>}
    </PasswordManagementLabel>
  );
}

export default React.memo(PasswordLabel);
