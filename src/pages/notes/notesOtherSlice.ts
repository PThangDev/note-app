import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import noteAPI from 'src/api/noteAPI';
import { BaseDataResponse, ErrorResponse, Pagination, QueryParams } from 'src/types';
import { Note } from 'src/types/Note';

interface InitialState {
  isLoading: boolean;
  data: Note[];
  pagination?: Pagination;
}

const initialState: InitialState = {
  isLoading: false,
  data: [],
  pagination: undefined,
};

export const fetchGetNotesOther = createAsyncThunk<
  BaseDataResponse<Note[]>,
  undefined | QueryParams,
  { rejectValue: ErrorResponse }
>('/notes/others', async (payload, thunkAPI) => {
  try {
    const response = await noteAPI.getNotesOther(payload);
    // Map time
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

const notesOtherSlice = createSlice({
  name: 'notes_other',
  initialState,
  reducers: {
    togglePinNote(state, action: PayloadAction<Note>) {
      if (action.payload.is_pin) {
        state.data = state.data.filter((note) => note._id !== action.payload._id);
      } else {
        state.data = [action.payload, ...state.data];
      }
    },
  },
  extraReducers(builder) {
    builder
      // Get Other Notes
      .addCase(fetchGetNotesOther.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchGetNotesOther.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data || [];
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchGetNotesOther.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.errors?.message);
      });
  },
});

export default notesOtherSlice;
