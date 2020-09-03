/* 
    Reselect library. $ npm install reselect
    When ex. user state changes, components that cares about cartItems (ex. cart-icon) will get re-renders,
    because the whole state changed. 
    We do not want the component to get re-rendered, if the relevant state has not changed. 
    This can be solved with this 'reselect' library  
*/

import { createSelector } from 'reselect';

// input selector 
const selectCart = state => state.cart;

// output selector, that use input selector and createSelector
export const selectCartItems = createSelector(
    [selectCart], // first argument of createSelector is an array of input selectors
    (cart) => cart.cartItems  // second argument is the function that returns the value we want out of this selector
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity , 0)
);
