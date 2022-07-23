import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import noteAPI from 'src/api/noteAPI';
import { BaseDataResponse, ErrorResponse, QueryParams } from 'src/types';
import { Note } from 'src/types/Note';

interface InitialState {
  data: Note[];
  isLoading: boolean;
}

const initialState: InitialState = {
  data: [],
  isLoading: false,
};

export const fetchGetNotesPinned = createAsyncThunk<
  BaseDataResponse<Note[]>,
  QueryParams | undefined,
  { rejectValue: ErrorResponse }
>('/note/pins', async (payload, thunkAPI) => {
  try {
    const response = await noteAPI.getNotes(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

const notesPinnedSlice = createSlice({
  name: 'notesPinned',
  initialState,
  reducers: {},
  extraReducers(builder) {
    //
    builder
      .addCase(fetchGetNotesPinned.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchGetNotesPinned.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data || [];
      })
      .addCase(fetchGetNotesPinned.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export default notesPinnedSlice;
