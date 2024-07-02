// rootReducer.js

import cartReducer from './cartReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';
import orderReducer from './orderReducer';
import registerReducer from './registerReducer';
import { songsReducer } from './songReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    order:orderReducer,
    register:registerReducer,
    songsData: songsReducer
});

export default rootReducer;
