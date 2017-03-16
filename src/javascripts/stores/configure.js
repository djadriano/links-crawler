// ------------------------------------------------------
// Redux Imports
// ------------------------------------------------------

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

// ------------------------------------------------------
// Reducers Imports
// ------------------------------------------------------

import reducers from 'javascripts/reducers/index';

// ------------------------------------------------------
// Create Redux Logger Middleware to show
// the actions on Console of Developer Tools
// ------------------------------------------------------

const loggerMiddleware = createLogger();

// ------------------------------------------------------
// Export Store Configuration
// ------------------------------------------------------

export default function configureStore(history, initialState) {
  console.log(process.env.NODE_ENV);
  if( !process.env.NODE_ENV ) {
    return createStore(
      reducers,
      initialState,
      compose(
        applyMiddleware(
          thunkMiddleware,
          loggerMiddleware
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    )
  } else {
    return createStore(
      reducers,
      initialState,
      applyMiddleware(
        thunkMiddleware
      )
    )
  }
}
