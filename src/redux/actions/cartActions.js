// cartActions.js
export const addToCart = (item) => ({
    type: 'ADD_TO_CART',
    payload: item,
});

export const removeFromCart = (itemId) => ({
    type: 'REMOVE_FROM_CART',
    payload: itemId,
});

export const updateCartQuantity = (itemId, newQuantity) => ({
    type: 'UPDATE_CART_QUANTITY',
    payload: { itemId, newQuantity },
});
export const resetCart = () => ({
    type: 'RESET_CART',
   
});
