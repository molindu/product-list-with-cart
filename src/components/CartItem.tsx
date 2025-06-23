import React from 'react';
import { X } from 'lucide-react';
import type {CartItem as CartItemType} from '../types/dessert';

interface CartItemProps {
  item: CartItemType;
  onRemove: (dessertName: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const { dessert, quantity } = item;
  const subtotal = dessert.price * quantity;

  return (
    <div className="flex items-center justify-between py-4 border-b border-Rose-100">
      <div className="flex items-center gap-3">
        <img
          src={dessert.image.thumbnail}
          alt={dessert.name}
          className="w-12 h-12 rounded object-cover"
        />
        
        <div>
          <h4 className="font-semibold text-Rose-900 text-sm">{dessert.name}</h4>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-Red font-semibold text-sm">{quantity}x</span>
            <span className="text-Rose-400 text-sm">@ ${dessert.price.toFixed(2)}</span>
            <span className="font-semibold text-Rose-500 text-sm">${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => onRemove(dessert.name)}
        className="w-5 h-5 rounded-full border border-Rose-300 text-Rose-400 flex items-center justify-center hover:border-Rose-900 hover:text-Rose-900 transition-colors duration-200"
      >
        <X size={12} />
      </button>
    </div>
  );
};

export default CartItem;