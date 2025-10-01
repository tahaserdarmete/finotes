import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteNoteFromDb,
  getAllNotesFromDb,
  insertNoteDb,
  updateNoteFromDb,
} from '../../utils/db';

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

      console.log('get all notes sonucu:', result);

      return result;
    } catch (err) {
      rejectWithValue(err);
    }
  },
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async ({ id }, { rejectWithValue, dispatch, getState }) => {
    try {
      // Thunk için içinde diğer thunkları çağırmamız için dispatch i kullanıyoruz

      // get state ile reduxta tutulan bütün değişkenlere thunktan erişebilmemizi sağlar

      // 1) Not Silme Kısmı
      await deleteNoteFromDb(id);

      // 2) Notu silindikten sonra database'deki bütün notları tekrardan çek

      // a) şuanki kullanıcının id sine eriş
      const userId = getState().auth.user.id;

      // b) bu kullanıcının notlarını alan thunk'ı çağır
      const response2 = await dispatch(getAllNotes({ userId }));

      console.log('silme thunkın içinde çalışan 2.thunkın cevabı:', response2);

      return response2;
    } catch (err) {
      console.error(err);
      rejectWithValue(err);
    }
  },
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ noteId, title, description }, { getState }) => {
    try {
      const userId = getState().auth.user.id;

      const response = await updateNoteFromDb({
        noteId,
        title,
        description,
        userId,
      });

      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
);
