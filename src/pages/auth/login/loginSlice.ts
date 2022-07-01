import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPI from 'src/api/authAPI';
import { BaseDataResponse, MessageResponse } from 'src/types';
import { UserLogin, UserResponse } from 'src/types/User';
import storage from 'src/utils/storage';
import { setAuthenticate } from '../authSlice';

interface InitialState {
  isLoading: boolean;
  data: UserResponse | null;
  message: string;
}

const initialState: InitialState = {
  isLoading: false,
  data: null,
  message: '',
};

export const fetchLogin = createAsyncThunk<
  BaseDataResponse<UserResponse>,
  UserLogin,
  { rejectValue: MessageResponse }
>('/auth/login', async (payload, thunkAPI) => {
  try {
    const response = await authAPI.login(payload);
    // Save user to local storage
    storage.set('user', response.data);
    // Set state authenticate
    thunkAPI.dispatch(setAuthenticate());

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as MessageResponse);
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data || null;
        state.message = action.payload.message;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload?.message || '';
      });
  },
});
export default loginSlice.reducer;
