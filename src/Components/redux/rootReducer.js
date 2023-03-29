import { combineReducers } from 'redux';
import loginDetails from './menus/reducer/index';

const rootReducer = combineReducers({
    userDetails: loginDetails,
});

export default rootReducer;