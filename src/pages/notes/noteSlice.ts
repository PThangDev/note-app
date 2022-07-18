import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import noteAPI from 'src/api/noteAPI';
import { BaseDataResponse, ErrorResponse, QueryParams } from 'src/types';
import { CreateNote, Note, NotesOfTopicRequest, UpdateNote } from 'src/types/Note';
import { formatDate } from 'src/utils';
import { updateNote } from '../note_detail/noteDetailSlice';

interface InitialState {
  isLoading: boolean;
  data: Note[];
}

const initialState: InitialState = {
  isLoading: false,
  data: [],
};

export const fetchGetNotes = createAsyncThunk<
  BaseDataResponse<Note[]>,
  undefined | QueryParams,
  { rejectValue: ErrorResponse }
>('/notes', async (payload, thunkAPI) => {
  try {
    const { data, message } = await noteAPI.getNotes(payload);
    // Map time
    const responseMapDate = data?.map((note) => ({
      ...note,
      createdAt: formatDate(note.createdAt),
      updatedAt: formatDate(note.updatedAt),
    }));
    return { data: responseMapDate, message };
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
    const { data, message } = await noteAPI.getNotesOfTopic(payload);
    // Map time
    const responseMapDate = data?.map((note) => ({
      ...note,
      createdAt: formatDate(note.createdAt),
      updatedAt: formatDate(note.updatedAt),
    }));
    return { data: responseMapDate, message };
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
>('/update/notes/:slug', async (payload, thunkAPI) => {
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

export const fetchDeleteNote = createAsyncThunk<
  BaseDataResponse<Note>,
  string,
  { rejectValue: ErrorResponse }
>('/delete/notes/:slug', async (payload, thunkAPI) => {
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
  reducers: {},
  extraReducers(builder) {
    builder
      // Get Notes
      .addCase(fetchGetNotes.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchGetNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data || [];
      })
      .addCase(fetchGetNotes.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.errors.message);
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
        toast.error(action.payload?.errors.message);
      })

      // Create Note
      .addCase(fetchCreateNote.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCreateNote.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data) {
          let newNote = action.payload.data;
          newNote = {
            ...newNote,
            createdAt: formatDate(newNote.createdAt),
            updatedAt: formatDate(newNote.updatedAt),
          };
          state.data = [newNote, ...state.data];
        }
      })
      .addCase(fetchCreateNote.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.errors.message);
      })
      // Update note
      .addCase(fetchUpdateNote.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUpdateNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((item) => {
          if (item._id === action.payload.data?._id) {
            return {
              ...action.payload.data,
              createdAt: formatDate(action.payload.data.createdAt),
              updatedAt: formatDate(action.payload.data.updatedAt),
            };
          } else {
            return item;
          }
        });
      })
      .addCase(fetchUpdateNote.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.errors.message);
      })
      // Delete Note
      .addCase(fetchDeleteNote.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchDeleteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data) {
          state.data = state.data.filter((note) => note._id !== action.payload.data?._id);
        }
      })
      .addCase(fetchDeleteNote.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.errors.message);
      });
  },
});
export default noteSlice;
