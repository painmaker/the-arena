import { combineReducers } from "redux";
import minimapReducer from './minimapReducer'; 
import settingsReducer from './settingsReducer'; 

export const rootReducer = combineReducers({
  minimapReducer,
  settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>
