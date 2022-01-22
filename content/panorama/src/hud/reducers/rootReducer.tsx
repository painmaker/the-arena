import { combineReducers } from "redux";
import itemOptionsReducer from './itemOptionsReducer';
import heroSelectionReducer from './heroSelectionReducer';

export const rootReducer = combineReducers({
  itemOptionsReducer,
  heroSelectionReducer,
});

export type RootState = ReturnType<typeof rootReducer>
