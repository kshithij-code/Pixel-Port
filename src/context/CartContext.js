import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = [];

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.find(item => item.id === action.payload);
            if (existing) {
                return state.map(item =>
                    item.id === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...state, { id: action.payload, quantity: 1 }];
            }
        }
        case "REMOVE_ITEM": {
            return state.filter(item => item.id !== action.payload);
        }
        case "INCREMENT_ITEM": {
            return state.map(item =>
                item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
            );
        }
        case "DECREMENT_ITEM": {
            return state.map(item =>
                item.id === action.payload && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        }
        case "CLEAR_CART": {
            return [];
        }
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, initialState);
    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
