

function* resetHeroSelectionCamera() {
  // yield delay(1500);
  // yield put({ type: RESET_HERO_SELECTION_CAMERA_SUCCESS });
}

function* heroSelectionSaga() {
  // // @ts-ignore
  // while (yield take(RESET_HERO_SELECTION_CAMERA)) {
  //   // @ts-ignore
  //   const reset = yield fork(resetHeroSelectionCamera)
  //   yield take(SET_HERO_SELECTION_CAMERA)
  //   yield cancel(reset)
  // }
}

export default heroSelectionSaga;