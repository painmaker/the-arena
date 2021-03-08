import { combineReducers } from "redux";
import minimapReducer from './minimapReducer';
import settingsReducer from './settingsReducer';
import characterReducer from './characterReducer';
import shopReducer from './shopReducer';
import itemOptionsReducer from './itemOptionsReducer';
import heroSelectionReducer from './heroSelectionReducer';

export const rootReducer = combineReducers({
  minimapReducer,
  settingsReducer,
  characterReducer,
  shopReducer,
  itemOptionsReducer,
  heroSelectionReducer,
});

export type RootState = ReturnType<typeof rootReducer>
