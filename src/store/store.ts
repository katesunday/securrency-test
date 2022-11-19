import { AnyAction, combineReducers, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import { citizensReducer } from '../reducers/CitizensReducer';

const rootReducer = combineReducers({
  citizens: citizensReducer,
});
export type AppRootStateType = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

type DispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

export const useAppDispatch = () => useDispatch<DispatchType>();

//@ts-ignore
window.store = store;
