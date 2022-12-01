/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* global chrome */
import { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import styled from 'styled-components';
import PasswordLabel from '../PasswordLabel/PasswordLabel';
import PswField from '../PswField/PswField';
import RegistrationControls from '../RegistrationControls/RegistrationControls';

const AppContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background: #000;
  color: white;
  padding-bottom: 40px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;
const Title = styled.h1`
  width: 100%;
  height: 20%;
  font-size: 2em;
  text-align: center;
`;
const Url = styled.div`
font-size: 0.9em;
text-align: center;
margin-bottom: 20px;
`;
function App() {
  const API_KEY = 'AIzaSyB4aeImXjkgJxv-AQGBMpuCOutKk1HLoJs';
  const [password, setpassword] = useState({ value: '', copied: false });
  const [ifPasswordExist, setifPasswordExist] = useState(false);
  const [userSignedIn, setuserSignedIn] = useState(false);

  const [url, setUrl] = useState('');
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };
    chrome.tabs && chrome.tabs.query(queryInfo, (tabs) => {
      const { url } = tabs[0];
      const pathArray = url.split('/');
      const host = pathArray[2];
      setUrl(host);
    });
  }, []);
  // useEffect(() => {
  //   chrome.identity.onSignInChanged.addListener((account_id, signedIn) => {
  //     if (signedIn) {
  //       setuserSignedIn(true);
  //     }
  //     else {
  //       setuserSignedIn(false);
  //     }
  //   });
  //   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //     if (request.message === 'get_auth_token') {
  //       chrome.identity.getAuthToken({ interactive: true }, (token) => {
  //         console.log(token);
  //       });
  //     }
  //     else if (request.message === 'get_profile') {
  //       chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, (user_info) => {
  //         console.log(user_info);
  //       });
  //     }
  //     else if (request.message === 'get_contacts') {
  //       chrome.identity.getAuthToken({ interactive: true }, (token) => {
  //         let fetch_url = `https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=${API_KEY}`;
  //         const fetch_options = {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         };

  //         fetch(fetch_url, fetch_options)
  //           .then((res) => res.json())
  //           .then((res) => {
  //             if (res.memberCount) {
  //               const members = res.memberResourceNames;
  //               fetch_url = `https://people.googleapis.com/v1/people:batchGet?personFields=names&key=${API_KEY}`;

  //               members.forEach((member) => {
  //                 fetch_url += `&resourceNames=${encodeURIComponent(member)}`;
  //               });

  //               fetch(fetch_url, fetch_options)
  //                 .then((res) => res.json())
  //                 .then((res) => console.log(res));
  //             }
  //           });
  //       });
  //     }
  //   });
  // }, []);
  return (
    <AppContainer>
      <Header>
        <img src="/lock-48.png" alt="lock" />
        <Title>PadLocker</Title>
      </Header>

      <GoogleButton />
      <Url>
        Hôte: {url}
      </Url>
      <PasswordLabel ifPasswordExist={ifPasswordExist} />
      <PswField password={password} setpassword={setpassword} ifPasswordExist={ifPasswordExist} />
      {password.value && (
        <RegistrationControls />
      )}
    </AppContainer>
  );
}

export default App;
