import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllNotesFromDb, insertNoteDb } from '../../utils/db';

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
  async ({ userId }, { rejectWithValue }) => {
    try {
      const result = await getAllNotesFromDb({ userId });

      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  },
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
      })
      .addCase(getAllNotes.pending, (state, action) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.notes = action.payload;
      });
  },
});

export default noteSlice.reducer;
