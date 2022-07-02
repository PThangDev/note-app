import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authAPI from 'src/api/authAPI';
import { UserResponse } from 'src/types/User';
import storage from 'src/utils/storage';

interface InitialState {
  user: UserResponse | null;
  message: string;
  isAuthenticate: boolean;
}

const initialState: InitialState = {
  user: storage.get<UserResponse>('user') || null,
  message: '',
  isAuthenticate: Boolean(storage.get('user')),
};

export const fetchLogout = createAsyncThunk('/auth/logout', async (payload, thunkAPI) => {
  try {
    const response = await authAPI.logout();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
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
      state.user = null;
      if (action.payload) {
        toast.error(action.payload);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLogout.pending, (state) => {})
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.isAuthenticate = false;
        state.user = null;
        state.message = action.payload.message;
        storage.remove('user');
        toast.error(action.payload.message);
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.message = 'Failed';
      });
  },
});

export const { setAuthenticate, logout } = authSlice.actions;
export default authSlice.reducer;
