import React from 'react';
import {ShoppingCart, Plus, Minus} from 'lucide-react';
import type {Dessert} from '../types/dessert';

interface DessertCardProps {
    dessert: Dessert;
    quantity: number;
    onAddToCart: (dessert: Dessert) => void;
    onUpdateQuantity: (dessertName: string, quantity: number) => void;
}

const DessertCard: React.FC<DessertCardProps> = ({
                                                     dessert,
                                                     quantity,
                                                     onAddToCart,
                                                     onUpdateQuantity,
                                                 }) => {
    const handleAddToCart = () => {
        onAddToCart(dessert);
    };

    const handleIncrement = () => {
        onUpdateQuantity(dessert.name, quantity + 1);
    };

    const handleDecrement = () => {
        onUpdateQuantity(dessert.name, quantity - 1);
    };

    return (
        <div className="relative">
            <div className="relative mb-8">
                <img
                    src={dessert.image.desktop}
                    alt={dessert.name}
                    className={`w-full h-60 object-cover rounded-lg ${quantity > 0 ? 'border-2 border-Red' : ''}`}
                    loading="lazy"
                />

                {/* Add to Cart Button or Quantity Controls */}
                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
                    {quantity === 0 ? (
                        <button
                            onClick={handleAddToCart}
                            className="flex items-center gap-2 bg-white hover:bg-Red hover:text-white text-Rose-900 px-6 py-3 rounded-full font-semibold border border-Rose-300 transition-all duration-200 shadow-sm"
                        >
                            <ShoppingCart size={16}/>
                            Add to Cart
                        </button>
                    ) : (
                        <div className="flex items-center gap-4 bg-Red text-white px-6 py-3 rounded-full">
                            <button
                                onClick={handleDecrement}
                                className="w-5 h-5 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-Red transition-colors duration-200"
                            >
                                <Minus size={12}/>
                            </button>
                            <span className="font-semibold min-w-[20px] text-center">
                {quantity}
              </span>
                            <button
                                onClick={handleIncrement}
                                className="w-5 h-5 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-Red transition-colors duration-200"
                            >
                                <Plus size={12}/>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4">
                <p className="text-sm text-Rose-400 mb-1">{dessert.category}</p>
                <h3 className="font-semibold text-Rose-900 text-base mb-1">{dessert.name}</h3>
                <span className="text-Red font-semibold">
          ${dessert.price.toFixed(2)}
        </span>
            </div>
        </div>
    );
};

export default DessertCard;