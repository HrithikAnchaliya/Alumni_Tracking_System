import { createStore } from 'redux'
// import { combineReducers } from 'redux';
import authstate from '../reducers/reducers'
// import registerstate from '../reducers/registerreducer'


// const Reducers = combineReducers({
//     authstate : authstate,
//     registerstate : registerstate
// })

const store = createStore(authstate, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;