import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tableReducer from './tableReducer';


const rootReducer = combineReducers({table: tableReducer});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >