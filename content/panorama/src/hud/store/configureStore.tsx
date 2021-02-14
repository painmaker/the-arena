import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from '../reducers/rootReducer'
import { rootSaga } from '../sagas/rootSaga';

export default function configureStore() {

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(rootSaga)

  return store

}
