import { combineReducers } from "redux";
import minimapReducer from './minimapReducer';
import settingsReducer from './settingsReducer';
import characterPanelReducer from './characterPanelReducer';
import itemOptionsReducer from './itemOptionsReducer';
import inventoryReducer from './inventoryReducer';

export const rootReducer = combineReducers({
  minimapReducer,
  settingsReducer,
  characterPanelReducer,
  itemOptionsReducer,
  inventoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>
