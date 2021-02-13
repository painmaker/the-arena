import { combineReducers } from "redux";
import minimapReducer from './minimapReducer';
import settingsReducer from './settingsReducer';
import characterPanelReducer from './characterPanelReducer';

export const rootReducer = combineReducers({
  minimapReducer,
  settingsReducer,
  characterPanelReducer
});

export type RootState = ReturnType<typeof rootReducer>
