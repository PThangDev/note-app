import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPI from 'src/api/authAPI';
import { ErrorResponse, MessageResponse } from 'src/types';
import { UserRegister } from 'src/types/User';

interface InitialState {
  isLoading: boolean;
  message: string;
}

const initialState: InitialState = {
  isLoading: false,
  message: '',
};

export const fetchRegister = createAsyncThunk<MessageResponse, UserRegister, { rejectValue: ErrorResponse }>(
  '/auth/register',
  async (payload, thunkAPI) => {
    try {
      const response = await authAPI.register(payload);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ErrorResponse);
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
export default registerSlice.reducer;
