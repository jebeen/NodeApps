import React from 'react';
import ReactDOM from 'react-dom/client';
import EnhancedComponent from './App';
import reducer from './reducers/index'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
const myStore={services: [], loading: false};
const store=createStore(reducer, myStore, applyMiddleware(thunk))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <EnhancedComponent />
  </Provider>
  </React.StrictMode>
);
