import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import noteAPI from 'src/api/noteAPI';
import { BaseDataResponse, ErrorResponse, QueryParams } from 'src/types';
import { Note, UpdateNote } from 'src/types/Note';
import { formatDate } from 'src/utils';
import noteSlice from '../notes/noteSlice';

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
    const response = await noteAPI.getNotesOfPins(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

export const fetchTogglePinNote = createAsyncThunk<
  BaseDataResponse<Note>,
  UpdateNote,
  { rejectValue: ErrorResponse }
>('/note/pins/:id#toggle', async (payload, thunkAPI) => {
  try {
    const response = await noteAPI.updateNotes(payload);
    if (response.data) {
      thunkAPI.dispatch(noteSlice.actions.togglePin(response.data));
    }
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

const notesPinnedSlice = createSlice({
  name: 'notesPinned',
  initialState,
  reducers: {
    updateNotePinned(state, action: PayloadAction<Note>) {
      state.data = state.data.map((note) => {
        if (note._id === action.payload._id) {
          return action.payload;
        } else {
          return note;
        }
      });
    },
    removeNoteToTrash(state, action: PayloadAction<Note>) {
      state.data = state.data.filter((note) => note._id !== action.payload._id);
    },
  },
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
      })
      .addCase(fetchTogglePinNote.fulfilled, (state, action) => {
        console.log(action.payload);
        if (!action.payload.data?.is_pin) {
          state.data = state.data.filter((note) => note._id !== action.payload.data?._id);
          toast.info('Unpin note successfully!');
        } else if (action.payload.data?.is_pin) {
          state.data = [action.payload.data, ...state.data];
          toast.success('Pin note successfully!');
        }
      })
      .addCase(fetchTogglePinNote.rejected, (state, action) => {
        toast.error('Unpin note successfully!');
      });
  },
});
export default notesPinnedSlice;
