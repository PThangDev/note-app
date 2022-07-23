import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import topicAPI from 'src/api/topicAPI';
import { Topic } from 'src/types/Topic';
import sweetAlert from 'src/utils/sweetAlert';
import Swal from 'sweetalert2';
import { BaseDataResponse, ErrorResponse } from './../../types/index';

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
export const fetchUpdateTopic = createAsyncThunk<
  BaseDataResponse<Topic>,
  Partial<Topic>,
  { rejectValue: ErrorResponse }
>('update#topics/:id', async (payload, thunkAPI) => {
  try {
    const response = await topicAPI.updateTopic(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});
export const fetchDeleteTopic = createAsyncThunk<
  BaseDataResponse<Topic>,
  string,
  { rejectValue: ErrorResponse }
>('/topics/delele', async (payload, thunkAPI) => {
  try {
    const response = await topicAPI.deleteTopic(payload);
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
      // Get Topics
      .addCase(fetchGetTopics.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchGetTopics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data || [];
      })
      .addCase(fetchGetTopics.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.errors?.message);
      })
      // Create Topic
      .addCase(fetchCreateTopic.pending, (state, action) => {
        sweetAlert.loading();
      })
      .addCase(fetchCreateTopic.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.data = [action.payload.data, ...state.data];
          sweetAlert.success(action.payload.message);
        }
      })
      .addCase(fetchCreateTopic.rejected, (state, action) => {
        sweetAlert.error(action.payload?.errors?.message);
      })
      // Update Topic
      .addCase(fetchUpdateTopic.pending, (state, action) => {
        sweetAlert.loading();
      })
      .addCase(fetchUpdateTopic.fulfilled, (state, action) => {
        state.data = state.data.map((topic) => {
          if (topic._id === action.payload.data?._id) {
            return action.payload.data;
          } else {
            return topic;
          }
        });
        sweetAlert.success(action.payload.message);
      })
      .addCase(fetchUpdateTopic.rejected, (state, action) => {
        sweetAlert.error(action.payload?.errors?.message);
      })
      // Delete Topic
      .addCase(fetchDeleteTopic.pending, (state, action) => {
        sweetAlert.loading();
      })
      .addCase(fetchDeleteTopic.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.data = state.data.filter((topic) => topic._id !== action.payload.data?._id);
          sweetAlert.success(action.payload.message);
        }
      })
      .addCase(fetchDeleteTopic.rejected, (state, action) => {
        sweetAlert.error(action.payload?.errors?.message);
      });
  },
});
export default topicSlice;
