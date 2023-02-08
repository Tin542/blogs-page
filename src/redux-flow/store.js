import { createStore } from "redux";
import rootReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnchanters = composeWithDevTools();
const store = createStore(rootReducer, composeEnchanters);

export default store;