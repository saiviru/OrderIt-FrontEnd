import * as ActionTypes from '../ActionTypes';

export const getUserSession = (userSession) => {
    return {
        type: ActionTypes.LOGGED_SESSION,
        payload:userSession
    }
}