import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CitizenType, workersAPI } from '../api/workers-api'
import { FormikValuesType } from '../components/AddCitizen'

type StatusType = 'loading' | 'failed' | 'success' | 'initial'
type initialStateType = {
  data: CitizenType[]
  status: StatusType
  error: string | null
}
const initialState: initialStateType = {
  data: [],
  status: 'initial',
  error: null,
}
export const fetchCitizens = createAsyncThunk(
  'data/fetchCitizens',
  async (param, { dispatch, rejectWithValue }) => {
    dispatch(setStatus('loading'))
    try {
      const res = await workersAPI.loadCitizens()
      dispatch(setStatus('success'))
      return res
    } catch (e) {
      dispatch(setStatus('failed'))
      rejectWithValue(e)

      dispatch(setAppError('Something went wrong'))
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
      dispatch(setStatus('failed'))
      rejectWithValue(e)
      dispatch(setAppError('Something went wrong'))
    }
  }
)

export const addNewCitizen = createAsyncThunk(
  'data/addNewCitizen',
  async (values: FormikValuesType, { dispatch, rejectWithValue }) => {
    try {
      const res = await workersAPI.addCitizen(
        +values.age,
        values.city,
        values.name,
        values.someNote
      )
      if (res === undefined) {
        dispatch(setAppError('Something went wrong'))
      }
      dispatch(fetchCitizens())
      return res
    } catch (e) {
      rejectWithValue(e)
      dispatch(setAppError('Something went wrong'))
    }
  }
)

const slice = createSlice({
  name: 'citizens',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<StatusType>) {
      state.status = action.payload
    },
    setAppError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
  },
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
export const { setStatus, setAppError } = slice.actions
