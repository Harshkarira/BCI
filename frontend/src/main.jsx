import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bciReducer from './features/bciSlice';

const store = configureStore({
  reducer: {
    bci: bciReducer,
    // ... (other reducers, if any)
  },
  // ... (additional configuration)
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
