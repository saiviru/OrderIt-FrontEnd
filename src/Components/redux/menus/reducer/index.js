import { menuItemClasses } from "@mui/material";
import * as ACTIONTYPES from "../ActionTypes";

const INITIAL_STATE = {
    menuItems: [],
    search:'',
    cartItems: [],
    dirtyItems: [],
    finalCart:[],
    userOrders:[]
};

export default function menuDetails(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONTYPES.SET_MENU_ITEMS:
      return {
        ...state,
        menuItems: action.payload,
      };
      case ACTIONTYPES.SET_SEARCH:
        return{
          ...state,
          search:action.payload
        }
      case ACTIONTYPES.USER_ORDERS:
        return{
          ...state,
          userOrders:payload
        }
      case ACTIONTYPES.UPDATE_QUANTITY:
        const { id, quantity, price, name } = action.payload;
        const newQuantity = quantity >= 0 ? quantity : 0; // quantity should never be negative
        const menuItems = state.menuItems.map(item => {
          if (item._id === id) {
            return {
              ...item,
              quantity: newQuantity,
            };
          }
          return item;
        });
        const dirtyItems = [...state.dirtyItems]; // create a copy of dirtyItems array
        const itemIndex = dirtyItems.findIndex(item => item.id === id);
        if (newQuantity === 0) {
          // Remove item from dirtyItems array if quantity is 0
          if (itemIndex !== -1) {
            dirtyItems.splice(itemIndex, 1);
          }
        } else {
          if (itemIndex === -1) {
            dirtyItems.push({ id, price, name, quantity: newQuantity });
          } else {
            dirtyItems[itemIndex].quantity = newQuantity;
          }
        }
        const finalCart = dirtyItems.filter(item => item.quantity !== 0);
        return {
          ...state,
          menuItems,
          dirtyItems,
          finalCart,
        };
        case ACTIONTYPES.CLEAR_MENU_ITEMS: {
          return {
            ...state,
            menuItems: [],
            dirtyItems: []
          };
        }
    default:
      return state;
  }
}

export const getInitial = (state) => state.initial;
