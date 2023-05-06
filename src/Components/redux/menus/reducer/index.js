import { menuItemClasses } from "@mui/material";
import * as ACTIONTYPES from "../ActionTypes";

const INITIAL_STATE = {
    menuItems: [],
    cartItems: [],
    dirtyItems: [],
    finalCart:[]
};

export default function menuDetails(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONTYPES.SET_MENU_ITEMS:
      return {
        ...state,
        menuItems: state.menuItems.concat(action.payload),
      };
      case ACTIONTYPES.UPDATE_QUANTITY:
        const { id, quantity } = action.payload;
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
        if (itemIndex === -1) {
            dirtyItems.push({ id, quantity: newQuantity });
        }
        else {
            dirtyItems[itemIndex].quantity = newQuantity;
        }
        const finalCart = dirtyItems.filter(item => item.quantity !== 0);
        console.log("the final cart:",finalCart)
        return {
          ...state,
          menuItems,
          dirtyItems,
          finalCart,
        };
    default:
      return state;
  }
}

export const getInitial = (state) => state.initial;
