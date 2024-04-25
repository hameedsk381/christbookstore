// cartReducer.js
const initialState = {
    items: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload),
            };
        case 'UPDATE_CART_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item._id === action.payload.itemId ? { ...item, quantity: action.payload.newQuantity } : item
                ),
            };
            case 'RESET_CART':
            return {
                ...state,
                items: [],
            };
        default:
            return state;
    }
};

export default cartReducer;
