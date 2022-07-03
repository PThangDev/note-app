import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import noteAPI from 'src/api/noteAPI';
import { BaseDataResponse, ErrorResponse, QueryParams } from 'src/types';
import moment from 'moment';
import { Note } from 'src/types/Note';

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
      content: `${note.content} 
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste non rem cupiditate doloremque sed.
      Consequuntur blanditiis quos impedit voluptatum, ea sint minima dolorem molestiae perspiciatis ducimus,
      sequi repellendus dicta iste.
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste non rem cupiditate doloremque sed.
      Consequuntur blanditiis quos impedit voluptatum, ea sint minima dolorem molestiae perspiciatis ducimus,
      sequi repellendus dicta iste.
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste non rem cupiditate doloremque sed.
      Consequuntur blanditiis quos impedit voluptatum, ea sint minima dolorem molestiae perspiciatis ducimus,
      sequi repellendus dicta iste.
      `,
      createdAt: moment(note.createdAt).format('DD-MM-YYYY hh:mm'),
      updatedAt: moment(note.updatedAt).format('DD-MM-YYYY hh:mm'),
    }));
    return { data: responseMapDate, message };
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
      });
  },
});
export default noteSlice;
