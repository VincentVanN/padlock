/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';
import {
  chromeConnexion,
  createUser,
  getUser,
  getUsers,
} from './asyncChunkApp';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    password: { value: '', copied: false },
    ifPasswordExist: false,
    users: [],
    data: [],
    chromeConnexion: false,
    url: '',
    createUser: false,
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
      state.data = payload.map((element) => ([...state.data, { id: element.id, data: element.data() }]));
      console.log('[getUser] OK!');
    },
    [getUser.rejected]: ({ payload }) => {
      console.log(payload);
      console.log('[getUser] request rejected');
    },
  },
  reducers: {
    setpassword: (state, { payload }) => {
      state.password = payload;
    },
    setifPasswordExist: (state, { payload }) => {
      state.ifPasswordExist = payload;
    },
  },
});
export const {
  setpassword,
  setifPasswordExist,
} = appSlice.actions;
export default appSlice.reducer;
