// root reducer is the base reducer that combines all the states together

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// this storage = local storage of the window object of the browser, telling redux to use local storage as the default storage
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);