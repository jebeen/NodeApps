import React from 'react';
import ReactDOM from 'react-dom/client';
import MyApp from './components/MyApp';
import MyAppContext from './contexts/MyAppContext';
import Header from './components/Header';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers/movieReducer';

const store={movies: [], loading: false, movie:[]};

const moviestore=createStore(reducer, store, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={moviestore}>
  <MyAppContext>
  <Header />
  <MyApp />
  </MyAppContext>
  </Provider>
)
