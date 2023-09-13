import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import authReducer from "./state";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH,                        //    Ignore warnings for using persist
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER]
    }
  }) 
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading = {null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
    
  </React.StrictMode>,
)
