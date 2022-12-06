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
function PasswordLabel() {
  const { currentPasswordObject } = useSelector((state) => state.app);
  return (
    <PasswordManagementLabel>
      {currentPasswordObject ? 'Un mot de passe existe pour ce site' : 'Pas de mot de passe enregistré pour ce site'}
    </PasswordManagementLabel>
  );
}

export default React.memo(PasswordLabel);
