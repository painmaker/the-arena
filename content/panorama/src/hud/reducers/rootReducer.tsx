import { combineReducers } from "redux";
import minimapReducer from './minimapReducer';
import settingsReducer from './settingsReducer';
import characterPanelReducer from './characterPanelReducer';
import inventoryReducer from './inventoryReducer';

export const rootReducer = combineReducers({
  minimapReducer,
  settingsReducer,
  characterPanelReducer,
  inventoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>
