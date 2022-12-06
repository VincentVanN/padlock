/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import CryptoJS from 'crypto-js';

export const encrypt = (password) => CryptoJS.AES.encrypt(password, process.env.REACT_APP_ENCRYPT_KEY).toString();

export const decrypt = (password) => CryptoJS.AES.decrypt(password, process.env.REACT_APP_ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
