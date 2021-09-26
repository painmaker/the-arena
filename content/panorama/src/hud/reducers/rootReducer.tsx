import { combineReducers } from "redux";
import minimapReducer from './minimapReducer';
import settingsReducer from './settingsReducer';
import characterReducer from './characterReducer';
import shopReducer from './shopReducer';
import itemOptionsReducer from './itemOptionsReducer';
import heroSelectionReducer from './heroSelectionReducer';
import abilitiesShopReducer from './abilitiesShopReducer';
import selectedUnitReducer from './selectedUnitReducer';

export const rootReducer = combineReducers({
  minimapReducer,
  settingsReducer,
  characterReducer,
  shopReducer,
  itemOptionsReducer,
  heroSelectionReducer,
  abilitiesShopReducer,
  selectedUnitReducer
});

export type RootState = ReturnType<typeof rootReducer>
