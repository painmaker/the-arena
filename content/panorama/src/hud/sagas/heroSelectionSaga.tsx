import { put, takeLatest } from "redux-saga/effects";
import { RESET_FOCUSED_HERO, SetFocusedHero, SetRandomHeroDialogVisible, SET_FOCUS_HERO, SET_RANDOM_HERO_DIALOG_VISIBLE } from "../types/heroSelectionTypes";


function* randomHeroDialogVisible({ payload }: SetRandomHeroDialogVisible) {
  if (payload.visible === true) {
    yield put({ type: RESET_FOCUSED_HERO });
  }
}

function* focusHero({ payload }: SetFocusedHero) {
  yield put({ type: SET_RANDOM_HERO_DIALOG_VISIBLE, payload: { visible: false } });
}

function* heroSelectionSaga() {
  yield takeLatest(SET_RANDOM_HERO_DIALOG_VISIBLE, randomHeroDialogVisible);
  yield takeLatest(SET_FOCUS_HERO, focusHero);
}

export default heroSelectionSaga;