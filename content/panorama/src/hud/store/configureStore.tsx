import { createStore } from 'redux'

import { rootReducer } from '../reducers/rootReducer'

export default function configureStore() {
  const store = createStore(rootReducer, undefined, undefined)
  return store
}
