/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* global chrome */
import { useEffect, useState } from 'react';

const useUrl = () => {
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
  return url;
};

export default useUrl;
