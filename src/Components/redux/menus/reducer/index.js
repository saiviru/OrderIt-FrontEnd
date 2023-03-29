import * as ACTIONTYPES from '../ActionTypes';

const INITIAL_STATE = {
	loading: false,
	user:{},
	userSession:{}
};

export default function loginDetails(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ACTIONTYPES.SET_LOADING:
			return {
				...state,
				loading: true,
			};
		case ACTIONTYPES.LOGGED_SESSION:
			return {
				...state,
				userSession: action.payload,
				loading: false,
			};
		case ACTIONTYPES.LOGGED_USER:
			return{
				...state,
				user:action.payload
			}
		default:
			return state;
	}
}
