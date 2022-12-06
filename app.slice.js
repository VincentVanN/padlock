/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';
import {
  chromeConnexion,
  createUser,
  getPassword,
  getUser,
  getUsers,
  memorizePassword,
} from './asyncChunkApp';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    password: { value: '', copied: false },
    users: [],
    data: [],
    chromeConnexion: false,
    url: '',
    createUser: false,
    isMemorizePassword: false,
    currentPasswordObject: null,
  },
  extraReducers: {
    [chromeConnexion.pending]: () => {
      console.log('[chromeConnexion]waiting...');
    },
    [chromeConnexion.fulfilled]: (state) => {
      state.chromeConnexion = true;
      console.log('[chromeConnexion] OK!');
    },
    [chromeConnexion.rejected]: ({ payload }) => {
      console.log(payload);
      console.log('[chromeConnexion] request rejected');
    },
    //
    //
    [getUsers.pending]: () => {
      console.log('[getUsers]waiting...');
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.users = payload;
      console.log('[getUsers] OK!');
    },
    [getUsers.rejected]: ({ payload }) => {
      console.log(payload);
      console.log('[getUsers] request rejected');
    },
    //
    //
    [createUser.pending]: () => {
      console.log('[createUser]waiting...');
    },
    [createUser.fulfilled]: (state, { payload }) => {
      state.createUser = payload;
      console.log('[createUser] OK!');
    },
    [createUser.rejected]: ({ payload }) => {
      console.log(payload);
      console.log('[createUser] request rejected');
    },
    //
    //
    [getUser.pending]: () => {
      console.log('[getUser]waiting...');
    },
    [getUser.fulfilled]: (state, { payload }) => {
      payload.forEach((element) => state.data.push({ id: element.id, data: element.data() }));
      console.log('[getUser] OK!');
    },
    [getUser.rejected]: ({ payload }) => {
      console.log(payload);
      console.log('[getUser] request rejected');
    },
    //
    //
    [memorizePassword.pending]: () => {
      console.log('[memorizePassword]waiting...');
    },
    [memorizePassword.fulfilled]: (state) => {
      state.isMemorizePassword = true;
      console.log('[memorizePassword] OK!');
    },
    [memorizePassword.rejected]: ({ payload }) => {
      console.log(payload);
      console.log('[memorizePassword] request rejected');
    },
    //
    //
    [getPassword.pending]: () => {
      console.log('[getPassword]waiting...');
    },
    [getPassword.fulfilled]: (state, { payload }) => {
      state.currentPasswordObject = payload;
      console.log('[getPassword] OK!');
    },
    [getPassword.rejected]: ({ payload }) => {
      console.log(payload);
      console.log('[getPassword] request rejected');
    },
  },
  reducers: {
    setpassword: (state, { payload }) => {
      state.password = payload;
    },
    setUrl: (state, { payload }) => {
      state.url = payload;
    },
  },
});
export const {
  setpassword,
  setUrl,
} = appSlice.actions;
export default appSlice.reducer;
