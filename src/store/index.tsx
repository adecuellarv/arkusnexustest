import { createStore, applyMiddleware, compose  } from "redux";
import rootReducer from "../reducers/index";
import thunk from 'redux-thunk';

// Configure store with reducers and create
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk),
    ),
);

export default store;
