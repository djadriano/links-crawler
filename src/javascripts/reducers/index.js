// -----------------------------------------------------
// Redux Imports
// -----------------------------------------------------

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

// -----------------------------------------------------
// Load Reducers
// -----------------------------------------------------

import appReducer from 'javascripts/reducers/app';

// -----------------------------------------------------
// Share reducers to application
// -----------------------------------------------------

const reducers = combineReducers({
  app: appReducer,
  routing: routerReducer
});

export default reducers;
