import { Provider, connect } from 'preact-redux';
import { h, render } from 'preact';

import { App } from "./app";
import { store } from './store';

const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

setTimeout(()=> {
  render(<Main />, document.getElementById("app"));
});