import { createStore } from 'redux'
import authstate from '../reducers/reducers'

const store = createStore(authstate, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;