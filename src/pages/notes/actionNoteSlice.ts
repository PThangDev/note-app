import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import noteAPI from 'src/api/noteAPI';
import { BaseDataResponse, ErrorResponse } from 'src/types';
import { CreateNote, Note } from 'src/types/Note';

interface InitialStateProps {
  isLoading: boolean;
  data: Note | null;
}

const initialState: InitialStateProps = {
  isLoading: false,
  data: null,
};
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
const actionNoteSlice = createSlice({
  name: 'action-note',
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
export default actionNoteSlice;
