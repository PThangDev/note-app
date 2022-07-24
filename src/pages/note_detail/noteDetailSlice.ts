import { BaseDataResponse, ErrorResponse } from './../../types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Note } from 'src/types/Note';
import noteAPI from 'src/api/noteAPI';
import { formatDate } from 'src/utils';

interface InitialStateProps {
  isLoading: boolean;
  data: Note | undefined;
  message: string;
}

const initialState: InitialStateProps = {
  isLoading: false,
  data: undefined,
  message: '',
};

export const fetchGetNoteDetail = createAsyncThunk<
  BaseDataResponse<Note>,
  string,
  { rejectValue: ErrorResponse }
>('/note/:slug', async (payload, thunkAPI) => {
  try {
    const response = await noteAPI.getNote(payload);

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

const noteDetailSlice = createSlice({
  name: 'note_detail',
  initialState,
  reducers: {
    updateNote(state, action: PayloadAction<Note>) {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGetNoteDetail.pending, (state, action) => {
        state.isLoading = true;
        state.data = undefined;
      })
      .addCase(fetchGetNoteDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data || undefined;
      })
      .addCase(fetchGetNoteDetail.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export default noteDetailSlice;
export const { updateNote } = noteDetailSlice.actions;
