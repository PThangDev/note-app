import { BaseDataResponse, ErrorResponse } from './../../types/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import topicAPI from 'src/api/topicAPI';
import { MessageResponse } from 'src/types';
import { Topic } from 'src/types/Topic';

interface InitialState {
  isLoading: boolean;
  data: Topic[];
  message: string;
}
const initialState: InitialState = {
  isLoading: false,
  data: [],
  message: '',
};

export const fetchGetTopics = createAsyncThunk<
  BaseDataResponse<Topic[]>,
  undefined,
  { rejectValue: ErrorResponse }
>('/topics', async (payload, thunkAPI) => {
  try {
    const response = await topicAPI.getTopics();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});
export const fetchCreateTopic = createAsyncThunk<
  BaseDataResponse<Topic>,
  Partial<Topic>,
  { rejectValue: ErrorResponse }
>('/topics/create', async (payload, thunkAPI) => {
  try {
    const response = await topicAPI.createTopic(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGetTopics.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchGetTopics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data || [];
      })
      .addCase(fetchGetTopics.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        toast.error(action.payload?.errors.message);
      })
      .addCase(fetchCreateTopic.pending, (state, action) => {})
      .addCase(fetchCreateTopic.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.data = [action.payload.data, ...state.data];
        }
      })
      .addCase(fetchCreateTopic.rejected, (state, action) => {
        toast.error(action.payload?.errors.message);
      });
  },
});
export default topicSlice;
