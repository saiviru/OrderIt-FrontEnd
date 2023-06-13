import { combineReducers } from 'redux';
import menuDetails from './menus/reducer/index';
import userDetails from './user/reducer';

const rootReducer = combineReducers({
    menu: menuDetails,
    user:userDetails
});

export default rootReducer;