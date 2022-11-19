import { createSlice } from '@reduxjs/toolkit';
import { CitizenType } from '../api/workers-api';

const IS: CitizenType[] = [
  {
    id: 1,
    age: 2,
    city: 'moscow',
    name: 'vasya',
    someNote: 'tratata',
  },
  {
    id: 2,
    age: 2,
    city: 'moscow',
    name: 'vasya',
    someNote: 'tratata',
  },
  {
    id: 3,
    age: 2,
    city: 'moscow',
    name: 'vasya',
    someNote: 'tratata',
  },
  {
    id: 4,
    age: 2,
    city: 'moscow',
    name: 'vasya',
    someNote: 'tratata',
  },
  {
    id: 5,
    age: 2,
    city: 'moscow',
    name: 'vasya',
    someNote: 'tratata',
  },
];

const slice = createSlice({
  name: 'citizens',
  initialState: IS,
  reducers: {},
});

export const citizensReducer = slice.reducer;
export const {} = slice.actions;
