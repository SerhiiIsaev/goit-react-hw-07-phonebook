// import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';

// export const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: [],
//   reducers: {
//     removeContact(state, action) {
//       return state.filter(item => item.id !== action.payload);
//     },
//     addContact(state, action) {
//       state.push({ id: nanoid(), ...action.payload });
//     },
//   },
// });

// export const { addContact, removeContact } = contactsSlice.actions;

// export const getContacts = state => state.contacts;

import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, removeContact } from './AsyncRedux';
import { toast } from 'react-toastify';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    addingLoader: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, { payload }) {
      state.isLoading = false;
      state.error = null;
      state.items = payload;
    },
    [fetchContacts.rejected](state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    [addContact.pending](state) {
      state.addingLoader = true;
    },
    [addContact.fulfilled](state, { payload }) {
      state.addingLoader = false;
      state.error = null;
      state.items.push(payload);
      toast.success('CONTACT ADDED');
    },
    [addContact.rejected](state, { payload }) {
      state.addingLoader = false;
      state.error = payload;
    },
    // [removeContact.pending](state) {
    //   state.deletingLoader = true;
    // },
    [removeContact.fulfilled](state, { payload }) {
      state.error = null;
      state.items = state.items.filter(item => item.id !== payload);
      toast.info('CONTACT DELETED');
    },
    [removeContact.rejected](state, { payload }) {
      state.error = payload;
    },
  },
});

// Selector
export const getContacts = state => state.contacts;