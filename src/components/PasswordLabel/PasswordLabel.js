import PropTypes from 'prop-types';
import styled from 'styled-components';

const PasswordManagementLabel = styled.div`
width: 100%;
margin-top: 10px;
font-size: 1em;
text-align: center;

`;
function PasswordLabel({ ifPasswordExist }) {
  return (
    <PasswordManagementLabel>
      {ifPasswordExist ? 'Un mot de passe existe pour ce site' : 'pas de mot de passe enregistré pour ce site'}
    </PasswordManagementLabel>
  );
}
PasswordLabel.propTypes = {
  ifPasswordExist: PropTypes.bool.isRequired,
};
export default PasswordLabel;
