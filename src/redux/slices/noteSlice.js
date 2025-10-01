import { createSlice } from '@reduxjs/toolkit';
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from '../actions/noteActions';

const initialState = {
  notes: [],
  pending: false,
  error: null,
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder

      // NOT SİLME İŞLEMİNİN ASEKRON SONUÇLARI
      // a) bekleniyor
      .addCase(createNote.pending, (state, action) => {
        state.pending = true;
        state.error = null;
      })
      // b) başarısız
      .addCase(createNote.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
      // c) başarılı
      .addCase(createNote.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.notes.push(action.payload.note);
      })

      // BÜTÜN NOTLARIN GETİREN ASEKRON FONKSİYON SONUÇLARI

      // a) bekleniyor
      .addCase(getAllNotes.pending, (state, action) => {
        state.pending = true;
        state.error = null;
      })
      // b) başarısız
      .addCase(getAllNotes.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
      // c) başarılı
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.notes = action.payload;
      })

      // NOTE SİLME ASEKRON İŞLEMİNİN SONUÇLARI
      .addCase(deleteNote.pending, (state, action) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.notes = action.payload.payload;
      })

      // NOTE GÜNCELLEME ASEKSON İŞLEMİNİN SONUÇLARI
      .addCase(updateNote.pending, (state, action) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.notes = action.payload;
      });
  },
});

export default noteSlice.reducer;
