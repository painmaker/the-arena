import { combineReducers } from "redux";
import minimapReducer from './minimapReducer';
import settingsReducer from './settingsReducer';
import characterPanelReducer from './characterPanelReducer';
import itemOptionsReducer from './itemOptionsReducer';

export const rootReducer = combineReducers({
  minimapReducer,
  settingsReducer,
  characterPanelReducer,
  itemOptionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>
