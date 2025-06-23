import {create} from 'zustand';
import type {CartItem, Dessert, CartState} from '../types/dessert';

interface CartStore extends CartState {
    loading: boolean;
    setLoading: (value: boolean) => void;
    addToCart: (dessert: Dessert) => void;
    removeFromCart: (dessertName: string) => void;
    updateQuantity: (dessertName: string, quantity: number) => void;
    clearCart: () => void;
    getItemQuantity: (dessertName: string) => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    loading: false,
    setLoading(loading: boolean) {
        set({loading});
    },
    addToCart: (dessert: Dessert) => {
        set((state) => {
            const existingItem = state.items.find(item => item.dessert.name === dessert.name);

            let newItems: CartItem[];
            if (existingItem) {
                newItems = state.items.map(item =>
                    item.dessert.name === dessert.name
                        ? {...item, quantity: item.quantity + 1}
                        : item
                );
            } else {
                newItems = [...state.items, {dessert, quantity: 1}];
            }

            const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = newItems.reduce((sum, item) => sum + (item.dessert.price * item.quantity), 0);

            return {
                items: newItems,
                totalItems,
                totalPrice
            };
        });
    },

    removeFromCart: (dessertName: string) => {
        set((state) => {
            const newItems = state.items.filter(item => item.dessert.name !== dessertName);
            const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = newItems.reduce((sum, item) => sum + (item.dessert.price * item.quantity), 0);

            return {
                items: newItems,
                totalItems,
                totalPrice
            };
        });
    },

    updateQuantity: (dessertName: string, quantity: number) => {
        if (quantity <= 0) {
            get().removeFromCart(dessertName);
            return;
        }

        set((state) => {
            const newItems = state.items.map(item =>
                item.dessert.name === dessertName
                    ? {...item, quantity}
                    : item
            );

            const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = newItems.reduce((sum, item) => sum + (item.dessert.price * item.quantity), 0);

            return {
                items: newItems,
                totalItems,
                totalPrice
            };
        });
    },

    clearCart: () => {
        set({
            items: [],
            totalItems: 0,
            totalPrice: 0
        });
    },

    getItemQuantity: (dessertName: string) => {
        const state = get();
        const item = state.items.find(item => item.dessert.name === dessertName);
        return item ? item.quantity : 0;
    }
}));