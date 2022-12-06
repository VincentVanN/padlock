/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* global chrome */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUrl } from '../../app.slice';

const useUrl = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };
    chrome.tabs && chrome.tabs.query(queryInfo, (tabs) => {
      const { url } = tabs[0];
      const pathArray = url.split('/');
      const host = pathArray[2];
      dispatch(setUrl(host));
    });
  }, []);
};

export default useUrl;
