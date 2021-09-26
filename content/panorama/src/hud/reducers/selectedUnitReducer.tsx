import { SET_SELECTED_UNIT, SelectedUnitActionTypes } from "../types/selectedUnitTypes";

const initialState = {
  selectedUnit: Players.GetPlayerHeroEntityIndex(Players.GetLocalPlayer()),
};

export default function (state = initialState, action: SelectedUnitActionTypes) {
  const { payload, type } = action;
  switch (type) {
    case SET_SELECTED_UNIT: {
      return {
        ...state,
        selectedUnit: payload.selectedUnit
      };
    }
    default:
      return state;
  }
}
