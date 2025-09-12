import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserFromDb,
  insertUserIfNotExists,
  loginFromDb,
} from '../../utils/db';

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (values, { rejectWithValue }) => {
    try {
      const response = await insertUserIfNotExists(values);

      const response2 = await getUserFromDb(response.userId);

      const user = response2.user;

      return { response, user };
      //
      //
    } catch (error) {
      console.error('THUNK HATASI:', error);
      return rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginFromDb(email, password);

      console.log('Login isteği başarılı:', response);
      return response;
    } catch (err) {
      console.error('Login isteği başarısız:', err);
      return rejectWithValue(err);
    }
  },
);
