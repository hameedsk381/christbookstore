import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers/rootReducer';
import { thunk } from 'redux-thunk';

// Load the persisted state from localStorage
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

// Create the store with rootReducer, persisted state, and middleware
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk)  // Apply thunk middleware here
);

// Subscribe to store updates to save the state to localStorage
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
