import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { insertUserIfNotExists } from '../../utils/db';

const initialState = {
  isLogin: false,
  user: {},
  pendingLogin: false,
  pendingRegister: false,
  pendingUpdate: false,
  error: null,
};

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (values, { rejectWithValue }) => {
    try {
      const response = await insertUserIfNotExists(values);

      console.log('THUNK ÇALIŞTI:', response);

      return response;
    } catch (error) {
      console.error('THUNK HATASI:', error);
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.pendingRegister = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.pendingRegister = false;
        state.error = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        (state.pendingRegister = false),
          (state.user = action.payload),
          (state.error = null),
          (state.isLogin = true);
      });
  },
});

export default authSlice.reducer;
