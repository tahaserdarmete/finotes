import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { insertNoteDb } from '../../utils/db';

const initialState = {
  notes: [],
  pending: false,
  error: null,
};

export const createNote = createAsyncThunk(
  'notes/createNote',
  async ({ userId, title, description }, { rejectWithValue }) => {
    try {
      const result = await insertNoteDb({ userId, title, description });

      return result;
      //
      //
    } catch (err) {
      console.error(err);
      rejectWithValue(err.message);
    }
  },
);

export const getAllNotes = createAsyncThunk(
  'notes/getAllNotes',
  async () => {},
);

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(createNote.pending, (state, action) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.pending = false;
        (state.error = null), state.notes.push(action.payload.noteId);
      });
  },
});

export default noteSlice.reducer;
