import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPI from 'src/api/authAPI';
import { ForgotPasswordResponse, UserForgotPassword } from 'src/types/User';
import { BaseDataResponse, ErrorResponse } from 'src/types/index';

const initialState = {
  isLoading: false,
  data: null,
};
export const fetchForgotPassword = createAsyncThunk<
  BaseDataResponse<ForgotPasswordResponse>,
  UserForgotPassword,
  { rejectValue: ErrorResponse }
>('/auth/forgot-password', async (payload, thunkAPI) => {
  try {
    const response = await authAPI.forgotPassword(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

const forgotPasswordSlice = createSlice({ name: 'forgotpassword', initialState, reducers: {} });
export default forgotPasswordSlice;
