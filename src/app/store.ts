import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import loginReducer from 'src/pages/auth/login/loginSlice';
import authReducer from 'src/pages/auth/authSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    auth: authReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
