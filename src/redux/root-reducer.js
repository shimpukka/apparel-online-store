// root reducer is the base reducer that combines all the states together

import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';

export default combineReducers({
    user: userReducer,
})