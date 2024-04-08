import React from 'react';//api
import { createRoot } from 'react-dom/client';//渲染页面的
import './style/base.less'
import App from './App'
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>
);