import * as ACTIONTYPES from "../ActionTypes";

const INITIAL_STATE = {
  userDetails: [],
  urlDecode: [],
  unmaskedData: {},
};

export default function userDetails(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONTYPES.USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case ACTIONTYPES.GET_URL_DATA:
      return {
        ...state,
        urlDecode: action.payload,
      };
    case ACTIONTYPES.UNMASKED_URL_DATA:
      return {
        ...state,
        unmaskedData: action.payload,
      };
    default:
      return state;
  }
}

export const getInitial = (state) => state.initial;
