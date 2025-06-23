import React from 'react';
import {CheckCircle} from 'lucide-react';
import type {CartState} from '../types/dessert';

interface OrderConfirmationModalProps {
    isOpen: boolean;
    cartState: CartState;
    onClose: () => void;
    onStartNewOrder: () => void;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
                                                                           isOpen,
                                                                           cartState,
                                                                           onClose,
                                                                           onStartNewOrder,
                                                                       }) => {
    if (!isOpen) return null;

    const handleStartNewOrder = () => {
        onStartNewOrder();
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div
                className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto animate-scale-in p-8">
                <div className="mb-6">
                    <div className="w-12 h-12 bg-green/10 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="text-green" size={24}/>
                    </div>
                    <h2 className="text-2xl font-bold text-Rose-900 mb-2">Order Confirmed</h2>
                    <p className="text-Rose-400">We hope you enjoy your food!</p>
                </div>

                <div className="mb-6">
                    <div className="space-y-4 bg-Rose-50 p-4 rounded-lg">
                        {cartState.items.map((item) => (
                            <div key={item.dessert.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.dessert.image.thumbnail}
                                        alt={item.dessert.name}
                                        className="w-12 h-12 rounded object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-Rose-900 text-sm">{item.dessert.name}</p>
                                        <div className="flex items-center gap-4 mt-1">
                                            <span className="text-Red font-semibold text-sm">{item.quantity}x</span>
                                            <span
                                                className="text-Rose-400 text-sm">@ ${item.dessert.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="font-semibold text-Rose-900">
                  ${(item.dessert.price * item.quantity).toFixed(2)}
                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center mb-8 pt-4 border-t border-Rose-100">
                    <span className="text-Rose-900 font-medium">Order Total</span>
                    <span className="text-2xl font-bold text-Rose-900">
            ${cartState.totalPrice.toFixed(2)}
          </span>
                </div>

                <button
                    onClick={handleStartNewOrder}
                    className="w-full bg-Red hover:bg-Red/90 text-white font-semibold py-4 px-4 rounded-full transition-colors duration-200"
                >
                    Start New Order
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmationModal;