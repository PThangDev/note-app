import { createSlice } from '@reduxjs/toolkit';
import { UserResponse } from 'src/types/User';
import storage from 'src/utils/storage';

const initialState = {
  user: storage.get<UserResponse>('user') || null,
  message: '',
  isAuthenticate: Boolean(storage.get('user')),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticate(state) {
      const user = storage.get<UserResponse>('user');
      state.isAuthenticate = true;
      state.user = user;
    },
  },
  extraReducers: {},
});

export const { setAuthenticate } = authSlice.actions;
export default authSlice.reducer;
