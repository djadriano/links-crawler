import React from 'react';
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import configureStore from 'javascripts/stores/configure';

import Home from 'javascripts/pages/home';

import AppStyle from 'stylesheets/app';

import App from 'javascripts/layouts/layout';

const app     = document.getElementById('gg');
const store   = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
        </Route>
      </Router>
    </Provider>
  </AppContainer>,
  app
);