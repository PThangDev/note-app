import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import topicAPI from 'src/api/topicAPI';
import { Topic } from 'src/types/Topic';
import { BaseDataResponse, ErrorResponse } from './../../types';

interface InitialStateProps {
  isLoading: boolean;
  data: Topic | undefined;
  message: string;
}

const initialState: InitialStateProps = {
  isLoading: false,
  data: undefined,
  message: '',
};

export const fetchGetTopicDetail = createAsyncThunk<
  BaseDataResponse<Topic>,
  string,
  { rejectValue: ErrorResponse }
>('/topics/:id/:slug', async (payload, thunkAPI) => {
  try {
    const response = await topicAPI.getTopicDetail(payload);

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

const topicDetailSlice = createSlice({
  name: 'topic_detail',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGetTopicDetail.pending, (state, action) => {
        state.isLoading = true;
        state.data = undefined;
      })
      .addCase(fetchGetTopicDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data || undefined;
      })
      .addCase(fetchGetTopicDetail.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export default topicDetailSlice;
