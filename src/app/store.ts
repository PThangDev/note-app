import { Action, configureStore, Middleware, ThunkAction } from '@reduxjs/toolkit';

import authSlice, { logout } from 'src/pages/auth/authSlice';
import forgotPasswordSlice from 'src/pages/auth/forgot-password/forgotPasswordSlice';
import loginSlice from 'src/pages/auth/login/loginSlice';
import noteSlice from 'src/pages/notes/noteSlice';
import notesOtherSlice from 'src/pages/notes/notesOtherSlice';
import noteDetailSlice from 'src/pages/note_detail/noteDetailSlice';
import notesPinnedSlice from 'src/pages/pins/notesPinnedSlice';
import topicSlice from 'src/pages/topics/topicSlice';
import topicDetailSlice from 'src/pages/topic-detail/topicDetailSlice';

// {"type":"register","_id":"62bc0a14cdbb9429e6f26e84","username":"PThangDev","email":"pthjrr@gmail.com","password":"","avatar":"https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png","role":"customer","createdAt":"2022-06-29T08:15:16.371Z","updatedAt":"2022-06-29T17:44:15.371Z","__v":0,"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJjMGExNGNkYmI5NDI5ZTZmMjZlODQiLCJpYXQiOjE2NTY3MzQ1NzgsImV4cCI6MTY1NjczNDg3OH0.e4XSczExp90ssu4YPJSq39XZSHLCxMrSuhrnZGVCTSk","refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJjMGExNGNkYmI5NDI5ZTZmMjZlODQiLCJpYXQiOjE2NTY3MzQ1NzgsImV4cCI6MTY1OTMyNjU3OH0.7WQAxQsU-q13TOONGQiQJlDxqAifH8wRzZgxk09wVHA"}

const checkTokenExpirationMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.payload?.status === 401) {
    return store.dispatch(logout(action.payload?.errors.message));
  }
  next(action);
};

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    login: loginSlice.reducer,

    notes: noteSlice.reducer,
    noteDetail: noteDetailSlice.reducer,
    notesPinned: notesPinnedSlice.reducer,
    notesOther: notesOtherSlice.reducer,

    topics: topicSlice.reducer,
    topicDetail: topicDetailSlice.reducer,

    forgotPassword: forgotPasswordSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(checkTokenExpirationMiddleware),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
