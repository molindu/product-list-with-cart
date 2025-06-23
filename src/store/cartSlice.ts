import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {CartItem, Dessert, CartState} from '../types/dessert';

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

const calculateTotals = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.dessert.price * item.quantity), 0);
    return { totalItems, totalPrice };
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Dessert>) => {
            const dessert = action.payload;
            const existingItem = state.items.find(item => item.dessert.name === dessert.name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ dessert, quantity: 1 });
            }

            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const dessertName = action.payload;
            state.items = state.items.filter(item => item.dessert.name !== dessertName);

            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
        },
        updateQuantity: (state, action: PayloadAction<{ dessertName: string; quantity: number }>) => {
            const { dessertName, quantity } = action.payload;

            if (quantity <= 0) {
                state.items = state.items.filter(item => item.dessert.name !== dessertName);
            } else {
                const item = state.items.find(item => item.dessert.name === dessertName);
                if (item) {
                    item.quantity = quantity;
                }
            }

            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
        },
        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;