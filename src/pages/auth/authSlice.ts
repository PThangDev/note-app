import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authAPI from 'src/api/authAPI';
import { BaseDataResponse, ErrorResponse, MessageResponse } from 'src/types';
import { UserResponse } from 'src/types/User';
import storage from 'src/utils/storage';

interface InitialState {
  isLoading: boolean;
  user: UserResponse | undefined;
  message: string;
  isAuthenticate: boolean;
}

const initialState: InitialState = {
  isLoading: false,
  user: storage.get<UserResponse>('user') || undefined,
  message: '',
  isAuthenticate: Boolean(storage.get('user')),
};

export const fetchLogout = createAsyncThunk<MessageResponse, undefined, { rejectValue: ErrorResponse }>(
  '/auth/logout',
  async (payload, thunkAPI) => {
    try {
      const response = await authAPI.logout();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ErrorResponse);
    }
  }
);
export const fetchVerifyAccount = createAsyncThunk<
  BaseDataResponse<UserResponse>,
  string,
  { rejectValue: ErrorResponse }
>('/auth/active/activeToken', async (payload, thunkAPI) => {
  try {
    const response = await authAPI.verifyAccount(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticate(state) {
      const user = storage.get<UserResponse>('user');
      state.isAuthenticate = true;
      state.user = user;
    },
    logout(state, action: PayloadAction<string | undefined>) {
      storage.remove('user');
      state.isAuthenticate = false;
      state.user = undefined;
      if (action.payload) {
        toast.error(action.payload);
      }
    },
  },
  extraReducers(builder) {
    builder
      //Logout
      .addCase(fetchLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticate = false;
        state.user = undefined;
        state.message = action.payload.message;
        storage.remove('user');
        toast.error(action.payload.message);
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.isLoading = false;
        state.message = 'Failed';
      })
      // Verify Account
      .addCase(fetchVerifyAccount.pending, (state) => {})
      .addCase(fetchVerifyAccount.fulfilled, (state, action) => {
        state.isAuthenticate = true;
        state.user = action.payload.data || undefined;
        storage.set('user', action.payload.data);
        toast.success(action.payload.message);
      })
      .addCase(fetchVerifyAccount.rejected, (state, action) => {
        state.message = 'Failed';
        toast.error(action.payload?.errors.message);
      });
  },
});

export const { setAuthenticate, logout } = authSlice.actions;
export default authSlice;
