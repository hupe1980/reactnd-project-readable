import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

// eslint-disable-next-line import/extensions
import 'typeface-roboto';

import App from './app';
import configureStore from './configureStore';

const store = configureStore();

// Inject the insertion-point-jss at the beginning.
// eslint-disable-next-line no-underscore-dangle
if (!global.__INSERTION_POINT__) {
  // eslint-disable-next-line no-underscore-dangle
  global.__INSERTION_POINT__ = true;
  const styleNode = document.createComment('insertion-point-jss');

  if (document.head) {
    document.head.insertBefore(styleNode, document.head.firstChild);
  }
}

const generateClassName = createGenerateClassName();
const jss = create(preset());
jss.options.insertionPoint = 'insertion-point-jss';

render(
  <Provider store={store}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </JssProvider>
  </Provider>,
  document.getElementById('root'),
);
