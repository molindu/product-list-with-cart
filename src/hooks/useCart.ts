import { useState, useMemo } from 'react';
import type {CartItem, Dessert, CartState} from '../types/dessert';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartState: CartState = useMemo(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.dessert.price * item.quantity), 0);
    
    return {
      items: cartItems,
      totalItems,
      totalPrice
    };
  }, [cartItems]);

  const addToCart = (dessert: Dessert) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.dessert.name === dessert.name);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.dessert.name === dessert.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { dessert, quantity: 1 }];
    });
  };

  const removeFromCart = (dessertName: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.dessert.name !== dessertName));
  };

  const updateQuantity = (dessertName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dessertName);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.dessert.name === dessertName
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getItemQuantity = (dessertName: string): number => {
    const item = cartItems.find(item => item.dessert.name === dessertName);
    return item ? item.quantity : 0;
  };

  return {
    cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity
  };
};