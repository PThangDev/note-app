import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import noteAPI from 'src/api/noteAPI';
import { BaseDataResponse, ErrorResponse, Pagination, QueryParams } from 'src/types';
import { CreateNote, Note, NotesOfTopicRequest, UpdateNote } from 'src/types/Note';
import sweetAlert from 'src/utils/sweetAlert';
import { updateNote } from '../note_detail/noteDetailSlice';
import notesPinnedSlice from '../pins/notesPinnedSlice';

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

export const fetchGetNotes = createAsyncThunk<
  BaseDataResponse<Note[]>,
  undefined | QueryParams,
  { rejectValue: ErrorResponse }
>('/notes', async (payload, thunkAPI) => {
  try {
    const response = await noteAPI.getNotes(payload);
    // Map time
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});
export const fetchGetNotesOfTopic = createAsyncThunk<
  BaseDataResponse<Note[]>,
  NotesOfTopicRequest,
  { rejectValue: ErrorResponse }
>('/notes/topic/:topicId', async (payload, thunkAPI) => {
  try {
    const response = await noteAPI.getNotesOfTopic(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});
export const fetchCreateNote = createAsyncThunk<
  BaseDataResponse<Note>,
  CreateNote,
  { rejectValue: ErrorResponse }
>('/create/note', async (payload, thunkAPI) => {
  try {
    const response = await noteAPI.createNote(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

export const fetchUpdateNote = createAsyncThunk<
  BaseDataResponse<Note>,
  UpdateNote,
  { rejectValue: ErrorResponse }
>('/update/notes/:id', async (payload, thunkAPI) => {
  try {
    const response = await noteAPI.updateNotes(payload);
    if (response.data) {
      thunkAPI.dispatch(updateNote(response.data));
    }
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});
export const fetchUpdateNoteToTrash = createAsyncThunk<
  BaseDataResponse<Note>,
  UpdateNote,
  { rejectValue: ErrorResponse }
>('/update/notes/trash/:id', async (payload, thunkAPI) => {
  try {
    const response = await noteAPI.updateNotes(payload);

    if (response.data) {
      thunkAPI.dispatch(notesPinnedSlice.actions.removeNoteToTrash(response.data));
    }
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

export const fetchDeleteNote = createAsyncThunk<
  BaseDataResponse<Note>,
  string,
  { rejectValue: ErrorResponse }
>('/delete/notes/:id', async (payload, thunkAPI) => {
  try {
    const response = await noteAPI.deleteNote(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});
const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    togglePin(state, action: PayloadAction<Note>) {
      state.data = state.data.map((note) => {
        if (note._id === action.payload._id) {
          return action.payload;
        } else {
          return note;
        }
      });
    },
  },
  extraReducers(builder) {
    builder
      // Get Notes
      .addCase(fetchGetNotes.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchGetNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data || [];
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchGetNotes.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.errors?.message);
      })
      // Get Notes of topic
      .addCase(fetchGetNotesOfTopic.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchGetNotesOfTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data || [];
      })
      .addCase(fetchGetNotesOfTopic.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.errors?.message);
      })

      // Create Note
      .addCase(fetchCreateNote.pending, (state, action) => {
        sweetAlert.loading();
      })
      .addCase(fetchCreateNote.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.data = [action.payload.data, ...state.data];
        }
        // Sweet alert
        sweetAlert.success(action.payload.message);
      })
      .addCase(fetchCreateNote.rejected, (state, action) => {
        sweetAlert.error(action.payload?.errors?.message);
      })
      // Update note
      .addCase(fetchUpdateNote.pending, (state, action) => {
        // sweetAlert.loading();
      })
      .addCase(fetchUpdateNote.fulfilled, (state, action) => {
        state.data = state.data.map((item) => {
          if (item._id === action.payload.data?._id) {
            return action.payload.data;
          } else {
            return item;
          }
        });
        // sweetAlert.success(action.payload.message);
      })
      .addCase(fetchUpdateNote.rejected, (state, action) => {
        sweetAlert.error(action.payload?.errors?.message);
      })
      // Move note to trash
      .addCase(fetchUpdateNoteToTrash.pending, (state, action) => {
        sweetAlert.loading();
      })
      .addCase(fetchUpdateNoteToTrash.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.data = state.data.filter((note) => note._id !== action.payload.data?._id);
        }
      })
      .addCase(fetchUpdateNoteToTrash.rejected, (state, action) => {
        sweetAlert.error(action.payload?.errors?.message);
      })
      // Pin note

      // Delete Note
      .addCase(fetchDeleteNote.pending, (state, action) => {
        sweetAlert.loading();
      })
      .addCase(fetchDeleteNote.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.data = state.data.filter((note) => note._id !== action.payload.data?._id);
        }
        sweetAlert.success(action.payload.message);
      })
      .addCase(fetchDeleteNote.rejected, (state, action) => {
        sweetAlert.error(action.payload?.errors?.message);
      });
  },
});
export default noteSlice;
