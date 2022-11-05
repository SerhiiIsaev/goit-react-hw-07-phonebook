import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getData, addData, removeData
} from 'API/API';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const contacts = await getData();
      return contacts;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (data, thunkAPI) => {
    try {
      const result = await addData(data);
      return result;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (id, thunkAPI) => {
    try {
      const result = await removeData(id);
      return result;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);