import { BaseDataResponse, ErrorResponse } from './../../types/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import topicAPI from 'src/api/topicAPI';
import { MessageResponse } from 'src/types';
import { TopicResponse } from 'src/types/Topic';

interface InitialState {
  isLoading: boolean;
  data: TopicResponse[];
  message: string;
}
const initialState: InitialState = {
  isLoading: false,
  data: [],
  message: '',
};

export const fetchGetTopics = createAsyncThunk<
  BaseDataResponse<TopicResponse[]>,
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
      });
  },
});
export default topicSlice;
