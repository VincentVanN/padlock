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
  updatePassword,
} from './asyncChunkApp';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: true,
    password: { value: '', copied: false },
    users: [],
    data: [],
    chromeConnexion: false,
    url: '',
    createUser: false,
    isMemorizePassword: false,
    currentPasswordObject: null,
    updatedPassword: false,
  },
  extraReducers: {
    [chromeConnexion.fulfilled]: (state) => {
      state.chromeConnexion = true;
      console.log('[chromeConnexion] OK!');
    },
    //
    //
    [getUsers.fulfilled]: (state, { payload }) => {
      state.users = payload;
      console.log('[getUsers] OK!');
    },
    //
    //
    [createUser.fulfilled]: (state, { payload }) => {
      state.createUser = payload;
      console.log('[createUser] OK!');
    },
    //
    //
    [getUser.fulfilled]: (state, { payload }) => {
      payload.forEach((element) => state.data.push({ id: element.id, data: element.data() }));
      console.log('[getUser] OK!');
    },
    //
    //
    [memorizePassword.fulfilled]: (state) => {
      state.isMemorizePassword = true;
      console.log('[memorizePassword] OK!');
    },
    //
    //
    [getPassword.fulfilled]: (state, { payload }) => {
      state.currentPasswordObject = { id: payload.id, data: payload.data() };
      console.log('[getPassword] OK!');
    },
    //
    //
    [updatePassword.fulfilled]: (state) => {
      state.updatedPassword = true;
      console.log('[updatePassword] OK!');
    },
  },
  reducers: {
    setpassword: (state, { payload }) => {
      state.password = payload;
    },
    setUrl: (state, { payload }) => {
      state.url = payload;
    },
    setUpdatedPassword: (state) => {
      state.updatedPassword = false;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});
export const {
  setpassword,
  setUrl,
  setUpdatedPassword,
  setLoading,
} = appSlice.actions;
export default appSlice.reducer;
