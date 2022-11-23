import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CitizenType, workersAPI } from '../api/workers-api'
import {FormikValues} from "formik";
import {FormikValuesType} from "../components/AddCitizen";

type initialStateType = {
  data: CitizenType[]
}
const initialState: initialStateType = {
  data: [],
}
export const fetchCitizens = createAsyncThunk(
  'data/fetchCitizens',
  async (param, { dispatch, rejectWithValue }) => {
    try {
      return await workersAPI.loadCitizens()
    } catch (e) {
      rejectWithValue(e)
    }
  }
)

export const fetchCitizenNote = createAsyncThunk(
  'data/fetchCitizenNote',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const res = await workersAPI.getNoteById(id)
      return { res, id }
    } catch (e) {
      rejectWithValue(e)
    }
  }
)

export const addNewCitizen = createAsyncThunk(
    'data/addNewCitizen',
    async (values:FormikValuesType,{dispatch,rejectWithValue})=>{
        try {
            const res = await workersAPI.addCitizen(+values.age,values.city,values.name,values.someNote)
            dispatch(fetchCitizens())
            return res
        }catch (e) {
            rejectWithValue(e)
        }
    }
)

const slice = createSlice({
  name: 'citizens',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase<any, PayloadAction<CitizenType[]>>(
      fetchCitizens.fulfilled,
      (state, { payload }) => {
        state.data = payload.map(el => ({ ...el, someNote: null }))
      }
    )
    builder.addCase<any, PayloadAction<{ res: string; id: string }>>(
      fetchCitizenNote.fulfilled,
      (state, { payload }) => {
        const index = state.data.findIndex(el => el.id === payload.id)
        state.data[index].someNote = payload.res
      }
    )
  },
})

export const citizensReducer = slice.reducer
export const {} = slice.actions
