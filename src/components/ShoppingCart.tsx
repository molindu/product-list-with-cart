import React from 'react';
import {Leaf} from 'lucide-react';
import CartItem from './CartItem';
import type {CartState} from '../types/dessert';
import EmptyIcon from '../assets/icons/illustration-empty-cart.svg'

interface ShoppingCartProps {
    cartState: CartState;
    onRemoveFromCart: (dessertName: string) => void;
    onConfirmOrder: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
                                                       cartState,
                                                       onRemoveFromCart,
                                                       onConfirmOrder,
                                                   }) => {
    const {items, totalItems, totalPrice} = cartState;

    return (
        <div className="bg-white rounded-lg p-6">
            <h2 className="font-bold text-2xl text-Red mb-6">
                Your Cart ({totalItems})
            </h2>

            {items.length === 0 ? (
                <div className="text-center py-8">
                    <img
                        src={EmptyIcon}
                        alt="Empty cart illustration"
                        className="w-32 h-32 mx-auto mb-4 opacity-50 rounded-lg object-cover"
                    />
                    <p className="text-Rose-500 font-medium">Your added items will appear here</p>
                </div>
            ) : (
                <>
                    <div className="space-y-0 mb-6">
                        {items.map((item) => (
                            <CartItem
                                key={item.dessert.name}
                                item={item}
                                onRemove={onRemoveFromCart}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between items-center mb-6 pt-4">
                        <span className="text-Rose-900 font-medium">Order Total</span>
                        <span className="text-2xl font-bold text-Rose-900">
              ${totalPrice.toFixed(2)}
            </span>
                    </div>

                    <div
                        className="flex items-center justify-center gap-2 mb-6 text-sm text-Rose-900 bg-Rose-50 p-3 rounded-lg">
                        <Leaf size={16} className="text-green"/>
                        <span>This is a <strong>carbon-neutral</strong> delivery</span>
                    </div>

                    <button
                        onClick={onConfirmOrder}
                        className="w-full bg-Red hover:bg-Red/90 text-white font-semibold py-4 px-4 rounded-full transition-colors duration-200"
                    >
                        Confirm Order
                    </button>
                </>
            )}
        </div>
    );
};

export default ShoppingCart;