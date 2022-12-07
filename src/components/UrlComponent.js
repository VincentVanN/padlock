import { useSelector } from 'react-redux';
import styled from 'styled-components';

const UrlContainer = styled.div`
width: 100%;
height: 5%;
font-size: 1em;
margin-top: 20px;
text-align: center;
`;
function UrlComponent() {
  const { url } = useSelector((state) => state.app);
  return (
    <UrlContainer>
      {url}
    </UrlContainer>
  );
}

export default UrlComponent;
