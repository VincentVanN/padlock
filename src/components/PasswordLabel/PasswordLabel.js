import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const PasswordManagementLabel = styled.div`
width: 100%;
margin-top: 10px;
font-size: 1em;
text-align: center;

`;
function PasswordLabel() {
  const { currentPasswordObject } = useSelector((state) => state.app);
  return (
    <PasswordManagementLabel>
      {currentPasswordObject ? 'Un mot de passe existe pour ce site' : 'pas de mot de passe enregistré pour ce site'}
    </PasswordManagementLabel>
  );
}

export default React.memo(PasswordLabel);
