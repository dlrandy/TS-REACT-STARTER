import 'core-js/stable';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '@Store/index';
import IndexApp from './app';

declare let module: any;
declare let window: any;
declare let document: any;

const store = configureStore();
function render() {
  ReactDOM.render(
    <Provider store={store}>
      <IndexApp />
    </Provider>,
    document.getElementById('root') as HTMLElement,
  );
}

if (process.env.NODE_ENV === 'development') {
  render();
  if (module.hot) {
    module.hot.accept('./app', () => {
      // eslint-disable-next-line global-require
      const NewApp = require('./app').default;
      ReactDOM.render(
        <Provider store={store}>
          <NewApp />
        </Provider>, document.getElementById('root'),
      );
    });
  }
}

if (process.env.NODE_ENV === 'production') {
  render();
}
